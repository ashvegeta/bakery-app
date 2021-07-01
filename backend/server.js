const mongoose = require("mongoose")

var url = "mongodb://localhost:27017/userinfo";

const connectDB = async () => {
    try 
    {
        await mongoose.connect(url,{ useUnifiedTopology: true, useNewUrlParser: true })
        console.log(`Connected to database`)
    }

    catch (error)
    {
        console.error(`Connection error`)
    }
}

connectDB();


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


const UserModel = new mongoose.model("UserModel",UserSchema)


module.exports = {UserModel}