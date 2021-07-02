import React from "react"
import { Link } from 'react-router-dom'
import "./LocationAnimalCards.css"




export const AnimalCard = ({ animalObj }) => {
 
    return (
        <>
        <Link className="animalCard__link" to={`/locations/detail/${animalObj.id}`}>
            <div className="animalCard">
                <div><img src={animalObj.imageURL} className="animalCard__avatar" alt="Users dog"></img></div>
                <div className="animal__info">
                    <div className="animal__name"><b>Name:</b> { animalObj.name } </div>
                    <div className="animal__size"><b>Size:</b> {animalObj.animalSize.size}</div>
                    <div className="animal__energy"><b>Energy Level:</b> { animalObj.animalEnergyLevel.energyLevel } </div>
                </div>
            </div>
        </Link>
        </>
    )
}
