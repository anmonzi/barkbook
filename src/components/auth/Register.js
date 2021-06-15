import React, { useRef, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { LocationContext } from "../location/LocationProvider"
import "./Login.css"

export const Register = (props) => {
    const { locations, getLocations } = useContext(LocationContext)

    const name = useRef()
    const email = useRef()
    const imageURL = useRef()
    const locationId = useRef()
    const description = useRef()
    const conflictDialog = useRef()
    const history = useHistory()

    useEffect(() => {
        getLocations()
    }, [])

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()
        console.log(locationId.current.value) //TODO delete this console.log 

        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", { 
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: name.current.value,
                            email: email.current.value,
                            locationId: parseInt(locationId.current.value),
                            imageURL: imageURL.current.value,
                            description: description.current.value
                        })
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("barkbook_user", createdUser.id)
                                history.push("/profile")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
        
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for barkbook</h1>
                <fieldset>
                    <label htmlFor="inputName"> Name </label>
                    <input ref={name} type="text" name="name" className="form-control" placeholder="Enter Full Name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email </label>
                    <input ref={email} type="text" name="email" className="form-control" placeholder="Enter Email" required />
                </fieldset>
                <fieldset>
                    <div className="form-group">
                    <label htmlFor="selectLocation">Choose Your Location </label>
                        <select ref={locationId} name="locationId" id="userLocation" className="form-control">
                            <option value="0">Select a location</option>
                            {locations.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.name}
                            </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <label htmlFor="inputImageUrl"> Upload a Profile Image </label>
                    <input ref={imageURL} type="text" name="image" className="form-control" placeholder="Please Enter A Profile Pic" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputDescription"> Tell Everyone A Little About You </label>
                    <textarea ref={description} type="text" name="description" className="form-control" placeholder="Enter A Brief Bio " cols={10} rows={10} required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Create Account </button>
                </fieldset>
            </form>
        </main>
    )
}

