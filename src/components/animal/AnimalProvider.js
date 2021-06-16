import React, { useState, createContext } from "react"

export const AnimalContext = createContext()


export const AnimalProvider = (props) => {
    const [animals, setAnimals] = useState([])

    const getAnimals = () => {
        return fetch("http://localhost:8088/animals?_expand=user&_expand=animalEnergyLevel&_expand=animalSize&_expand=animalGender")
        .then(res => res.json())
        .then((data) => setAnimals(data))
    }


    const getAnimalById = animalId => {
        return fetch(`http://localhost:8088/animals/${animalId}`)
        .then(res => res.json())
    }

    
    const getAnimalByUserId = userId => {
        return fetch(`http://localhost:8088/animals/?userId=${userId}&_expand=user&_expand=animalEnergyLevel&_expand=animalSize&_expand=animalGender`)
        .then(res => res.json())
    }


    const addAnimal = animalObj => {
        return fetch("http://localhost:8088/animals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animalObj)
        })
        .then(getAnimals)
    }


    const updateAnimal = animal => {
        return fetch(`http://localhost:8088/animals/${animal.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animal)
        })
        .then(getAnimals)
    }


    const removeAnimal = animalId => {
        return fetch(`http://localhost:8088/animals/${animalId}`, {
            method: "DELETE"
        })
        .then(getAnimals)
    }


    return (
        <AnimalContext.Provider value= {
            {
                animals, getAnimals, addAnimal,
                removeAnimal, getAnimalById, updateAnimal,
                getAnimalByUserId
            }
        }>
            {props.children}
        </AnimalContext.Provider>
    )
}