const {projects,clients}=require("../sampleData");
const {GraphQLObjectType,GraphQLID,GraphQLString, GraphQLSchema, GraphQLList}=require("graphql");

const User=require("../models/Client")
//Client Type
const clientType=new GraphQLObjectType({
    name:'Client',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString},
    })
})
const rootQuery= new GraphQLObjectType({
    name:'RootQuery',
    fields:{
        allClients:{
            type:new GraphQLList(clientType),
            resolve(parent,args){
               return User.find(); 
            }  
        },
        clients:{
            type:clientType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
               return User.findById(args.id); 
            }
        }
    }
})
module.exports=new GraphQLSchema({
    query:rootQuery
})