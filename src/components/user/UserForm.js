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
    const {userId} = useParams()
    const history = useHistory()



    // when field changes, update state. This causes a re-render and updates the view
    // Controlled component
    const handleInputChange = (event) => {
        const updateUser = { ...user }
        updateUser[event.target.name] = event.target.value
        setUser(updateUser)
        console.log("Change noticed")
    }



    const handleClickSaveUser = () => {
        
        const locationId = parseInt(user.locationId)
        
        if (locationId === 0) {
            window.alert("Please enter a name and choose a location")
        } else {
            // disable the button - no extra clicks
            setIsLoading(true)
            // PUT - update
            updateUser({
                id: user.id,
                name: user.name,
                email: user.email,
                locationId: locationId,
                imageURL: user.imageURL,
                description: user.description
            })
            .then(() => history.push("/profile"))
            
        }
    }


    // Get locations. If employeeId is in the URL, getEmployeeById
    useEffect(() => {
        getLocations().then(() => {
            getUserById(userId)
            .then(user => {
                setUser(user)
                setIsLoading(false)
            })  
        })
    }, [])


    return (
        <div className="form-flex">
            <form className="user-form">
            <h2 className="userForm__title">Update User Profile</h2>
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
            <fieldset>
                <label htmlFor="inputImageUrl"> Update Profile Image </label>
                <input type="text" id="userImage" name="image" className="form-control" required value={user.imageURL} onChange={handleInputChange}/>
            </fieldset>
            <fieldset>
                <label htmlFor="inputDescription"> Update Description </label>
                <textarea type="text" id="userDescription" name="description" className="form-control" cols={10} rows={10} required value={user.description} onChange={handleInputChange}/>
            </fieldset>
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
                }}>Go Back</button>
            </form>
        </div>
    )
}