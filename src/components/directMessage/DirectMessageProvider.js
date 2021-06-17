import React, { useState, createContext } from "react"

export const DirectMessageContext = createContext()


export const DirectMessageProvider = (props) => {
    const [messages, setMessages] = useState([])

    const getMessages = () => {
        return fetch("http://localhost:8088/directMessages?_expand=user")
        .then(res => res.json())
        .then((data) => setMessages(data))
    }


    const addMessage = messageObj => {
        return fetch("http://localhost:8088/directMessages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageObj)
        })
        .then(getMessages)
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
                messages, getMessages, removeMessage, addMessage
            }
        }>
            {props.children}
        </DirectMessageContext.Provider>
    )
}