const express=require("express");
require("dotenv").config();
const colors=require("colors")
const cors=require("cors");
const {graphqlHTTP}=require("express-graphql");
const mongoose=require("mongoose");
require("dotenv").config()
const app=express();
app.use(cors())
// app.use(express.json())
// const userRoutes=require("./routes/userRoutes");
// app.use("/API/user",userRoutes);
const port=process.env.PORT || 4000
const schema=require("./schema/schema")
const DATABASE=process.env.DATABASE;
mongoose.connect(DATABASE).then(()=>{
    console.log("Connected".cyan.bold)
}).catch((err)=>{console.log(err)})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true,

}))

app.listen(port,console.log("Server Running".blue))