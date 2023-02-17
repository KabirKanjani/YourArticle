const express=require('express')
const router=express.Router();
const userController=require('../controllers/user_controller.js')
//Login Route
console.log("Users")
router.post("/login",userController.loginUser)
router.get("/",userController.getAllUsers)
//SignUp Route
router.post("/signup",userController.signupUser)
module.exports=router
