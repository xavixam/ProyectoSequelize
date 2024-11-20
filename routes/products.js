const express = require("express")
const ProductController = require("../controllers/ProductController")
const router = express.Router()

router.post("/create",ProductController.create)
router.get("/getAll",ProductController.getAll)
router.get("/getOrdered",ProductController.getOrdered)
router.get("/id/:id",ProductController.getById)
router.get("/name/:name",ProductController.getByName)
router.put("/id/:id",ProductController.update)
router.delete("/id/:id",ProductController.delete)

module.exports = router