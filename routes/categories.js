const express = require("express")
const CategoryController = require("../controllers/CategoryController")
const router = express.Router()
const { typeError } = require('../middleware/errors');

router.post("/create",CategoryController.create)
router.get("/getAll",CategoryController.getAll)
router.get("/id/:id",CategoryController.getById)
router.get("/name/:name",CategoryController.getByName)
router.put("/id/:id",CategoryController.update)
router.delete("/id/:id",CategoryController.delete)

router.use(typeError)

module.exports = router