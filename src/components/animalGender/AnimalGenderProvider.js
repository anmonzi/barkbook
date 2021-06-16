import React, { useState, createContext } from "react"

export const AnimalGenderContext = createContext()


export const AnimalGenderProvider = (props) => {
    const [animalGenders, setAnimalGenders] = useState([])

    const getAnimalGenders = () => {
        return fetch("http://localhost:8088/animalGenders")
        .then(res => res.json())
        .then((data) => setAnimalGenders(data))
    }

    return (
        <AnimalGenderContext.Provider value= {
            {
                animalGenders, getAnimalGenders
            }
        }>
            {props.children}
        </AnimalGenderContext.Provider>
    )
}