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

// //connect to mongo database
// mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

// const connection = mongoose.connection;

// connection.once("open", function() {
//   console.log("MongoDB database connection established successfully");
// });



// //connect to mongo database
// const conn = mongoose.connect("mongodb://localhost:27017/userinfo" , {useNewUrlParser: true, useUnifiedTopology: true})
// .then(()=> {console.log("database connection successful...")})
// .catch((err)=>{console.log(err)})


module.exports = {UserModel}