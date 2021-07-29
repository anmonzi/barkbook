import React, { useEffect, useContext } from "react";
import { DirectMessageContext } from "./DirectMessageProvider";
import { useHistory } from "react-router-dom";
import "./DirectMessage.css";

export const MessageList = () => {
  const { messages, getMessages, removeMessage, updateMessage } =
    useContext(DirectMessageContext);
  const userId = parseInt(localStorage.getItem("barkbook_user"));
  const history = useHistory();

  useEffect(() => {
    getMessages();
  }, []);

  const sortedMessages = messages.sort((a, b) => {
    return b.date - a.date;
  });
  const userMessages = sortedMessages.filter(
    (message) => message.recipientId === userId
  );

  const setMessageToRead = (message) => {
    updateMessage({
      id: message.id,
      subject: message.subject,
      message: message.message,
      read: true,
      recipientId: message.recipientId,
      userId: message.userId,
      date: message.date,
    });
  };

  return (
    <>
      <h1 className="messages-title">Current Messages</h1>

      <div className="messagesParent-flex">
        <div className="messages">
          {userMessages.length > 0 ? (
            <>
              {userMessages.map((message) => (
                <>
                  <div
                    className={`message ${
                      message.read ? "readTrue" : "readFalse"
                    }`}
                    key={message.id}
                  >
                    <h2 className="message__detail">
                      <b>Subject:</b> {message.subject}{" "}
                    </h2>

                    <h3 className="message__detail-flex">
                      <div className="message__detail">
                        <b>From:</b> {message.user.name}{" "}
                      </div>
                      <div className="message__detail">
                        <b>Received:</b>{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "numeric",
                          minute: "2-digit",
                          second: "2-digit",
                        }).format(message.date)}
                      </div>
                    </h3>

                    <div className="message__detail"> {message.message} </div>
                    <div className="btn-delete-flex">
                      <button
                        className="btn-message"
                        onClick={() => {
                          history.push(`/messages/reply/${message.id}`);
                          setMessageToRead(message);
                        }}
                      >
                        Reply to Message
                      </button>
                      <button
                        className="btn-message"
                        onClick={() => {
                          removeMessage(message.id);
                        }}
                      >
                        Delete Message
                      </button>
                    </div>
                  </div>
                </>
              ))}
            </>
          ) : (
            <>
              <h2 className="no-messages-title">
                You Currently Have No Messages
              </h2>
            </>
          )}
        </div>
      </div>
    </>
  );
};
