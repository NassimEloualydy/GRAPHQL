const express=require("express");
require("dotenv").config();
const {graphqlHTTP}=require("express-graphql");
const mongoose=require("mongoose");
require("dotenv").config()
const port=process.env.PORT || 4000
const app=express();
const schema=require("./schema/schema")
const DATABASE=process.env.DATABASE;
mongoose.connect(DATABASE).then(()=>{
    console.log("Connected")
}).catch((err)=>{console.log(err)})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true,

}))

app.listen(port,console.log("Server Running"))