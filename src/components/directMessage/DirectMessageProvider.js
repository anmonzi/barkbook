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

    const getMessageById = messageId => {
        return fetch(`http://localhost:8088/directMessages/${messageId}?_expand=user`)
        .then(res => res.json())
    }


    const updateMessage = message => {
        return fetch(`http://localhost:8088/directMessages/${message.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
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
                messages, getMessages, removeMessage, addMessage, getMessageById, updateMessage
            }
        }>
            {props.children}
        </DirectMessageContext.Provider>
    )
}