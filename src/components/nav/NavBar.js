import React from "react"
import { Link } from "react-router-dom"
import gmail from "./gmail.png"
import barkbook from "./barkbook.png"
import "./NavBar.css"


export const NavBar = (props) => {

    return (
        <div className="navbar">
            <div className="navbar__item navbar__logo">
                <Link className="navbar__link" to="/profile">
                    <img src={barkbook} alt="barkbook logo" className="barkbook__logo"/>
                </Link>
            </div>
            <ul className="navbar__innerFlex">
                <li className="navbar__item">
                    <Link className="navbar__link hover" to="/parks">Find A Park</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link hover" to="/locations">Find A Pal</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/messages">
                        <img src={gmail} alt="mail icon" className="mail__icon" />
                    </Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link logout__button" onClick={
                        (event) => {
                            localStorage.removeItem("barkbook_user")
                        }
                    }
                    >Logout</Link>
                </li>
            </ul>
        </div>
    )
}

