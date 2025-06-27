const {GraphQLObjectType,GraphQLNonNull,GraphQLID,GraphQLString, GraphQLSchema, GraphQLList}=require("graphql");

const User=require("../models/Client")
const Product=require("../models/Product")

const productType=new GraphQLObjectType({
    name:'Product',
    fields:()=>({
        _id:{type:GraphQLID},
        name:{type:GraphQLString},
        qty:{type:GraphQLString},
        category:{type:GraphQLString},
        description:{type:GraphQLString},
        saller:{type:GraphQLString},
        message: { type: GraphQLString }

    })
})
//Client Type
const clientType=new GraphQLObjectType({
    name:'Client',
    fields:()=>({
        _id:{type:GraphQLID},
        first_name:{type:GraphQLString},
        last_name:{type:GraphQLString},
        email:{type:GraphQLString},
        pw:{type:GraphQLString},
        role:{type:GraphQLString},
        status:{type:GraphQLString},
        message: { type: GraphQLString }
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
const mutation=new GraphQLObjectType({
    name:"Mutation",
    fields:{
                deleteProduct:{
          type:productType,
          args:{
            _id:{type:GraphQLNonNull(GraphQLString)},
          },
            async resolve(parent,args){
            await Product.findOneAndDelete({_id:args._id})
            return {message:"Product Deleted with success !!"}
        }

        },

        updateProduct:{
          type:productType,
          args:{
            _id:{type:GraphQLNonNull(GraphQLString)},
            name:{type:GraphQLNonNull(GraphQLString)},
            qty:{type:GraphQLNonNull(GraphQLString)},
            category:{type:GraphQLNonNull(GraphQLString)},
            description:{type:GraphQLNonNull(GraphQLString)},
            saller:{type:GraphQLNonNull(GraphQLString)},
          },
            async resolve(parent,args){
                var p=await Product.find().select().and([{name:args.name},{_id:{$ne:args._id}}])
                if(p.length!=0)
                    return {message:"Name is already exist !!"}
                p=await Product.find().select().and([{description:args.description},{_id:{$ne:args._id}}])
                if(p.length!=0)
                    return {message:"Description is already exist !!"}
            p=await Product.findOneAndUpdate({_id:args._id},{
                name:args.name,
                qty:args.qty,
                category:args.category,
                description:args.description,
                saller:args.saller
            },{$new:true})
            return {message:"Product updated with success !!"}
        }

        },

        addProduct:{
          type:productType,
          args:{
            name:{type:GraphQLNonNull(GraphQLString)},
            qty:{type:GraphQLNonNull(GraphQLString)},
            category:{type:GraphQLNonNull(GraphQLString)},
            description:{type:GraphQLNonNull(GraphQLString)},
            saller:{type:GraphQLNonNull(GraphQLString)},
          },
            async resolve(parent,args){
                var p=await Product.find({name:args.name}).select()
                if(p.length!=0)
                    return {message:"Name is already exist !!"}
                p=await Product.find({description:args.description}).select()
                if(p.length!=0)
                    return {message:"Description is already exist !!"}
            p=await Product.create({
                name:args.name,
                qty:args.qty,
                category:args.category,
                description:args.description,
                saller:args.saller

            })
            return {message:"Product added with success !!"}
        }

        },

        logout:{
          type:clientType,
          args:{
            _id:{type:GraphQLNonNull(GraphQLString)},
          },
            async resolve(parent,args){
          User.findOneAndUpdate({_id:args._id},{$set:{status:'Disconnected'}},{$new:true})
          return {message:"Logout with success !!"}

          }

        },
        login:{
          type:clientType,
          args:{
            email:{type:GraphQLNonNull(GraphQLString)},
            password:{type:GraphQLNonNull(GraphQLString)},
          },
            async resolve(parent,args){
            var u=await User.find({email:args.email,pw:args.password}).select("-photo");
            if(u.length!=1){
                console.log(u)
                return {message:"The email or the password are not exist !!"}
            
            }
          var _id= User.find({email:args.email,password:args.password}).select("-photo")['_id']
          User.findOneAndUpdate({_id},{$set:{status:'Connected'}},{$new:true})
          return {message:"Login with success !!"}

          }

        },

        register:{
          type:clientType,
          args:{
            first_name:{type:GraphQLNonNull(GraphQLString)},
            last_name:{type:GraphQLNonNull(GraphQLString)},
            email:{type:GraphQLNonNull(GraphQLString)},
            role:{type:GraphQLNonNull(GraphQLString)},
            password:{type:GraphQLNonNull(GraphQLString)},
          },
            async resolve(parent,args){
            var u=await User.find({first_name:args.first_name,last_name:args.last_name}).select("-photo");
            if(u.length!=0){
                console.log(u)
                return {message:"Please the first name and the last name is already exist !!"}
            }
             u= await User.find({email:args.email}).select("-photo");
            if(u.length!=0){
                return {message:"Please the email is already exist !!"}
            }

        
            u= await new User({
                first_name:args.first_name,last_name:args.last_name,email:args.email,role:args.role,pw:args.password,status:"Disconnected"
            })
            u.save()
                return {message:"User added with success  !!"}

          }

        },
    }
})
module.exports=new GraphQLSchema({
    query:rootQuery,
    mutation:mutation,
})