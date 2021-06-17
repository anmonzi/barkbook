import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "../animal/AnimalProvider"
import "./Location.css"
import { useParams, useHistory } from 'react-router-dom'


export const LocationAnimalDetail = () => {
    const { getAnimalById } = useContext(AnimalContext)
    const [animal, setAnimal] = useState({})
    const history = useHistory()
    const {animalId} = useParams()

    useEffect(() => {
        getAnimalById(animalId).then(setAnimal)
    },[animalId])

    return (
        <>
            <h1 className="animalDetail-title">Meet {animal.name}, and their Human.</h1>
            
        </>
    )
}
