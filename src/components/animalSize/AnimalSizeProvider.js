import React, { useState, createContext } from "react"

export const AnimalSizeContext = createContext()


export const AnimalSizeProvider = (props) => {
    const [animalSizes, setAnimalSizes] = useState([])

    const getAnimalSizes = () => {
        return fetch("http://localhost:8088/animalSizes")
        .then(res => res.json())
        .then((data) => setAnimalSizes(data))
    }

    return (
        <AnimalSizeContext.Provider value= {
            {
                animalSizes, getAnimalSizes
            }
        }>
            {props.children}
        </AnimalSizeContext.Provider>
    )
}