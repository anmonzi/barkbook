import React, { useState, useEffect, useContext } from "react"
import { DirectMessageContext } from "./DirectMessageProvider"
import "./DirectMessage.css"


export const MessageList = () => {
    const { messages, getMessages, removeMessage } = useContext(DirectMessageContext)
    const userId = parseInt(localStorage.getItem("barkbook_user"))

    useEffect(() => {
        getMessages()
    }, [])

    
    const userMessages = messages.filter(message => message.recipientId === userId)

    

    return (
        <>
            <h1 className="messages-title">Current Messages</h1>

            <div className="messagesParent-flex">
                <div className="messages">
                    {
                        userMessages.map(message => 
                            <>
                                <div className="message" key={message.id}>
                                    <div className="message__subject">From: { message.user.name } </div>
                                    <div className="message__subject">Subject: { message.subject } </div>
                                    <div className="message__subject">Date: { message.date } </div>
                                    <div className="message__message">Message: { message.message } </div>
                                    <div className="btn-delete-flex">
                                        <button className="btn btn-delete" onClick={() => {
                                            removeMessage(message.id)
                                        }}>Delete Message</button>
                                    </div>
                                </div>
                            </>                            
                        )}  
                </div>
            </div>
        </>
    )
}
