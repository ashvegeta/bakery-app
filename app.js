const express = require('express')
const app = express()

app.use(express.static('./public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/front-end.html')
})

app.get('/contact',(req,res)=>{
    res.send('contacts')
})

app.get('/sign',(req,res)=>{
    res.sendFile(__dirname + '/public/user-signup.html')
})

app.listen(7000,()=>{
    console.log('port 7000 ....')
})