import React , {Component} from "react"
import { products } from "./products"
import Navbar from "./Navbar"

export default class Home extends Component {
    componentDidMount(){
        document.title = "Bakery"
    }

    render(){
        return(
        <div>
        <Navbar/>

        <div>
            <div className="display">
                {
                    Object.keys(products).slice(0,3).map((key,index)=>{
                        return(  
                            <div className="homeproduct">
                                <img className="homeimage" src={products[key].src} alt={products[key].product_name}/><br/>
                                <h3>Item  :  {products[key].product_name}</h3><br/>
                                <h3>Price  :  {products[key].price} ₹</h3><br/>
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
                            </div>
                        )
                    })
                }
            </div>
            </div>
        </div>
        )
    }
}
