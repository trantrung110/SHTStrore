const express = require("express");
const customer = require("../controllers/customer.controller");

const router = express.Router();

router.route("/signin").post(customer.signIn);
router.route("/signup").post(customer.signUp);
router.route("/signout").post(customer.signOut);
router.route("/customer/:id").get(customer.findId);
router.route("/:id").put(customer.changePassword);
router.route("/account/:id").patch(customer.update)

//Header customer_id (Customer Cart)
router
  .route("/cart")
  .post(customer.addToCart)
  .get(customer.findAllCarts)
  .delete(customer.deleteAllProductsFromCart);
router
  .route("/cart/product/:id")
  .delete(customer.deleteProductFromCart)
  .patch(customer.updateProductQuantityFromCart);

//Admin
router.route("/").get(customer.findAll);
module.exports = router;
