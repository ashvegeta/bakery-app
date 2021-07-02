import React , {Component} from "react"
import favicon from "../favicon-32x32.png"
import {Link,Redirect} from "react-router-dom"
import Navbar from "./Navbar"
import axios from "axios"
import AdminHome from "./AdminHome"

export default class Signup extends Component {
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeContactno = this.onChangeContactno.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username : "" , 
            password : "" ,
            contactno : "",
            userAdded : false
        }
    }

    componentDidMount(){
        document.title = "Sign up"
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value

        })
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
            
        })
    }

    onChangeContactno(e){
        this.setState({
            contactno: e.target.value      
        })
    }


    onSubmit(e){
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
            contactno: this.state.contactno
        }
        
        axios.post("http://localhost:5000/signup",user)
        .then(
            res => {
                if(res.data===true)
                {
                    this.setState({
                        userAdded: true
                    })
                }
            }
        )
        .catch(err=>{
            console.log(err)
            document.getElementById("alert").innerHTML = "User exists"
            document.getElementById("alert").style.display = "block"
        })
    }

    render(){
        if(localStorage.getItem("token"))
        {
            return <AdminHome/>
        }

        if(this.state.userAdded)
        {
            return <Redirect to="/signin"/>
        }

        return(
        <div>
        <Navbar/>
        <div className="sign-form">
            <form onSubmit={this.onSubmit} encType="application/json" method="POST" id="signup" action="/signup">
                <img src={favicon} alt="favicon"/>
                 <p style={{fontSize: "30px",margin: "5%"}}> Sign Up Now </p>
                <input type="text" name="username" className="username" placeholder="Username" onChange={this.onChangeUsername} required/>
                <input type="password" name="password" className="password" placeholder="password"  onChange={this.onChangePassword}required/>
                <input type="tel" name="contactno" className="contactno" placeholder="Contact no" pattern="[0-9]{10}"  onChange={this.onChangeContactno}required/>
                <br/><br/>
                <input type="submit" className="submit-btn" value="Sign up"/>
                <hr/>
                <p> Do you have an account ? <Link to="/signin">Sign in</Link></p>
            </form>
            <p className="alert" id="alert"></p>
        </div>
        </div>
        )
    }
}
