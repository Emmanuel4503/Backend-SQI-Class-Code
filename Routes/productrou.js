const express = require("express")


const {addProduct} = require("../controllers/productcon")
const isLogedIn = require("../middlewares/isLogedIn")
const isAdmin = require("../middlewares/isAdmin")
const uploadImage = require("../middlewares/multer")

const productRouter = express.Router()

productRouter.route("/").post(uploadImage.single("image"), addProduct)





module.exports = productRouter