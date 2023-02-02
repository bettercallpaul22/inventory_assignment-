import express from "express"
import { login, register } from "../controllers/AuthController.js"

const router = express.Router()

// REGISTER
router.post("/register", register)


// LOGIN
router.post("/login", login) 
router.get("/user") 
router.post("/createpost") 


export default router