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
            <h1 className="animalDetail-title title">Meet {animal.name}, and their Hooman.</h1>
            <div className="parentCard-flex">
                <div className="detail__card">
                    <div className="detail__cardAnimal">
                        <div><img className="user__image avatar" src={ animal.imageURL } alt="Users dog"></img></div>
                        <div><b>Name:</b> { animal.name }</div>
                        <div><b>Breed:</b> { animal.breed }</div>
                        <div><b>Age:</b> { animal.age }</div>
                        <div><b>Pet Gender:</b> <mark>{animal.animalGender.gender}</mark></div>
                        <div><b>Pet Size:</b> <mark>{animal.animalSize.size}</mark></div>
                        <div><b>Energy Level:</b> <mark>{animal.animalEnergyLevel.energyLevel}</mark></div>
                        <br></br>
                        <div className="description">{ animal.description }</div>
                    </div>
                    <div className="detail__cardUser">
                        <div className="detail__avatar"><img className="user__image avatar" src={animal.user.imageURL} alt="Users headshot"></img></div>
                        <div className="user__name"><b>{ animal.user.name }</b></div>
                        <br></br>
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
