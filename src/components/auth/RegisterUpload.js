import React, { useRef, useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import { useHistory } from "react-router-dom"
import barkbook from "../nav/barkbook.png"
import "./Login.css"

export const RegisterUpload = (props) => {
    const { locations, getLocations } = useContext(LocationContext)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")

    const name = useRef()
    const email = useRef()
    // const imageURL = useRef()
    const locationId = useRef()
    const description = useRef()
    const conflictDialog = useRef()
    const errorDialog = useRef()
    const history = useHistory()

    useEffect(() => {
        getLocations()
    }, [])

    const existingUserCheck = () => {
        return fetch(`https://barkbook-api-q3b97.ondigitalocean.app/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()
        const userLocation = parseInt(locationId.current.value)
        if (userLocation === 0) {
            errorDialog.current.showModal()
            return
        }

        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("https://barkbook-api-q3b97.ondigitalocean.app/users", { 
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: name.current.value,
                            email: email.current.value,
                            locationId: parseInt(locationId.current.value),
                            imageURL: image,
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


    const uploadImage = async event => {
        const files = event.target.files
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "barkbookimages")
        setLoading(true)
        
        const response = await fetch("https://api.cloudinary.com/v1_1/dv6jdeyfx/image/upload",
        {
            method: "POST",
            body: data
        })

        const file = await response.json()
        

        setImage(file.secure_url)
        setLoading(false)
    }

    const checkKeyDown = (event) => {
        if (event.code === "Enter") event.preventDefault()
    }


    return (
        <main className="container--login" style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <dialog className="dialog dialog--password" ref={errorDialog}>
                <div>Please select a user location</div>
                <button className="button--close" onClick={e => errorDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister} onKeyDown={(event) => checkKeyDown(event)}>
            <div className="login-logo--flex">
                <h1 className="h3 mb-3 font-weight-normal login-welcome">register for</h1>
                <img src={barkbook} alt="barkbook logo" className="barkbook__logo__welcome logo_mobile"/>
            </div>
                <div>
                    <h3>Upload a Profile Image</h3>
                        <input type="file" name="file" placeholder="Upload an Image"
                        onChange={uploadImage} required />
                        {loading
                        ? 
                        <h3>Loading...</h3> 
                        : 
                        <img src={image} className={ `${image !== ""  ? "loading" : "hidden" }`}/>
                    }
                </div>
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
                        <select ref={locationId} name="locationId" id="userLocation" className="form-control" required >
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
                    <label htmlFor="inputDescription"> Tell Everyone A Little About You </label>
                    <textarea ref={description} type="text" name="description" className="form-control" placeholder="Enter A Brief Bio " cols={10} rows={10} required />
                </fieldset>
                <div className="form-btns">
                    <button type="submit" className="btn btn-login"> Create Account </button>
                    <button className="btn btn-login" onClick={() => {
                        history.push("/login")
                        }}>Go Back</button>
                </div>
            </form>
        </main>
    )
}

