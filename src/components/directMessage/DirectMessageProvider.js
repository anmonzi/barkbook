import React, { useState, createContext } from "react"

export const DirectMessageContext = createContext()


export const DirectMessageProvider = (props) => {
    const [messages, setMessages] = useState([])

    const getMessages = () => {
        return fetch("http://localhost:8088/directMessages?_expand=user")
        .then(res => res.json())
        .then((data) => setMessages(data))
    }

    const removeMessage = messageId => {
        return fetch(`http://localhost:8088/directMessages/${messageId}`, {
            method: "DELETE"
        })
        .then(getMessages)
    }


    return (
        <DirectMessageContext.Provider value= {
            {
                messages, getMessages, removeMessage
            }
        }>
            {props.children}
        </DirectMessageContext.Provider>
    )
}