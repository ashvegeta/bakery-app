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
            sidebar: false

        }

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
                 <IconContext.Provider value={{fill : 'red'}}>
                {/* <p style={{margin: "10px"}} className="logo">Bakery</p> */}
                <p style={{marginTop:"12px",marginLeft:"20px", fontSize:"35px",width:"90%",display:"inline-block"}}>Bakery</p>

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
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
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
