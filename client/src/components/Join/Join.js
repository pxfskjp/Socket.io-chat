import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {
  const [name, setUserName] = useState('');
  const [room, setRoomID] = useState('');

  return (
    <div className="box">
        <h1 className="heading">Join Chat</h1>
        <div><input placeholder="Username" className="joinInput" type="text" onChange={(event) => setUserName(event.target.value)} /></div>
        <div><input placeholder="Room ID" className="joinInput mt-20" type="text" onChange={(event) => setRoomID(event.target.value)}/></div>
        <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`} >
          <button className="button mt-20 " type="submit">Sign In</button>
        </Link>
    </div>
  )
};

export default Join; 
