import React, { useState, createContext } from "react"

export const ParkContext = createContext()


export const ParkProvider = (props) => {
    const [parks, setParks] = useState([])


    const getParks = () => {
        return fetch("http://localhost:8088/parks?_expand=location")
        .then(res =>  res.json())
        .then((data) => setParks(data))
    }


    return (
        <ParkContext.Provider value= {
            {
                parks, getParks
            }
        }>
            {props.children}
        </ParkContext.Provider>
    )
}