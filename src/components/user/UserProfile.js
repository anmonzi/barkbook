import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import "./UserProfile.css"



export const UserProfile = () => {
    const { getUserById } = useContext(UserContext)
    const [user, setUser] = useState({})
    const userId = parseInt(localStorage.getItem("barkbook_user"))
    

    useEffect(() => {
        getUserById(userId).then(setUser)
    },[])

    
            
    return (
        <>
            <section className="user__welcome">
                <h1 className="user__name">Welcome {user.name}</h1>
            </section>

            <div className="profileCards__flex">
                <div className="profileCards__user">
                    <img className="user__image" src={user.imageURL}></img>
                </div>
                <div className="profileCards__animal">

                </div>
            </div>
        </>
    )
}