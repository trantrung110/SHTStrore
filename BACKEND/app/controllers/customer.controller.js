const jwt = require("jsonwebtoken");
const jwtSecret = "mysecretkey";
const bcrypt = require("bcryptjs");

const CustomerService = require("../services/customer.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

//Đăng ký
exports.signUp = async (req, res, next) => {
  if (!req.body.email) return next(new ApiError(400, "Email are required"));
  if (!req.body.password)
    return next(new ApiError(400, "Password are required"));
  if (!req.body.name) return next(new ApiError(400, "Name are required"));
  if (!req.body.phone) return next(new ApiError(400, "Phone are required"));
  if (!req.body.birth) return next(new ApiError(400, "Birth are required"));
  if (!req.body.gender) return next(new ApiError(400, "Gender are required"));
  if (!req.body.address) return next(new ApiError(400, "Address are required"));
  try {
    const customerService = new CustomerService(MongoDB.client);
    const existingCustomer = await customerService.findByEmail(req.body.email);
    if (existingCustomer)
      return next(new ApiError(400, "Email is already taken"));
    const customer = await customerService.signUp(req.body);
    if (customer) return res.send({ message: "Signup successfully" });
  } catch (error) {
    return next(new ApiError(500, "An error occurred while signing up"));
  }
};

//Đăng nhập
exports.signIn = async (req, res, next) => {
  if (!req.body.email) return next(new ApiError(400, "Email are required"));
  if (!req.body.password)
    return next(new ApiError(400, "Password are required"));

  try {
    const customerService = new CustomerService(MongoDB.client);
    const customer = await customerService.signIn(req.body);
    if (!customer) return next(new ApiError(401, "Invalid email or password"));
    //Mã hoá id bằng jwtSecret thành token trong 24h
    const token = jwt.sign({ id: customer._id }, jwtSecret, {
      expiresIn: 86400, //24h
    });
    //Thêm token vào CSDL
    await customerService.addToken(customer._id, token);
    res.setHeader("Authorization", "Bearer " + token);
    return res.send({
      message: "Signin successfully",
      token: token,
      customer: customer,
    });
  } catch (error) {
    return next(new ApiError(500, "An error occurred while signing in"));
  }
};

//Đăng xuất
exports.signOut = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next(new ApiError(401, "Unauthorized"));
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.decode(token);
    const customerService = new CustomerService(MongoDB.client);
    //Xoá token
    await customerService.deleteToken(decodedToken.id, token);

    return res.send({ message: "Signout successfully" });
  } catch (error) {
    return next(new ApiError(500, "An error occurred while signing out"));
  }
};

//
exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const customerService = new CustomerService(MongoDB.client);
    const { email } = req.query;
    if (email) documents = await customerService.findByEmail(email);
    else documents = await customerService.find({});
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving customers")
    );
  }
  return res.send(documents);
};

exports.findAllCarts = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(new ApiError(401, "Unauthorized"));
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.decode(token);

    const customerService = new CustomerService(MongoDB.client);
    const document = await customerService.findById(decodedToken.id);
    if (!document) return next(new ApiError(404, "Customer not found"));
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving customer with id=${req.params.id}`)
    );
  }
};

exports.findId = async (req, res, next) => {
    try {
      const customerService = new CustomerService(MongoDB.client);
      const document = await customerService.findById(req.params.id);
      if (!document) {
        return next(new ApiError(404, "Không tìm thấy tài khoản"));
      }
      return res.send(document);
    } catch (error) {
      return next(
        new ApiError(500, `Error retrieving user with email = ${req.params.id}`)
      );
    }
  };

exports.changePassword = async (req, res, next) => {
  try {
    if (!req.body?.currentPassword) {
      return next(new ApiError(400, "Vui lòng nhập mật khẩu hiện tại."));
    }
    if (!req.body?.newPassword) {
      return next(new ApiError(400, "Mật khẩu mới không được để trống."));
    }

    const userId = req.params.id;
    const currentPassword = req.body.currentPassword;
    const customerService = new CustomerService(MongoDB.client);
    const user = await customerService.findById(userId);

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      return next(new ApiError(400, "Mật khẩu hiện tại không đúng."));
    }
    const newPassword = req.body.newPassword;
    const updatedUser = await customerService.changePassword(userId, newPassword);
    if (!updatedUser) {
      return next(new ApiError(500, "Không thể thay đổi mật khẩu."));
    }
    return res.send("Mật khẩu đã được thay đổi thành công.");
  } catch (error) {
    return next(
      new ApiError(
        500,
        "An error occurred while changing the password: " + error.message
      )
    );
  }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0)
        return next(new ApiError(400, "Data to update can not be empty"));
    console.log(req.file);
    try {
        const customerService = new CustomerService(MongoDB.client);
        const updatedUser = await customerService.update(req.params.id, {
            ...req.body,
        });
        return res.send({ message: "Customer was updated successfully", data: updatedUser });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating product with id=${req.params.id}`)
        );
    }
};

