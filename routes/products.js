const express = require("express")
const ProductController = require("../controllers/ProductController")
const router = express.Router()
const {authentication} = require('../middleware/authentication')

router.post("/create",  ProductController.create)
router.get("/getAll",ProductController.getAll)
router.get("/getOrdered",ProductController.getOrdered)
router.get("/id/:id",ProductController.getById)
router.get("/name/:name",ProductController.getByName)
router.put("/id/:id", authentication, ProductController.update)
router.delete("/id/:id",authentication, ProductController.delete)

module.exports = router