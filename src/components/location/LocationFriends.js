import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import { UserContext } from "../user/UserProvider"
import "./Location.css"
import { useParams, useHistory } from 'react-router-dom'

//TODO trying to populate dogs in designated location

export const LocationFriends = () => {
    const { locations, getLocations } = useContext(LocationContext)
    const { users, getUsers } = useContext(UserContext)
    const [ location, setLocation ] = useState({ users: [] })
    const [ user, setUser ] = useState({ animals: [] })
    const { locationId } = useParams()
    const history = useHistory() //just returns a value

    useEffect(() => {
        const thisLocation = locations.find(location => location.id === parseInt(locationId)) || { users: [] }

        setLocation(thisLocation)
    }, [locationId])
    
    useEffect(() => {
        const locationUsers = users.find(user => user.location.id === parseInt(locationId)) || { animals: [] }

        setUser(locationUsers)
    }, [locationId])

    useEffect(() => {
        getUsers()
    }, [])

    

    return (
        <>
            <button className="btn go-back-btn" onClick={() => {
                history.push("/locations")
            }}>Go Back</button>
            <h2 className="location__name">{ location.name } Friends</h2>
            
            
            <section className="dog__cards">
                <div className="dog__card">
                    {location.users.map(user =>
                        <div className="location__animal__name" key={user.id}> { user.name } </div>
                    )}
                </div>
            </section>
            <section className="dog__cards">
                <div className="dog__card">
                    {user.animals.map(animal =>
                        <div className="location__animal__name" key={animal.id}> { animal.name } </div>
                    )}
                </div>
                <br></br>
                <button className="btn btn-primary" onClick={() => {
                    history.push(`/locations/edit/${location.id}`)
                }}>Edit Location</button>
            </section>
        </>
    )
}
