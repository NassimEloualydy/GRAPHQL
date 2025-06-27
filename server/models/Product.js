const mongoose=require("mongoose");
const {ObjectId}=require("mongoose").Schema
const productSchema=mongoose.Schema({
    name:{type:String,required:true},
    qty:{type:String,required:true},
    category:{type:String,required:true},
    description:{type:String,required:true},
    saller:{type:ObjectId,ref:"User",required:true},
},{timestamps:true})
module.exports=mongoose.model("Product",productSchema);
