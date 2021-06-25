import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import { LocationContext } from "../location/LocationProvider"
import { useHistory, useParams } from "react-router-dom"
import "./UserForm.css"




export const UserForm = () => {
    const { getUserById, updateUser } = useContext(UserContext)
    const { locations, getLocations } = useContext(LocationContext)
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")

    const [editModeImage, setEditModeImage] = useState("")

    const {userId} = useParams()
    const history = useHistory()



    // when field changes, update state. This causes a re-render and updates the view
    // Controlled component
    const handleInputChange = (event) => {
        const updateUser = { ...user }
        updateUser[event.target.name] = event.target.value
        setUser(updateUser)
    }



    const handleClickSaveUser = () => {
        
        const locationId = parseInt(user.locationId)
        
        if (image === "") {
            // disable the button - no extra clicks
            setIsLoading(true)
            // PUT - update
            updateUser({
                id: user.id,
                name: user.name,
                email: user.email,
                locationId: locationId,
                imageURL: editModeImage,
                description: user.description
            })
            .then(() => history.push("/profile"))
        } else {
            // disable the button - no extra clicks
            setIsLoading(true)
            // PUT - update
            updateUser({
                id: user.id,
                name: user.name,
                email: user.email,
                locationId: locationId,
                imageURL: image,
                description: user.description
            })
            .then(() => history.push("/profile"))
            
        }
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



    // Get locations. If userId is in the URL, getUserById
    useEffect(() => {
        getLocations().then(() => {
            getUserById(userId)
            .then(user => {
                setEditModeImage(user.imageURL)
                setUser(user)
                setIsLoading(false)
            })  
        })
    }, [])

    

    return (
        <div className="form-flex">
            <form className="user-form">
            <h2 className="userForm__title">Update User Profile</h2>
            <div>
                <h3>Update Profile Image</h3>
                {image === "" 
                ?
                <> 
                    <div className="previous-img">
                        <img src={editModeImage}  alt="" className="img-upload" style={{
                            objectFit: 'cover',
                            borderRadius: '50%',
                            width: '200px',
                            height: '200px',
                            boxShadow: '0px 0px 10px rgb(212, 212, 212)',
                            backgroundPosition: 'top center',
                        }}/>
                    </div>
                </>
                :
                <div></div>
                }
                
                <div className="img-upload-container">
                    <input type="file" name="file" placeholder="Upload an Image"
                        onChange={uploadImage} className="img-upload" required />
                        {
                            loading ? 
                            <h3>Loading...</h3> 
                            : 
                            <img src={image} className={ `${image !== ""  ? "loading" : "hidden" }`}/>
                        }
                </div>
            </div>
            <fieldset>
                <div className="form-group">
                <label htmlFor="userName">Update Name:</label>
                <input type="text" id="userName" name="name" required autoFocus className="form-control" value={user.name} onChange={handleInputChange}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="location">Update Location: </label>
                <select name="locationId" id="userLocation" className="form-control" required value={user.locationId} onChange={handleInputChange}>
                    <option value="0">Select a location</option>
                    {locations.map(l => (
                    <option key={l.id} value={l.id} name="location">
                        {l.name}
                    </option>
                    ))}
                </select>
                </div>
            </fieldset>
            {/* <fieldset>
                <label htmlFor="inputImageUrl"> Update Profile Image </label>
                <input type="text" id="userImage" name="image" className="form-control" required value={user.imageURL} onChange={handleInputChange}/>
            </fieldset> */}
            <fieldset>
                <label htmlFor="inputDescription"> Update Description </label>
                <textarea type="text" id="userDescription" name="description" className="form-control" cols={10} rows={10} required value={user.description} onChange={handleInputChange}/>
            </fieldset>
            <div className="user-form-btns">
                <button className="btn btn-primary"
                    disabled={isLoading}
                    onClick={event => {
                        event.preventDefault()
                        handleClickSaveUser()
                    }}>
                    Save User Profile
                    </button>
                <button className="btn go-back-btn" onClick={() => {
                    history.push("/profile")
                    }}>Go Back
                </button>
            </div>
            </form>
        </div>
    )
}