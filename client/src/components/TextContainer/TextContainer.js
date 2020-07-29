import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    {
      users
        ? (
          <div>
            <div className="activeContainer">
              Active:
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    <img alt="Online Icon" src={onlineIcon}/>
                    <pre> </pre>
                    {name}
                  </div>
                ))}
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;