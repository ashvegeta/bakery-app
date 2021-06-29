import React, { Component } from "react"
import {Route,Switch,Redirect} from "react-router-dom"
import Navbar from "./components/Navbar" 
import Signup from "./components/Signup"
import Signin from "./components/Signin"
import Logout from "./components/Logout"
import AdminHome from "./components/AdminHome"

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

  // getupdated()
  // {
  //   //get current user token
  //   const token = localStorage.getItem("token")

  //   let logged = true

  //   if(token == null)
  //   {
  //       logged = false
  //   }


  //   if(this.state.loggedIn!=logged)
  //   {

  //       this.setState({
  //         loggedIn: logged
  //       })
  //   }

  // }


  render(){

    return (
      <div className="App">
        <Switch> 
        <Route path="/sign" exact component={Signup}/>
        <Route path="/signin" exact component={Signin}/> 
        { this.state.loggedIn && <Route path="/" exact component={AdminHome}/>}
        {this.state.loggedIn && <Route path="/admin" component={AdminHome}/>}
        <Route path="/logout" exact component={Logout}/>
        {!this.state.loggedIn && <Route path="/" exact component={Navbar}/>}  
        </Switch>
      </div>
    );
  }
}
