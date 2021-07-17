import React, { useContext, useEffect, useState, useRef } from "react"
import { UserContext } from "../user/UserProvider"
import { DirectMessageContext } from "./DirectMessageProvider"
import { useHistory, useParams } from "react-router-dom"
import "./DirectMessage.css"




export const DirectMessageForm = () => {
    const { getUserById } = useContext(UserContext)
    const { addMessage } = useContext(DirectMessageContext)
    const [user, setUser] = useState({ animals: [], location: {}})
    const senderId = parseInt(localStorage.getItem("barkbook_user"))
    const {userId} = useParams()
    const history = useHistory()
    const errorDialog = useRef()

    const [message, setMessage] = useState({
        subject: "",
        message: "",
        read: false,
        recipientId: 0,
        userId: 0,
        date: Date.now()
    })
    

    useEffect(() => {
        getUserById(userId).then((user) => 
        setUser(user))
    }, [])

    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleInputChange = (event) => {
        const newMessage = { ...message }
        newMessage[event.target.name] = event.target.value
        setMessage(newMessage)
    }

    const handleClickSaveMessage = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form
    
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
            recipientId: parseInt(userId),
            userId: senderId,
            date: Date.now()
        }
        addMessage(newMessage)
            .then(() => history.push(`/locations/friends/${user.locationId}`))
        }
    }

    return (
        <>
            <dialog className="dialog dialog--password" ref={errorDialog}>
                <div>Please enter a subject and message</div>
                <button className="button--close" onClick={e => errorDialog.current.close()}>Close</button>
            </dialog>

            <div className="form-flex">
                <h1 className="title">Create a Message to {user.name}</h1>
                <form className="createMessage-form">
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