const express = require("express")
const UserController = require("../controllers/UserController")
const router = express.Router()
const {authentication} = require('../middleware/authentication')
const { typeError } = require('../middleware/errors');

router.post("/create", UserController.create)
router.get("/getAll", UserController.getAll)
router.post("/login", UserController.login)
router.delete("/logout",authentication, UserController.logout)
router.get("/getUserInfo", authentication, UserController.getUserInfo)

router.use(typeError)

module.exports = router