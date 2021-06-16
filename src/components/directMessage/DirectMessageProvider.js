import React, { useState, createContext } from "react"

export const DirectMessageContext = createContext()


export const DirectMessageProvider = (props) => {
    const [messages, setMessages] = useState([])

    const getMessages = () => {
        return fetch("http://localhost:8088/directMessages?_expand=user")
        .then(res => res.json())
        .then((data) => setMessages(data))
    }


    return (
        <DirectMessageContext.Provider value= {
            {
                messages, getMessages
            }
        }>
            {props.children}
        </DirectMessageContext.Provider>
    )
}