import React, { useContext } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"


export const LocationSearch = () => {
    const {setSearchTerms} = useContext(LocationContext)

    return (
        <div className="searchBar">
            <div>
                <h3 className="searchBar__title">Search Locations:</h3>
                <input type="text"
                className="input--wide"
                onKeyUp={(event) => setSearchTerms(event.target.value.toLowerCase())}
                placeholder="Search for a location..." />
            </div>
        </div>
    )
}
