import React from 'react';

import './Message.css';

const Message = ({message: {user, text},  name}) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
    ? (
      <div className="messageContainer justifyEnd">
        <p className="sentText pr-10">{trimmedName}</p>
        <div className="messageBox backgroundBlue">
          <p className="messageText">{text}</p>
        </div>
      </div>
    )
    : (
      <div className="messageContainer justifyStart">
      <div className="messageBox backgroundGreen">
        <p className="messageText">{text}</p>
      </div>
      <p className="sentText pl-10">{user}</p>
    </div>
    )
  )
}

export default Message;