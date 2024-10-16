import React from 'react';
import './banlist.css';

const Banlist = (props) => {
  return (
    <div className='banList'>
      <div className='banListContent'>
        <h1>Ban List</h1>
        <p>Select an attribute on the listing to ban it, or click to remove!</p>

        <div className='bannedItems'>
          {props.bannedItems.length > 0 ? (
            props.bannedItems.map((item, index) => (
              <li key={index} onClick={() => props.removeFromBanlist(item)}>
                {item}
              </li>
            ))
          ) : (
            <p>No items banned yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banlist;
