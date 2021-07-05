const express = require('express')
const mongoose = require("mongoose")
const {UserModel, NewOrder} = require('./server')

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

app.post('/signup',(req,res)=>{
    //res.json(req.body)   //body is json-ised
    const userdetails = req.body;

    const user = async() => {
        try{
            const exist1 = await UserModel.find({name: userdetails["username"]}).countDocuments()
            const exist2 = await UserModel.find({contactno : userdetails["contactno"]}).countDocuments()

            if(exist1==0 && exist2==0)
            {
                const newuser = new UserModel({
                    name :  userdetails["username"],
                    password : userdetails["password"],
                    contactno : userdetails["contactno"],
                    cart : [
        
                    ]
                })

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

app.post('/getuserinfo',(req,res) => {
    const userdetails = req.body;

    const user = async() => {
        const result = await UserModel.findOne({name: userdetails["username"]})
        
        if(result==null)
        {
            res.status(404).send(null)
        }
        else
        {
            const response = {
                "username" : result["name"],
                "password" : result["password"],
                "contactno" : result["contactno"],
            }

            res.status(200).send(response)
        }
    }

user()
})

app.post('/cart',(req,res)=>{
    const user = req.body;

        const execute = async() => {
        const result = await UserModel.findOne({name: user["username"]})

        if(result)
        {
            res.send(result.cart)
        }
        else
        {
            res.status(404).send("404 not found")
        }
    }

    execute()
})

app.post('/addtocart',(req,res)=>{
    const {product} = req.body;

    const add = async() => {

        let user = await UserModel.findOne({name: req.body["name"]})
        let exists = await UserModel.findOne({name: req.body["name"] , cart : {$elemMatch : {product_id : product["product_id"]}}})

        if(exists)
        {
            res.status(409).send("product already exists")
        }
        
        else
        {
            await user["cart"].push(
            {
                product_id : product["product_id"],
                product_name : product["product_name"] ,
                price : product["price"],
                quantity : product["quantity"]
            })

            await user.save()
            res.status(200).send(user.cart)
        }
    }

    add()

    
})

app.post('/deletefromcart',(req,res)=>{
    const {product} = req.body;

    const remove = async() => {

        await UserModel.updateOne({name: req.body["name"]},{"$pull":{"cart" : {"product_id" : product["product_id"]}}})

        const user = await UserModel.findOne({name: req.body["name"]})

        res.send(user.cart)
        
    }

    remove()

    
})

app.post('/updatecart',(req,res)=>{
    const {product} = req.body;

    const update = async() => {

        await UserModel.updateOne({name: req.body["name"],"cart.product_id": product["product_id"]},{"$set" : {"cart.$.quantity" : product["quantity"]}})

        const user = await UserModel.findOne({name: req.body["name"]})

        res.send(user.cart)
        
    }

    update()
})

app.post('/placeorder',(req,res)=>{
    const userinfo = req.body["userinfo"];
    const products = req.body["products"];

    const order = async() => {
        const neworder = new NewOrder({
            username :  userinfo["username"],
            phoneNo : userinfo["contactno"],
            status : userinfo["status"],
            totalAmt : userinfo["totalamt"],
            items: products
        })

        await neworder.save()

        res.status(200).send(true)

        
    }

    const clearCart = async() => {
        await UserModel.updateOne({name:userinfo["username"]},{"$set" : { "cart" : []}})
    }

    order()
    clearCart()
})

//listening at port 5000
app.listen(port,()=>{
    console.log(`server running at port ${port}...`)
})