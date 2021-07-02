import axios from "axios";
import React , {Component} from "react"
import favicon from "../favicon-32x32.png"
import Navbar from "./Navbar";
import AdminHome from "./AdminHome"

export default class Signin extends Component {
    constructor(props){
        super(props);

        //get current user token
        const token = localStorage.getItem("token")

        let loggedIn = true

        if(token == null)
        {
            loggedIn = false
        }

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username : "" , 
            password : "" ,
            loggedIn
        }
    }

    componentDidMount(){
        document.title = "Login"
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

    onSubmit(e){
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
        }


        axios.post("http://localhost:5000/login",user)
        .then(res => {
           if(res.data===true)
           {
               //to get current user from local storage
               localStorage.setItem("token","adnqowdibqosfbo")
               localStorage.setItem("username",this.state.username)

               this.setState({
                   loggedIn: true
               },console.log("state is set"))
           }
        })
        .catch(err=>{ console.log(err)
            document.getElementById("alert").innerHTML = "invalid credentials"
            document.getElementById("alert").style.display = "block";})
    
    }

    render(){
        if(this.state.loggedIn)
        {
            return(
                <AdminHome/>
            )
        }

        return(
        <div>
        <Navbar/>
        <div className="sign-form">
            <form onSubmit={this.onSubmit} method="POST" encType="application/json" id="signin" action="/signin">
                <img src={favicon} alt="favicon"/>
                <p style={{fontSize: "30px",margin:"5%"}}> Login </p>
                <input type="text" name="username" className="username" placeholder="Username" id="username" onChange={this.onChangeUsername} required/>
                <input type="password" name="password" className="password" placeholder="password" onChange={this.onChangePassword} required/>
                <br/><br/>
                <input type="submit" className="submit-btn" value="Sign in"/>
            </form>
            <p className="alert" id="alert"></p>
        </div>
        </div>
        )
    }
}
