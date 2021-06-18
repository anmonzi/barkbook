import React, { useContext } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"


export const LocationSearch = () => {
    const {setSearchTerms} = useContext(LocationContext)

    return (
        <div className="searchBar">
            <div>
                <div className="searchBar__title">Search Locations:</div>
                <input type="text"
                className="input--wide"
                onKeyUp={(event) => setSearchTerms(event.target.value.toLowerCase())}
                placeholder="Search for a location..." />
            </div>
        </div>
    )
}
