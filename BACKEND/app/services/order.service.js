const { ObjectId } = require("mongodb");
const { format } = require('date-fns');

class OrderService {
  constructor(client) {
    this.Order = client.db().collection("orders");
    this.Product = client.db().collection("products");
  }

  extractOrderData(payload) {
    payload.customer_id = new ObjectId(payload.customer_id);
    const order = {
      customer_id: payload.customer_id,
      name: payload.name,
      phone: payload.phone,
      address: payload.address,
      products: payload.products,
      total: payload.total,
      status: 0,
    };

    Object.keys(order).forEach(
      (key) => order[key] === undefined && delete order[key]
    );
    return order;
  }

  async addToOrder(payload) {
    const order = this.extractOrderData(payload);
    const currentDate = new Date();
    order.created_at = format(currentDate, "hh:mm:ss a, dd/MM/yyyy");
    order.updated_at = format(currentDate, "hh:mm:ss a, dd/MM/yyyy");
    // Kiểm tra số lượng sản phẩm trong đơn hàng
    for (const product of order.products) {
      const productFilter = {
        _id: ObjectId.isValid(product.product_id)
          ? new ObjectId(product.product_id)
          : null,
      };
      const p = await this.Product.findOne(productFilter);

      // Kiểm tra xem số lượng sản phẩm đặt hàng có lớn hơn số lượng còn lại trong kho không
      if (p.quantity_remain < product.quantity_sale) {
        // Nếu số lượng đặt hàng vượt quá số lượng còn trong kho, không thực hiện đặt hàng
        return null;
      }
    }
    //return await this.Order.insertOne(order);
    // Nếu không có sản phẩm nào vượt quá số lượng trong kho, thêm đơn hàng vào cơ sở dữ liệu
    const result = await this.Order.insertOne(order);
    return result;
  }

  async findUserOrders(customer_id) {
    const filter = {
      customer_id: new ObjectId(customer_id),
    };
    const cursor = await this.Order.find(filter);
    //Array
    return await cursor.toArray();
  }

  async findById(id) {
    return await this.Order.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async find(filter) {
    const cursor = await this.Order.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $project: {
          _id: 1,
          "customer.name": 1, // Lấy tên của customer
          products: 1,
          total: 1,
          status: 1,
          created_at: 1,
          updated_at: 1,
        },
      },
      {
        $match: filter,
      },
    ]);
    return await cursor.toArray();
  }

  async updateOrderStatus(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const currentDate = new Date();
    const update = {
      status: payload.status,
      updated_at: format(currentDate, "hh:mm:ss a, dd/MM/yyyy"),
    };
  
    // Kiểm tra giá trị của payload.status và cập nhật trường tương ứng
    if (payload.status === 1) {
      update.accept_at =format(currentDate, "hh:mm:ss a, dd/MM/yyyy");
    } else if (payload.status === 2) {
      update.ship_at = format(currentDate, "hh:mm:ss a, dd/MM/yyyy");
    } else if (payload.status === 3) {
      update.cancle_at = format(currentDate, "hh:mm:ss a, dd/MM/yyyy");
    } else if (payload.status === 4) {
      update.arrive_at = format(currentDate, "hh:mm:ss a, dd/MM/yyyy");
    }

    const result = await this.Order.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    
    if (payload.status === 2) {
      for (const product of result.products) {
        const productFilter = {
          _id: ObjectId.isValid(product.product_id)
            ? new ObjectId(product.product_id)
            : null, // Tìm kiếm sản phẩm theo id
        };
        const p = await this.Product.findOne(productFilter);
        const productUpdate = {
          $inc: {
            quantity_sale: +product.quantity_sale, // Thay đổi số lượng đã bán của sản phẩm
            quantity_remain: -product.quantity_sale, // Giảm số lượng còn lại của sản phẩm
          },
        };
        
        try {
          await this.Product.findOneAndUpdate(productFilter, productUpdate, {
            returnDocument: "after"
          });
        } catch (error) {
          console.error(error);
        }
      }
      return result;
    } else if (payload.status === 1 || payload.status === 3 || payload.status === 4 ) {
      return result;
    } 
  }

  async updateCancelOrderStatus(id) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = {
      status: 3,
      updated_at: new Date().toISOString(),
    };
    const result = await this.Order.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }
}

module.exports = OrderService;
