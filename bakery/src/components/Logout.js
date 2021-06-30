import React, { Component } from 'react'
import {Redirect} from "react-router-dom"
import Signin from './Signin'

export default class Logout extends Component {
    constructor(props){
        super(props)
        localStorage.removeItem("token")
        localStorage.removeItem("username")
    }

    render() {
        return (
            <Redirect to="/signin"/>
        )
    }
}
