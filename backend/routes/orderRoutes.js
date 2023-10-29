const router = require("express").Router();
const orderController = require("../controllers/orderController");
const { validateInputs } = require("../middlewares/validateInputs");
router.post("/", orderController.createOrder);

router.get("/", orderController.getAllOrders);

router.get("/:id([0-9a-fA-F]{24})", orderController.getOrderById);

router.put("/:id", orderController.updateOrderStatus);

module.exports = router;