// ************************ Customer Cart ************************** //

//Thêm
exports.addToCart = async (req, res, next) => {
  try {
    const customerService = new CustomerService(MongoDB.client);

    const authHeader = req.headers.authorization;
    if (!authHeader) return next(new ApiError(401, "Unauthorized"));
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.decode(token);

    console.log(decodedToken.id);
    console.log(req.body);

    const customer = await customerService.findById(decodedToken.id);

    if (!customer) {
      return next(new ApiError(404, "Customer not found"));
    }

    await customerService.addToCart(decodedToken.id, req.body);
    const user = await customerService.findById(decodedToken.id);
    return res.send({
      message: "Add products to customer successfully",
      user: user,
    });
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while adding products to customer")
    );
  }
};

// Xóa một sản phẩm trong giỏ hàng
exports.deleteProductFromCart = async (req, res, next) => {
  try {
    const customerService = new CustomerService(MongoDB.client);
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(new ApiError(401, "Unauthorized"));
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.decode(token);
    const customerId = decodedToken.id;
    const customer = await customerService.findById(customerId);
    if (!customer) {
      return next(new ApiError(404, "Customer not found"));
    }
    //Id product from cart
    await customerService.deleteProductFromCart(customerId, req.params.id);
    const user = await customerService.findById(customerId);
    return res.send({
      message: "Product was removed from cart successfully",
      user: user,
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Could not delete product with id=${req.params.id} from cart`
      )
    );
  }
};

// Xóa toàn bộ sản phẩm trong giỏ khi đặt hàng
exports.deleteAllProductsFromCart = async (req, res, next) => {
  try {
    const customerService = new CustomerService(MongoDB.client);
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(new ApiError(401, "Unauthorized"));
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.decode(token);
    const customerId = decodedToken.id;
    const customer = await customerService.findById(customerId);
    if (!customer) {
      return next(new ApiError(404, "Customer not found"));
    }
    await customerService.deleteAllProductsFromCart(decodedToken.id);
    const user = await customerService.findById(customerId);
    return res.send({
      message: "Product was removed from cart successfully",
      user: user,
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Could not delete product with id=${req.body.product_id} from cart`
      )
    );
  }
};

//Cập nhật số lượng sản phẩm trong giỏ hàng
exports.updateProductQuantityFromCart = async (req, res, next) => {
  try {
    const customerService = new CustomerService(MongoDB.client);
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(new ApiError(401, "Unauthorized"));
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.decode(token);
    const customerId = decodedToken.id;
    const customer = await customerService.findById(customerId);
    if (!customer) {
      return next(new ApiError(404, "Customer not found"));
    }
    if (!req.body.quantity) {
      return next(new ApiError(400, "Quantity can not be empty"));
    }
    await customerService.updateProductQuantityFromCart(
      decodedToken.id,
      req.params.id,
      req.body.quantity
    );
    return res.send({ message: "Product quantity was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Could not update product quantity with id=${req.params.product_id}`
      )
    );
  }
};
