const express = require('express')
const mongoose = require("mongoose")
const {UserModel} = require('./server')

const app = express()
const port  = process.env.PORT || 5000
const cors = require("cors")

//load static files
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

//routing
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/front-end.html')
})

app.get('/contact',(req,res)=>{
    res.send('contacts')
})

app.get('/sign',(req,res)=>{
    res.sendFile(__dirname + '/public/user-signup.html')
})

app.post('/signup',(req,res)=>{
    //res.json(req.body)   //body is json-ised
    const userdetails = req.body;

    const user = async() => {
        try{
            const newuser = new UserModel({
            name :  userdetails["username"],
            password : userdetails["password"],
            contactno : userdetails["contactno"]
            })


            const exist1 = await UserModel.find({name: userdetails["username"]}).countDocuments()
            const exist2 = await UserModel.find({contactno : userdetails["contactno"]}).countDocuments()

            if(exist1==0 && exist2==0)
            {
                await newuser.save()
                res.status(200).send(true)
            }

            else
            {
                res.status(409).send(true)
            }
    
        }
        catch(err){
            res.send(err)
        }
    }

user()

})

app.post('/login',(req,res)=>{
    const userdetails = req.body;

    const user = async() => {
        const result = await UserModel.find({name: userdetails["username"],password: userdetails["password"]}).countDocuments()
        
        if(result==0)
        {
            res.status(401).send(false)
        }
        else
        {
            res.status(200).send(true)
        }
    }

user()
    
})

//listening at port 7000
app.listen(port,()=>{
    console.log(`server running at port ${port}...`)
})