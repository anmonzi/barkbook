import React, { useState, createContext } from "react"

export const UserContext = createContext()


export const UserProvider = (props) => {
    const [users, setUsers] = useState([])// initially users is an empty array which gets updated with state by setUsers
    
    const getUsers = () => {
        return fetch("http://localhost:8088/users?_embed=animals&_expand=location")
        .then(res => res.json())
        .then((data) => setUsers(data)) // updates state
    }


    const getUserById = userId => {
        return fetch(`http://localhost:8088/users/${userId}?_embed=animals&_expand=location`)
        .then(res => res.json())
    }


    const updateUser = user => {
        return fetch(`http://localhost:8088/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(getUsers)
    }


    return (
        <UserContext.Provider value= {
            {
                users, getUsers, getUserById, updateUser
            }
        }>
            {props.children}
        </UserContext.Provider>
    )
}