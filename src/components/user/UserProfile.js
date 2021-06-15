import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { useHistory } from 'react-router-dom'
import "./UserProfile.css"



export const UserProfile = () => {
    const { getUserById } = useContext(UserContext)
    const { getAnimalByUserId } = useContext(AnimalContext)
    const [user, setUser] = useState({ location: {}, animals: []})
    const [animal, setAnimal] = useState({})
    const history = useHistory()
    const userId = parseInt(localStorage.getItem("barkbook_user"))
    

    useEffect(() => {
        getUserById(userId).then(setUser)
    },[])

    useEffect(() => {
        getAnimalByUserId(userId).then(setAnimal)
    },[])

    // const userAnimal = user.animals.find(animal => animal.userId === userId)
    
            
    return (
        <section>
            <div className="user__welcome">
                <h1>Welcome, {user.name}</h1>
            </div>
            <div className="parent-flex">
                <div className="profileCards__flex">
                    <div className="profileCards__user">
                        <div><img className="user__image avatar" src={user.imageURL}></img></div>
                        <div className="user__name">{ user.name }</div>
                        <div className="user__email">{ user.email }</div>
                        <div>{ user.location.name }</div>
                        <div className="description">{ user.description }</div>
                        <button className="btn btn-edit" onClick={() => {
                                history.push(`/profile/edit/${user.id}`)
                            }}>Edit Profile</button>
                    </div>
                    <div className="profileCards__animal">
                        <div><img className="user__image avatar" src={ animal.imageURL }></img></div>
                        <div>{ animal.name }</div>
                        <div>{ animal.breed }</div>
                        <div>{ animal.age }</div>
                        <div>{ animal.energyLevel }</div>
                        <div>{ animal.animalSize }</div>
                        <div>{  }</div>
                        <div className="description">{ animal.description }</div>
                        <button className="btn btn-edit" onClick={() => {
                                history.push(`/profile/edit/${animal.id}`)
                            }}>Edit Profile</button>
                    </div>
                </div>
            </div>
        </section>
    )
}