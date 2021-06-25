import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "../animal/AnimalProvider"
import { useHistory } from 'react-router-dom'
import "../user/UserProfile.css"



export const AnimalProfile = () => {
    const { getAnimalByUserId } = useContext(AnimalContext)
    const [animals, setAnimals] = useState([{ user: {}, animalEnergyLevel: {}, animalSize: {}, animalGender: {} }])
    const [hasAnimal, setHasAnimal] = useState(false)
    const history = useHistory()
    const userId = parseInt(localStorage.getItem("barkbook_user"))
    

    // Grab user dog if available
    useEffect(() => {
        getAnimalByUserId(userId).then((animalArray) => {
            if (animalArray.length === 1) {
                setHasAnimal(true)
                setAnimals(animalArray)
            } else if (animalArray.length > 1) {
                setHasAnimal(true)
                const newAnimalArray = animalArray
                setAnimals(newAnimalArray)
            } else {
            const animalObj = animalArray
            setAnimals(animalObj)
            }
        })
    },[userId])
    
    
    return (
        <div>
            {animals.map(animal => { 
                return (
                <>
                    {animal.userId
                    ? 
                        <div className="profileCards__animal" key={animal.id}>
                            <div><img className="user__image avatar" src={ animal.imageURL } alt="Users dog"></img></div>
                            <div><b>Name:</b> { animal.name }</div>
                            <div><b>Breed:</b> { animal.breed }</div>
                            <div><b>Age:</b> { animal.age }</div>
                            <div><b>Pet Gender:</b> {animal.animalGender.gender}</div>
                            <div><b>Pet Size:</b> {animal.animalSize.size}</div>
                            <div><b>Energy Level:</b> {animal.animalEnergyLevel.energyLevel}</div>
                            <br></br>
                            <div className="description">{ animal.description }</div>
                            <button className="btn btn-edit" onClick={() => {
                                history.push(`/profile/edit-animal/${animal.id}`)
                                }}>Edit Profile</button>
                        </div>
                    :
                        <div></div>
                    }
                </>
                )
                })
            }

            {hasAnimal
            ?
            <div className="profileCards__addAnimal">
                <div className="btn-flex">
                    <button className="add-animal-btn" onClick={() => history.push("/profile/create-animal")}>
                        Add Another Pet
                    </button>
                </div>
            </div>
            :
            <div className="profileCards__noAnimal">
                <div className="btn-flex">
                    <button className="add-animal-btn" onClick={() => history.push("/profile/create-animal")}>
                        Add Pet
                    </button>
                </div>
            </div>
            }
        </div>
    )
}
