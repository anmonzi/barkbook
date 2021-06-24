import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import { AnimalProfile } from "../animal/AnimalProfile"
import { useHistory } from 'react-router-dom'
import "./UserProfile.css"



export const UserProfile = () => {
    const { getUserById } = useContext(UserContext)
    const [user, setUser] = useState({ location: {}, animals: []})
    const history = useHistory()
    const userId = parseInt(localStorage.getItem("barkbook_user"))
    
    // Grab current user
    useEffect(() => {
        getUserById(userId).then(setUser) 
    }, [])
    
            
    return (
        <section>
            <div className="user__welcome">
                <h1>Welcome, {user.name}</h1>
            </div>
            <div className="parent-flex">
                <div className="profileCards__flex">
                    <div className="profileCards__user">
                        <div><img className="user__image avatar" src={user.imageURL} alt="Users headshot"></img></div>
                        <div className="user__name"><b>{ user.name }</b></div>
                        <div className="user__email"><b>Email:</b> { user.email }</div>
                        <div><b>Location:</b> { user.location.name }</div>
                        <div><b>Owner of:</b> {user.animals.map(animal => (
                                animal.name
                            )).join(', ')}</div>
                            <br></br>
                        <div className="description">{ user.description }</div>
                        <button className="btn btn-edit" onClick={() => {
                                history.push(`/profile/edit/${user.id}`)
                            }}>Edit Profile</button>
                    </div>
                    <AnimalProfile />
                    {/* {animal.userId ? 
                        <div className="profileCards__animal">
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
                        <div className="profileCards__noAnimal">
                            <div className="btn-flex">
                                <button className="add-animal-btn" onClick={() => history.push("/profile/create-animal")}>
                                Add Pet
                                </button>
                            </div>
                        </div>
                    } */}
                </div>
            </div>
        </section>
    )
}

