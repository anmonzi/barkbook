import React, { useContext, useEffect, useState } from "react"
import { ParkContext } from "./ParkProvider"
import "./Park.css"


export const ParkList = () => {
    const { parks, getParks } = useContext(ParkContext)


    useEffect(() => {
        getParks()
    }, [])


    return (
        <>
            <h1 className="parks-title title">Dog Parks in Davidson County</h1>

            <div className="parksParent__flex">
                <div className="parks">
                    {
                        parks.map(park => 
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
