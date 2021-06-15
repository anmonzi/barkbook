import React, { useContext, useEffect } from "react"
import { LocationContext } from "./LocationProvider"
import { Link } from 'react-router-dom'
import "./Location.css"

export const LocationList = () => {
    const { locations, getLocations } = useContext(LocationContext)
    
    useEffect(() => {
        getLocations()
    }, [])

    return (
        <>
            <h1 className="locations-title">Search Locations</h1>

            <div className="locationsParent__flex">
                <div className="locations">
                {
                    locations.map(location => 
                        <div className="location" key={location.id} id={`location--${location.id}`}>
                                <Link className="location__link" to={`/locations/friends/${location.id}`}>
                                    <div className="location__card">
                                        <h3 className="location__name">{ location.name }</h3>
                                    </div>
                                </Link>
                        </div>
                    )
                }
                </div>
            </div>
        </>
    )
}
