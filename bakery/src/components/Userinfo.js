import React, { Component } from 'react'
import axios from 'axios'
import AdminNavbar from './AdminNavbar'

export default class Userinfo extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            username : "",
            password : "",
            contactno : ""
        }
  
    }

    componentDidMount()
    {
        var request = {
            "username" : localStorage.getItem("username")
        }

        axios.post("http://localhost:5000/getuserinfo",request)
        .then(
            (res) => {
                this.setState({
                    username : res.data["username"],
                    password : res.data["password"],
                    contactno : res.data["contactno"]
                },console.log(res)) 
            }
        )
        .catch(err=>{
            console.log("error fetching data:\n"+err)
        })
    }

    render() {
        if(localStorage.getItem("token")==null)
        {
            return(
                <div>
                   404 : Page not Found
                </div>
            )
        }

        return (
            <div>
                <AdminNavbar/>
            <div className="userinfo">
                <h3>User Info</h3>
                <span>Name : {this.state.username}</span>
                <span>Password : {this.state.password}</span>
                <span>Contact no : {this.state.contactno} </span>
            </div>
            </div>
        )
    }
}
