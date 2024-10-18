// src/pages/Home.jsx
import React, { useState } from 'react';
import CardList from '../components/CardList';


const Home = () => {
  const [cardToEdit, setCardToEdit] = useState(null);

  return (
    <div>
      <div className='cover-website'>
      <div className='cover-website-text' >
      <h3>Premium Service</h3>
      <h1>E-Card Wallet</h1>
      <p>E-Wallet is the easiest wat to have sav all your card and also save space and make you life even more easy</p>
      </div>
      <div>
        <img src="/image/app-ewallet.png" alt="" />
      </div>
      </div>
      <div className='cardList-home'>
    <h1>Your Card List</h1>
      <CardList setCardToEdit={setCardToEdit} />
      </div>
      
    </div>
  );
};

export default Home;