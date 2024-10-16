import React, { useState } from 'react';
import './centercard.css';
import Banlist from './banlist.jsx';

const Centercard = () => {
  const [dogData, setDogData] = useState(null);
  const [bannedItems, setBannedItems] = useState([]);
  const [viewedItems, setViewedItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.thedogapi.com/v1/images/search?limit=1&has_breeds=1&api_key=live_sU6mJG0zXPP4rhzJOyWusmY5VYPT7RIfgeXbmZr5NFTNcHFohUBU5p1ZLnZ2q0x0");
      const data = await response.json();

      const imageUrl = data[0].url;
      const breedGroup = data[0].breeds[0].breed_group;
      const lifeSpan = data[0].breeds[0].life_span;
      const name = data[0].breeds[0].name;
      const weight = data[0].breeds[0].weight.imperial;

      const newDogData = { imageUrl, lifeSpan, breedGroup, name, weight };
      
      setDogData(newDogData);
      setViewedItems((prevItems) => [...prevItems, newDogData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addToBanlist = (item) => {
    if (!bannedItems.includes(item)) {
      setBannedItems([...bannedItems, item]);
    }
  };

  const removeFromBanlist = (item) => {
    setBannedItems(bannedItems.filter(bannedItem => bannedItem !== item));
  };

  return (
    <div className='centerCard'>
      <div className='centralText'>
        <h1>Dog Discovery</h1>
        <h3>Find your ideal dog breed!</h3>

        {dogData && (
          <>
            <h2>{dogData.name}</h2>
            <div className="dogatributes">
              <button onClick={() => addToBanlist(dogData.lifeSpan)}>{dogData.lifeSpan}</button>
              <button onClick={() => addToBanlist(dogData.breedGroup)}>{dogData.breedGroup}</button>
              <button onClick={() => addToBanlist(`${dogData.weight} lbs`)}>{dogData.weight} lbs</button>
            </div>
            <img className='standardImg' src={dogData.imageUrl} alt={dogData.name} />
          </>
        )}

        <Banlist bannedItems={bannedItems} removeFromBanlist={removeFromBanlist} />
        <button onClick={fetchData}>Discover 👀</button>

        <h3>Previously Viewed Dogs</h3>
        <div className='viewedHistory'>
          {viewedItems.length > 0 ? (
            viewedItems.map((item, index) => (
              <div key={index} className="viewedItem">
                <h4>{item.name}</h4>
                <img className='smallImg' src={item.imageUrl} alt={item.name} />
              </div>
            ))
          ) : (
            <p>No previously viewed dogs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Centercard;
