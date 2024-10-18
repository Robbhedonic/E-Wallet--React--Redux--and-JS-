// src/pages/AddCard.jsx

import React, { useState } from 'react';
import CardForm from '../components/CardForm';
import CardPreview from '../components/CardPreview';

const AddCard = () => {
  const [previewCardData, setPreviewCardData] = useState({
    cardNumber: '',
    cardHolderName: '',
    validThru: '',
    ccv: '',
    bankName: '',
    cardType: '',
    state: ''
  });

  return (
    <div className='page-form'>
      <CardPreview cardData={previewCardData} />

      <CardForm setPreviewCardData={setPreviewCardData} />
    </div>
  );
};

export default AddCard;