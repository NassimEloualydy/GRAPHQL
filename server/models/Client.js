const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    email:{type:String,required:true},
    pw:{type:String,required:true},
    role:{type:String,requred:true},
    status:{type:String,requred:true},
    
})
module.exports=mongoose.model("User",userSchema);