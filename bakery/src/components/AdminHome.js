import React , {Component} from "react"
import {Redirect,Link} from "react-router-dom"
import Signin from "./Signin"

export default class AdminHome extends Component {
    constructor(props)
    {
        super(props)

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

    componentDidUpdate()
    {
      //get current user token
      const token = localStorage.getItem("token")

      let logged = true

      if(token == null)
      {
          logged = false
      }

      if(logged!==this.state.loggedIn)
      this.setState({
        loggedIn: logged
      })
    
    }


    render(){
        console.log(this.state.loggedIn)

        if(this.state.loggedIn === false)
        {
            return <Signin/>
        }

        return(
            <header>
            <p className="logo">Bakery</p>
        <nav>
            <ul className="list">
                <li><Link to = "/">Home</Link></li>
                <li><Link to = "/about">About</Link></li>
                <li><Link to = "/contact">Contact Us</Link></li>
                <li>User</li>
                <li><Link to = "/logout">Logout</Link></li>
            </ul>
        </nav>
        </header>
        )
    }

}