import React, { useState, useEffect } from 'react';
import quertString from 'query-string';
import io from 'socket.io-client';

import './styles/Chat.css';
let socket;

const Chat = ({ location }) => {
  const [name, setUserName] = useState('');
  const [room, setRoomID] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:4000';

  useEffect(() => {
    const { name, room } = quertString.parse(location.search);

    socket = io(ENDPOINT);
 
    setUserName(name);
    setRoomID(room);

    socket.emit('join', { name, room }, () => {
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, [ENDPOINT, location.search ]);

  useEffect(() => {
    socket.on('message', (message) => {
       setMessages([...messages, message])
    })
  }, [messages]);

  const sendMessage = (event) => {

    event.preventDefault(); 

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  console.log(message, messages,)

  return (
    <div className="outerContainer">
      <div className="container">
        <input 
        value={message} 
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
      </div>
    </div>
  )
};

export default Chat; 
