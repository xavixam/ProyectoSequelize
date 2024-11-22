const express = require("express")
const OrderController = require("../controllers/OrderController")
const router = express.Router()
const { typeError } = require('../middleware/errors');

router.post("/create",OrderController.create)
router.get("/getAll",OrderController.getAll)

router.use(typeError)

module.exports = router