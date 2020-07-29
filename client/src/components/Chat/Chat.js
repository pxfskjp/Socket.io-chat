import React, { useState, useEffect } from 'react';
import quertString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';
import InfoBar from '../Infobar/Infobar';
import Input from '../Input/Input';
import Display from '../Display/Display';
import TextContainer from '../TextContainer/TextContainer';

let socket;

const Chat = ({ location, history }) => {
  const [name, setUserName] = useState('');
  const [room, setRoomID] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState('');
  // const ENDPOINT = 'https://react-chat-mayerof.herokuapp.com/';
  const ENDPOINT = 'localhost:4000';

  useEffect(() => {
    const { name, room } = quertString.parse(location.search);

    socket = io(ENDPOINT);
 
    setUserName(name);
    setRoomID(room);

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error)
      }
    });
  }, [ENDPOINT, location.search ]);

  useEffect(() => {
    socket.on('message', (message) => {
       setMessages([...messages, message])
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
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
        <InfoBar room={room} name={name} /> 
          <div className="users">
            <TextContainer users={users} />
          </div>
        <Display messages ={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
    </div>
  )
};

export default Chat; 
