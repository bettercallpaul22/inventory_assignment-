import express from "express"
import { addproducts, deleteProduct, getProducts, singleProduct, updateProduct } from "../controllers/productController.js"

const router = express.Router()



// create product
router.post("/addproduct", addproducts) 

// get all products
router.get("/getproducts", getProducts) 

// get single product
router.get("/:productId", singleProduct) 

// update product
router.put("/update/:productId", updateProduct) 

// delete product
router.delete("/delete/:productId", deleteProduct) 



export default router