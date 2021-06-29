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
const UserSchema = new mongoose.Schema({
    name : String,
    password : String, 
    contactno : Number
})


const UserModel = new mongoose.model("UserModel",UserSchema)


module.exports = {UserModel}


