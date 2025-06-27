const express=require("express")
const Router=express.Router()
const {register}=require("../controller/userController");
Router.post("/register",register);
module.exports=Router