import React from "react"
import { Link } from 'react-router-dom'
import "./LocationAnimalCards.css"




export const AnimalCard = ({ animalObj }) => {
 
    return (
        <>
        <Link className="animalCard__link" to={`/locations/detail/${animalObj.id}`}>
            <div className="animalCard">
                <div><img src={animalObj.imageURL} className="animalCard__avatar"></img></div>
                <div>
                    <div className="">Name: { animalObj.name } </div>
                    <div>Energy Level: { animalObj.animalEnergyLevel.energyLevel } </div>
                    <div>Size: {animalObj.animalSize.size} </div>
                </div>
            </div>
        </Link>
        </>
    )
}
