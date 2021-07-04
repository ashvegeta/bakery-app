const mongoose = require("mongoose")
require("dotenv").config()

var url = process.env.SERVER_URL;

const connectDB = async () => {
   await mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true,useFindAndModify: false })
   .then(()=> {
       console.log('connected to database')
   })
   .catch((err) => {
       console.log('error connecting to database:\n'+err)
   })
}

connectDB()

//define schema
const UserSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            default: ""
        },
        password : {
            type: String,
            default: ""
        },
        contactno : {
            type: Number,
            default: ""
        },
        cart : [{
                product_id : String,
                product_name : String ,
                price : Number,
                quantity : Number
        }]
    }
)

const NewOrderSchema= new mongoose.Schema({
    username: String,
    phoneNo: String,
    status: String,
    totalAmt: Number,
    items: [{
      name: String,
      qty: Number,
      price: Number
    }]
  });

const UserModel = new mongoose.model("UserModel",UserSchema)
const NewOrder=  new mongoose.model('new_order',NewOrderSchema);

module.exports = {UserModel,NewOrder}