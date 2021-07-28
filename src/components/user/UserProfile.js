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
            <div>
                <h1 className="user__welcome">Welcome, {user.name}</h1>
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
                </div>
            </div>
        </section>
    )
}

