import React, { useState, createContext } from "react"

export const AnimalSizeContext = createContext()


export const AnimalSizeProvider = (props) => {
    const [animalSizes, setAnimalSizes] = useState([])
    const [filteredSizeValue, setFilteredSizeValue] = useState(0)

    const getAnimalSizes = () => {
        return fetch("https://barkbook-api-44wte.ondigitalocean.app/animalSizes")
        .then(res => res.json())
        .then((data) => setAnimalSizes(data))
    }

    return (
        <AnimalSizeContext.Provider value= {
            {
                animalSizes, getAnimalSizes,
                filteredSizeValue, setFilteredSizeValue
            }
        }>
            {props.children}
        </AnimalSizeContext.Provider>
    )
}