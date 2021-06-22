import React, { useState, useEffect, useContext } from "react"
import { DirectMessageContext } from "./DirectMessageProvider"
import { DirectMessageReply } from "./DirectMessageReply"
import { useParams } from "react-router-dom"
import "./DirectMessage.css"


export const DirectMessage = () => {
    const { getMessageById } = useContext(DirectMessageContext)
    const [ message, setMessage ] = useState({ user: {} })
    const { messageId } = useParams()

  
    useEffect(() => {
        getMessageById(messageId).then(message => {
            setMessage(message)
        })
    }, [messageId])

    
    return (
        <>
        <h1 className="title">Reply to {message.user.name}  </h1>
        <section className="reply-flex">
            <div className="reply-form">
                <div><b>From:</b> {message.user.name} </div>
                <div><b>Date:</b> {
                                    new Intl.DateTimeFormat('en-US', {year: 'numeric',
                                    month: '2-digit', day: '2-digit', hour: 'numeric',
                                    minute: '2-digit', second: '2-digit'}).format(message.date)
                                    }
                </div>
                <div><b>Subject:</b> {message.subject} </div>
                <div><b>Message:</b> {message.message}</div>
            </div>
        </section>
            <br></br>
            <DirectMessageReply userId={message.userId} />
        </>
    )
}