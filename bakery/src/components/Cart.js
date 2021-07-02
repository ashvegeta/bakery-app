import React, { Component } from 'react'
import axios from "axios"
import { Redirect } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import * as AiIcons from 'react-icons/ai';
import { products } from './products';

export default class Cart extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            cart : [

            ],
            total: 0
        }

        this.deleteItems = this.deleteItems.bind(this)
        this.updateItems = this.updateItems.bind(this)
        this.getCartTotal = this.getCartTotal.bind(this)

    }

    componentDidMount()
    {

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

    deleteItems(pid)
    {
        const product = {
            product_id : pid,
        }

        axios.post("http://localhost:5000/deletefromcart",{name:localStorage.getItem("username"),product:product})
        .then(
            res => {
                this.setState({
                    cart : res.data
                },console.log(this.state.cart)) 
            }
        )
        .catch(err=>{
            console.log("error deleting data:\n"+err)
        })
    }

    updateItems(pid,qty)
    {
        if(qty>-1)
        {
            const product = {
                product_id: pid,
                quantity : qty
            }

            axios.post("http://localhost:5000/updatecart",{name:localStorage.getItem("username"),product:product})
            .then(
                res => {
                    this.setState({
                        cart : res.data
                    }) 
                }
            )
            .catch(err=>{
                console.log("error updating data:\n"+err)
            })
        }
    }

    getCartTotal()
    {
        var total = 0
        for(var i=0;i<this.state.cart.length;i++)
        {
            total+=this.state.cart[i]["price"]*this.state.cart[i]["quantity"]
        }

        return total
    }

    render() {
        if(!localStorage.getItem("token"))
        {
            return <Redirect to="/"/>
        }

        console.log(this.state.cart)

        return (
            <div>
                <AdminNavbar/>

                <div className="products">
                    <ul className="products-list">
                        {
                            this.state.cart.map((item) => {
                                return(
                                        <li key={item.product_id} className="product">
                                            <img className="productimage" src={products[item.product_id].src}/>
                                            <div className="product-info">
                                                item : {item.product_name}
                                                 <br/><br/>
                                                Price : {item.price} <br/><br/>
                                                Quantity : {item.quantity}
                                            </div>
                                            <button className="qty" onClick={() => this.updateItems(item.product_id,item.quantity+1)}><AiIcons.AiOutlineArrowUp/></button>
                                            <button className="qty" onClick={() => this.updateItems(item.product_id,item.quantity-1)}><AiIcons.AiOutlineArrowDown/></button>
                                        <button className="remove-from-cart" onClick={() => this.deleteItems(item.product_id)}>Remove</button>
                                        </li>
                                    )
                                })
                        }
                    </ul>
                </div>
                <div className="cartinfo">
                        <h2>Cart info</h2>
                        <br/><br/>
                        <span className="left">Item</span>
                        <span className="center">Price</span>
                        <span className="right">Qty</span><br/>
                        <ul>
                        {
                            this.state.cart.map((item) => {
                                return(
                                        <li>
                                            <span className="left">{item.product_name}</span>
                                            <span className="center">{item.price}</span>
                                            <span className="right">{item.quantity}</span>
                                        </li>
                                )
                            })

                        }
                        </ul>
                        <br/><br/><hr/><br/>
                        <span className="left">Total</span>
                        <span className="right">{this.getCartTotal()}&ensp;₹</span>
                </div>
            </div>
        )
    }
}

