import React , {Component} from "react"
import Signin from "./Signin"
import AdminNavbar from "./AdminNavbar"
import DisplayProducts from "./DisplayProducts"

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
            username: this.props.username,
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
        if(this.state.loggedIn === false)
        {
            return <Signin/>
        }

        return(
            <div>
           <AdminNavbar username={this.state.username}/>
            <DisplayProducts/>
            </div>
           )
    }


}

