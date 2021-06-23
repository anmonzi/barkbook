import React, { useRef, useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import { useHistory } from "react-router-dom"
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
        console.log(file)

        setImage(file.secure_url)
        setLoading(false)
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for barkbook</h1>
                <div>
                    <h3>Upload a Profile Image</h3>
                        <input type="file" name="file" placeholder="Upload an Image"
                        onChange={uploadImage} required />
                        {
                            loading ? 
                            <h3>Loading...</h3>
                            : 
                            <img src={image} style={{
                                objectFit: 'cover',
                                borderRadius: '50%',
                                width: '200px',
                                maxHeight: '200px',
                                boxShadow: '0px 0px 10px rgb(212, 212, 212)',
                                backgroundPosition: 'top center',
                                }}
                            />
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
                {/* <fieldset>
                    <label htmlFor="inputImageUrl"> Upload a Profile Image </label>
                    <input ref={imageURL} type="text" name="image" className="form-control" placeholder="Please Enter A Profile Pic" required />
                </fieldset> */}
                <fieldset>
                    <label htmlFor="inputDescription"> Tell Everyone A Little About You </label>
                    <textarea ref={description} type="text" name="description" className="form-control" placeholder="Enter A Brief Bio " cols={10} rows={10} required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Create Account </button>
                </fieldset>
                <fieldset>
                <button className="btn go-back-btn" onClick={() => {
                    history.push("/login")
                    }}>Go Back</button>
                </fieldset>
            </form>
        </main>
    )
}

