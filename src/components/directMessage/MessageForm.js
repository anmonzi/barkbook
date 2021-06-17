import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../user/UserProvider"
import { DirectMessageContext } from "./DirectMessageProvider"
import { useHistory, useParams } from "react-router-dom"




export const DirectMessageForm = () => {
    const { getUserById } = useContext(UserContext)
    const { addMessage } = useContext(DirectMessageContext)
    const [user, setUser] = useState({ animals: [], location: {}})
    const {userId} = useParams()

    useEffect(() => {
        getUserById(userId).then(setUser)
    }, [])

    return (
        <h1 className="title">Create a Message to {user.name}</h1>
    )
}