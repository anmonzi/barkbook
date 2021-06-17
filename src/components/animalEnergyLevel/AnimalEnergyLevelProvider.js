import React, { useState, createContext } from "react"

export const AnimalEnergyLevelContext = createContext()


export const AnimalEnergyLevelProvider = (props) => {
    const [animalEnergyLevels, setAnimalEnergyLevels] = useState([])

    const getAnimalEnergyLevels = () => {
        return fetch("http://localhost:8088/animalEnergyLevels")
        .then(res => res.json())
        .then((data) => setAnimalEnergyLevels(data))
    }

    

    return (
        <AnimalEnergyLevelContext.Provider value= {
            {
                animalEnergyLevels, getAnimalEnergyLevels
            }
        }>
            {props.children}
        </AnimalEnergyLevelContext.Provider>
    )
}