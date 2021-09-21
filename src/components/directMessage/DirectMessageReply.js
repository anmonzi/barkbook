import React, { useEffect, useContext, useState, useRef } from "react"
import { isMobile } from "react-device-detect"
import { DirectMessageContext } from "./DirectMessageProvider"
import { useHistory } from 'react-router-dom'
import "./DirectMessage.css"


export const DirectMessageReply = ({ userId }) => {
    const { getMessages, addMessage } = useContext(DirectMessageContext)
    const senderId = parseInt(localStorage.getItem("barkbook_user"))
    const history = useHistory()
    const errorDialog = useRef()
    
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
        if (isMobile) {
            if (message.subject === "" || message.message === "") {
                window.alert("Please fill in all fields")
                return
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

        if (!isMobile) {
            if (message.subject === "" || message.message === "") {
                errorDialog.current.showModal()
                return
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
          
    }


    useEffect(() => {
        getMessages()
    }, [])


    return (
        <>
            <dialog className="dialog dialog--password" ref={errorDialog}>
                <div>Please enter a subject and message</div>
                <button className="button--close" onClick={e => errorDialog.current.close()}>Close</button>
            </dialog>

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