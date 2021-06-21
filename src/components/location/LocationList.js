import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import { LocationSearch } from "./LocationSearch"
import { Link } from 'react-router-dom'
import "./Location.css"

export const LocationList = () => {
    const { locations, getLocations, searchTerms, setSearchTerms } = useContext(LocationContext)

    const [filteredLocations, setFilteredLocations] = useState([])
    
    
    useEffect(() => {
        getLocations()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            const search = locations.filter(location => location.name.toLowerCase().includes(searchTerms))
            setFilteredLocations(search)
        } else {
            setFilteredLocations(locations)
        }
    }, [searchTerms, locations])

    useEffect(() => {
        setSearchTerms("")
    }, [])

    return (
        <>
            <h1 className="locations-title title">Search Davidson County Locations</h1>
                <LocationSearch />
            <div className="locationsParent__flex">
                <div className="locations">
                {
                    filteredLocations.map(location => 
                        <div className="location" key={location.id} id={`location--${location.id}`}>
                                <Link className="location__link" to={`/locations/friends/${location.id}`}>
                                    <div className="location__card">
                                        <h3 className="location__name">{ location.name }</h3>
                                         {location.users.length} Friends Waiting
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
