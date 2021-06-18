import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { useHistory } from 'react-router-dom'
import "./UserProfile.css"



export const UserProfile = () => {
    const { getUserById } = useContext(UserContext)
    const { getAnimalByUserId } = useContext(AnimalContext)
    const [user, setUser] = useState({ location: {}, animals: []})
    const [animal, setAnimal] = useState({ user: {}, animalEnergyLevel: {}, animalSize: {}, animalGender: {}})
    const history = useHistory()
    const userId = parseInt(localStorage.getItem("barkbook_user"))
    
    // Grab current user
    useEffect(() => {
        getUserById(userId).then(setUser) 
    }, [])

    // Grab user dog if available
    useEffect(() => {
        getAnimalByUserId(userId).then((animal) => {
            if (animal.length === 0) {
                setAnimal({})
            } else {
            const animalObj = animal[0]
            setAnimal(animalObj)
            }
        })
    },[])
    
            
    return (
        <section>
            <div className="user__welcome">
                <h1>Welcome, {user.name}</h1>
            </div>
            <div className="parent-flex">
                <div className="profileCards__flex">
                    <div className="profileCards__user">
                        <div><img className="user__image avatar" src={user.imageURL} alt="Users headshot"></img></div>
                        <div className="user__name">{ user.name }</div>
                        <div className="user__email">Email: { user.email }</div>
                        <div>Location :{ user.location.name }</div>
                        <div>Owner of: {user.animals.map(animal => (
                                animal.name
                            )).join(', ')}</div>
                        <div className="description">{ user.description }</div>
                        <button className="btn btn-edit" onClick={() => {
                                history.push(`/profile/edit/${user.id}`)
                            }}>Edit Profile</button>
                    </div>
                    {animal.userId ? 
                        <div className="profileCards__animal">
                            <div><img className="user__image avatar" src={ animal.imageURL } alt="Users dog"></img></div>
                            <div>Name: { animal.name }</div>
                            <div>Breed: { animal.breed }</div>
                            <div>Age: { animal.age }</div>
                            <div>Pet Gender: {animal.animalGender.gender}</div>
                            <div>Pet Size: {animal.animalSize.size}</div>
                            <div>Energy Level: {animal.animalEnergyLevel.energyLevel}</div>
                            <div className="description">{ animal.description }</div>
                            <button className="btn btn-edit" onClick={() => {
                                    history.push(`/profile/edit-animal/${animal.id}`)
                                }}>Edit Profile</button>
                        </div>
                        : 
                        <div>
                            <button onClick={() => history.push("/profile/create-animal")}>
                            Add Pet
                            </button>
                        </div>}
                </div>
            </div>
        </section>
    )
}

