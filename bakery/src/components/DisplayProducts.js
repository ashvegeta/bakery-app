import React, { Component } from 'react'
import {products} from './products'
import axios from 'axios'

export default class DisplayProducts extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            cart : [

            ]
        }

        this.addItems = this.addItems.bind(this)
    }

    componentDidMount()
    {
        document.title = "Bakery"

        
        axios.post("http://localhost:5000/cart",{ username: localStorage.getItem("username")})
        .then(
            res => {
                this.setState({
                    cart : res.data
                },console.log(this.state.cart)) 
            }
        )
        .catch(err=>{
            console.log("error fetching data:\n"+err)
        })
    }


    addItems(pid,pname,price,qty)
    {
        const product = {
            product_id : pid,
            product_name : pname ,
            price : price,
            quantity : qty
        }

        axios.post("http://localhost:5000/addtocart",{name:localStorage.getItem("username"),product:product})
        .then(
            res => {
                this.setState({
                    cart : res.data
                },console.log(this.state.cart)) 
            }
        )
        .catch(err=>{
            console.log("error adding data:\n"+err)
        })

    }

    render() {
        return (
            <div>
            <div className="display">
                {
                    Object.keys(products).slice(0,3).map((key,index)=>{
                        return(  
                            <div className="homeproduct">
                                <img className="homeimage" src={products[key].src} alt={products[key].product_name}/><br/>
                                <h3>Item  :  {products[key].product_name}</h3><br/>
                                <h3>Price  :  {products[key].price} ₹</h3><br/>
                                <div>
                                    <button className="addtocart" onClick={()=>{this.addItems(key,products[key].product_name,products[key].price,1)}}>Add To Cart</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div><br/>
            <div className="display2">
                {
                    Object.keys(products).slice(3,6).map((key,index)=>{
                        return(  
                            <div className="homeproduct">
                                <img className="homeimage" src={products[key].src} alt={products[key].product_name}/><br/>
                                <h3>Item  :  {products[key].product_name}</h3><br/>
                                <h3>Price  :  {products[key].price} ₹</h3><br/>
                                <div>
                                    <button className="addtocart" onClick={()=>{this.addItems(key,products[key].product_name,products[key].price,1)}}>Add To Cart</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            </div>
        )
    }
}
