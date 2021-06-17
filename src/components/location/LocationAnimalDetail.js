import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "../animal/AnimalProvider"
import "./Location.css"
import { useParams, useHistory } from 'react-router-dom'


export const LocationAnimalDetail = () => {
    const { getAnimalById } = useContext(AnimalContext)
    const [animal, setAnimal] = useState({ user: {}, animalEnergyLevel: {}, animalSize: {}, animalGender: {}})
    const history = useHistory()
    const {animalId} = useParams()

    useEffect(() => {
        getAnimalById(animalId).then(setAnimal)
    },[animalId])

    return (
        <>
            <h1 className="animalDetail-title title">Meet {animal.name}, and their Human.</h1>
            <div className="parentCard-flex">
                <div className="detail__card">
                    <div className="detail__cardAnimal">
                        <div><img className="user__image avatar" src={ animal.imageURL }></img></div>
                        <div>Name: { animal.name }</div>
                        <div>Breed: { animal.breed }</div>
                        <div>Age: { animal.age }</div>
                        <div>Pet Gender: {animal.animalGender.gender}</div>
                        <div>Pet Size: {animal.animalSize.size}</div>
                        <div>Energy Level: {animal.animalEnergyLevel.energyLevel}</div>
                        <div className="description">{ animal.description }</div>
                    </div>
                    <div className="detail__cardUser">
                        <div className="detail__avatar"><img className="user__image avatar" src={animal.user.imageURL}></img></div>
                        <div className="user__name">{ animal.user.name }</div>
                        <div className="description">{ animal.user.description }</div>
                    </div>
                </div>
            </div>
            <div className="button-message">
                <button className="btn btn-message" onClick={() =>
                    history.push(`/locations/message/${animal.user.id}`)
                }>Send Message</button>
            </div>
        </>
    )
}
