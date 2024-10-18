
import React from 'react';

const CardPreview = ({ cardData }) => {
  return (
    <div 
      className={`card ${cardData.cardType ? cardData.cardType.toLowerCase().replace(/\s+/g, '-') : ''}`} 
      style={{ cursor: 'default'}} // No será clicable, por lo tanto no usamos pointer
    >
      <div className='first-line'>
        <p className='title-bank-name'>{cardData.bankName || 'Bank Name'}</p>
        <p className={`card-state ${cardData.state === 'Active' ? 'active' : 'inactive'}`}>
          {cardData.state || 'State'}
        </p>
      </div>
      
      <p className='card-number'>{cardData.cardNumber || '•••• •••• •••• ••••'}</p>
      <div className='other-number'>
        <div className='vd-ccv'>
          <p>Valid until</p>
          <p>{cardData.validThru || 'MM-YYYY'}</p>
        </div>
        <div className='vd-ccv'>
          <p>CCV</p>
          <p>{cardData.ccv || '•••'}</p>
        </div>
      </div>
      <p className='owner-name'>{cardData.cardHolderName || 'Card Holder'}</p>
      <div className='bottomCard'>
    
        <p>{cardData.cardType || 'Card Type'}</p>
      </div>
    </div>
  );
};

export default CardPreview;