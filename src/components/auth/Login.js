import React, { useRef } from "react"
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import barkbook from "../nav/barkbook.png"
import "./Login.css"


export const Login = (props) => {
    const email = useRef()
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`https://barkbook-api-q3b97.ondigitalocean.app/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("barkbook_user", exists.id)
                    history.push("/profile")
                } else {
                    if (isMobile) {
                        window.alert("User does not exist")
                        return
                    } else if (!isMobile) {
                        existDialog.current.showModal()
                    }
                }
            })
    }

    return (
        <>
            <main className="container--login">
                <dialog className="dialog dialog--auth" ref={existDialog}>
                    <div>User does not exist</div>
                    <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
                </dialog>

                <section>
                    <form className="form--login" onSubmit={handleLogin}>
                        <div className="login-logo--flex">
                            <h1 className="login-welcome">welcome to</h1>
                            <img src={barkbook} alt="barkbook logo" className="barkbook__logo__welcome logo_mobile"/>
                            <h2>Please sign in</h2>
                            <fieldset>
                                <label htmlFor="inputEmail"> Email address </label>
                                <input ref={email} type="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="demo@barkbook.com"
                                    required autoFocus />
                            </fieldset>
            {/* <div className="login-photo-flex">
                <img src={login} alt="shepard looking at logo" className="login-photo"/>
            </div> */}
                            <fieldset>
                                <button className="btn btn-login" type="submit">
                                    Sign in
                                </button>
                            </fieldset>
                        </div>
                    </form>
                </section>
                <section>
                    <Link to="/register" className="link--register">Not a member yet?</Link>
                </section>
            </main>
        </>
    )
}

