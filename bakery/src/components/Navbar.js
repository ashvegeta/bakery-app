import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
        <header>
        <p className="logo">Bakery</p>
        <nav>
            <ul className="list">
                <li><Link to = "/">Home</Link></li>
                <li><Link to = "about">About</Link></li>
                <li><Link to = "contact">Contact Us</Link></li>
                <li><Link to = "/sign">Sign in/Sign up</Link></li>
            </ul>
        </nav>
        </header>
        )
    }
}
