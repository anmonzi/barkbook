import React, { useEffect, useContext, useState } from "react"
import { DirectMessageContext } from "./DirectMessageProvider"
import { useHistory } from 'react-router-dom'
import "./DirectMessage.css"


export const DirectMessageReply = ({ userId }) => {
    const { getMessages, addMessage } = useContext(DirectMessageContext)
    const senderId = parseInt(localStorage.getItem("barkbook_user"))
    const history = useHistory()
    
    const [message, setMessage] = useState({
        subject: "",
        message: "",
        read: false,
        recipientId: 0,
        userId: senderId,
        date: Date.now()
    })

    const handleInputChange = (event) => {
        const newMessage = { ...message }
        newMessage[event.target.name] = event.target.value
        setMessage(newMessage)
    }

    const handleClickSaveMessage = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form
    
        if (message.subject === "" || message.message === "") {
          window.alert("Please select a location and a customer")
        } else {
          //Invoke addMessage passing the new message object as an argument
          //Once complete, change the url and display the user profile
          const newMessage = {
            subject: message.subject,
            message: message.message,
            read: false,
            recipientId: userId,
            userId: senderId,
            date: Date.now()
          }
          addMessage(newMessage)
            .then(() => history.push("/messages"))
        }
      }
 

    useEffect(() => {
        getMessages()
    }, [])


    return (
        <>
            <div className="form-flex">
                <form className="reply-form">
                <fieldset>
                    <div className="form-group">
                    <label htmlFor="userName">Subject:</label>
                    <input type="text" id="messageSubject" name="subject" required autoFocus className="form-control" value={message.subject} onChange={handleInputChange}/>
                    </div>
                </fieldset>
                <fieldset>
                    <label htmlFor="inputDescription"> Message: </label>
                    <textarea type="text" id="messageBody" name="message" className="form-control" cols={10} rows={10} required value={message.message} onChange={handleInputChange}/>
                </fieldset>
                <div className="btn-flex">
                    <button className="btn btn-send btn-primary" 
                    onClick={handleClickSaveMessage}>
                        Send Message
                    </button>
                </div>
                </form>
            </div>
        </>
    )
}