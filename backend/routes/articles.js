const express=require('express');
const Article_model = require('../models/article_model.js');
const requireAuth=require('../middleware/requireAuth.js')

const Article_controller=require("../controllers/article_controller.js")
const User_controller=require("../controllers/user_controller.js")
const router=express.Router();
router.get("/articles/categories",Article_controller.get_all_Categories)
//Get all Articles
router.get("/Articles",Article_controller.get_all_Articles)
//Get a single Article
router.get("/articles/:id",Article_controller.get_single_Article)
//Post Article
router.post("/articles",Article_controller.post_Article)
//Delete an Article
router.delete("/articles/:id",Article_controller.delete_Article)
//Update an Article
router.patch("/:id",Article_controller.update_Article)

router.get("/categories/:tag",Article_controller.get_single_Categories)
router.get("/users",User_controller.getAllUsers)
router.get("/users/myprofile/:id",User_controller.getUserInfoById)
module.exports=router
