import React, { useState, useEffect } from 'react';
import quertString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
  const [name, setUserName] = useState('');
  const [room, setRoomID] = useState('');
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

  return (
    <h1>Chat</h1>
  )
};

export default Chat; 
