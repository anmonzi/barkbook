import React, { useContext, useEffect, useState } from "react"
import { ParkContext } from "./ParkProvider"
import "./Park.css"


export const ParkList = () => {
    const { parks, getParks } = useContext(ParkContext)
    const [ locationName, setLocationName ] = useState("all")
    const [ filteredParks, setFilteredParks ] = useState([])


    useEffect(() => {
        getParks()
    }, [])

    useEffect(() => {
        locationName === "all" ? setFilteredParks(parks) : setFilteredParks(parks.filter(park => park.location.name === locationName))
    }, [locationName])

   

    return (
        <>
            <h1 className="parks-title title">Dog Parks in Davidson County</h1>
            <h3 className="parksFilter-buttons">
                <LocationButton name="all" handleSetLocationName={setLocationName} filterActive={ locationName === "all" ? true : false} /> /
                <LocationButton name="Nashville" handleSetLocationName={setLocationName} filterActive={ locationName === "Nashville" ? true : false} /> /
                <LocationButton name="East Nashville" handleSetLocationName={setLocationName} filterActive={ locationName === "East Nashville" ? true : false} /> /
                <LocationButton name="Vaughns Gap" handleSetLocationName={setLocationName} filterActive={ locationName === "Vaughns Gap" ? true : false} /> /
                <LocationButton name="Lincoya Hills" handleSetLocationName={setLocationName} filterActive={ locationName === "Lincoya Hills" ? true : false} /> /
                <LocationButton name="Wedgewood - Houston" handleSetLocationName={setLocationName} filterActive={ locationName === "Wedgewood - Houston" ? true : false} /> /
                <LocationButton name="Nashboro Village" handleSetLocationName={setLocationName} filterActive={ locationName === "Nashboro Village" ? true : false} /> /
                <LocationButton name="Tusculum" handleSetLocationName={setLocationName} filterActive={ locationName === "Tusculum" ? true : false} /> /
                <LocationButton name="Goodlettsville" handleSetLocationName={setLocationName} filterActive={ locationName === "Goodlettsville" ? true : false} /> /
                <LocationButton name="Hermitage Woods" handleSetLocationName={setLocationName} filterActive={ locationName === "Hermitage Woods" ? true : false} /> /
                <LocationButton name="Woodbine" handleSetLocationName={setLocationName} filterActive={ locationName === "Woodbine" ? true : false} />
            </h3>
            <div className="parksParent__flex">
                <div className="parks">
                    {
                        filteredParks.map(park => 
                            <div className="park" key={park.id} id={`park--${park.id}`}>
                                <div className="park__card">
                                    <h2 className="park__name">{ park.name }</h2>
                                    <h3><b>Location:</b> <u>{ park.location.name }</u></h3>
                                    <div><b>Address:</b> { park.address }</div>
                                    <div><b>About:</b> { park.description }</div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}


const LocationButton = ({ name, handleSetLocationName, filterActive }) => {
    return <button className={ `filter-button ${ filterActive ? "active" : null}`} onClick={() => handleSetLocationName(name)}>{ name.toUpperCase() }</button>
}