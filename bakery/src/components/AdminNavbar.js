import React, { Component } from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import { IconContext } from 'react-icons'
import '../Navbar.css'

export default class AdminNavbar extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            sidebar: false,
            username: localStorage.getItem("username")
        }

        console.log("this state user: ",this.state.username)

        this.showSidebar = this.showSidebar.bind(this)
    }

    showSidebar()
    {
        this.setState({
            sidebar: !this.state.sidebar
        })
    }

    render() {
        return (
            <div>
                 <IconContext.Provider value={{size:"20px"}}>
                <p className="adminlogo">Bakery</p>

                <div className="navbar">
               
                <Link to="#" className="menu-bars">
                    <FaIcons.FaBars size={25} onClick={this.showSidebar}/>
                </Link>
                </div>

                <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>

                    <ul className="nav-menu-items" onClick={this.showSidebar}>
                        <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiIcons.AiFillCloseSquare size={24}/>
                        </Link>
                        </li>
                        {SidebarData.map((item,index) => {
                            return(
                                <li key={index} className={item.cName}>
                                    <Link to={item.path==="/" ? ("/admin") : (item.path)}>
                                        {item.icon}
                                        {item.title!=='User'? (<span>{item.title}</span>) : (<span>{this.state.username}</span>)}
                                    </Link>
                                </li>
                            )    
                        })}
                    </ul>
                </nav>
                </IconContext.Provider>
                </div>
        )
    }
}
