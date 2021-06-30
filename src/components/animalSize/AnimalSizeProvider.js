import React, { useState, createContext } from "react"

export const AnimalSizeContext = createContext()


export const AnimalSizeProvider = (props) => {
    const [animalSizes, setAnimalSizes] = useState([])
    const [filteredSizeValue, setFilteredSizeValue] = useState(0)

    const getAnimalSizes = () => {
        return fetch("http://localhost:8088/animalSizes")
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