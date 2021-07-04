import React, { Component } from 'react'
import Navbar from './Navbar'
import AdminNavbar from './AdminNavbar'

export default class Contacts extends Component {
    render() {
        return (
            <div>
            {(localStorage.getItem("token")==null) ? 
            (<Navbar/>) 
            : 
            (<AdminNavbar/>)
            }
            <div className="about">
                <img className="photo1" src="ashik.jpg" alt="ashik"></img>
                <div className="authorinfo">
                    Name : Ashik MP<br/>
                    Email : ashik2001mp@gmail.com
                    GitHub : https://github.com/ashvegeta
                </div>
            </div>
            <div className="about">
                <img className="photo2" src="arun.jpeg" alt="arun"></img>
                <div className="authorinfo">
                    Name : Arun Joshua Kennedy<br/>
                    Email : arunkennedy78@gmail.com
                    GitHub : https://github.com/Kraken676
                </div>
            </div>
        </div>
        )
    }
}