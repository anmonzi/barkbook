import React from "react"
import { Link, useHistory } from "react-router-dom"
import gmail from "./gmail.png"
import "./NavBar.css"


export const NavBar = (props) => {
    const history = useHistory()

    return (
        <ul className="navbar">
            <li className="navbar__item navbar__logo">
                <Link className="navbar__link" to="/profile">Temp Home Button</Link>
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
    )
}

