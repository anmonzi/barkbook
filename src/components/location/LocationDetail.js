import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { useParams, useHistory } from 'react-router-dom'


export const LocationDetail = () => {
    const { locations, removeLocation } = useContext(LocationContext)
    const [ location, setLocation ] = useState({ location: {}, animals: [] })
    const { locationId } = useParams()
    const history = useHistory() //just returns a value

    useEffect(() => {
        const thisLocation = locations.find(location => location.id === parseInt(locationId)) || { location: {}, animals: [] }

        setLocation(thisLocation)
    }, [locationId])


    const handleRemove = () => {
        removeLocation(location.id)
            .then(() => {
                history.push("/locations")
            })
    }

    return (
        <>
            <button className="btn go-back-btn" onClick={() => {
                history.push("/locations")
            }}>Go Back</button>
            <h2 className="location__name">{ location.name } Friends</h2>
            
            
            <section className="dog__cards">
                <div className="dog__card">
                    Animals staying here:
                    {location.animals.map(animal =>
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
