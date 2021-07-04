import React, { Component } from "react"
import {Route,Switch} from "react-router-dom"
import Home from "./components/Home" 
import Signup from "./components/Signup"
import Signin from "./components/Signin"
import Logout from "./components/Logout"
import AdminHome from "./components/AdminHome"
import Cart from "./components/Cart"
import Contacts from "./components/Contacts"

export default class App extends Component{
  constructor(props){
    super(props);

    //get current user token
    const token = localStorage.getItem("token")

    let loggedIn = true

    if(token == null)
    {
        loggedIn = false
    }

    this.state = {
        loggedIn
    }
  }

  render(){

    return (
      <div className="App">
        <Switch> 
        {console.log(localStorage.getItem("token"))}
        {localStorage.getItem("token") && <Route path="/" exact component={AdminHome}/>}
        <Route path="/admin" component={AdminHome}/>
        <Route path="/logout" exact component={Logout}/>
        {!localStorage.getItem("token") && <Route path="/" exact component={Home}/>}
        <Route path="/cart" exact component={Cart}/>
        <Route path="/sign" exact component={Signup}/>
        <Route path="/signin" exact component={Signin}/>
        <Route path="/contact" exact component={Contacts}/>
        </Switch>
      </div>
    );
  }
}
