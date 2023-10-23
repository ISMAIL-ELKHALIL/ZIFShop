const { Router } = require("express");
const orderController = require("../controllers/orderController");
const router = Router();

router.post("/", orderController.createOrder);

router.get("/", orderController.getAllOrders);

router.put("/:id", orderController.updateOrderStatus);

module.exports = router;
