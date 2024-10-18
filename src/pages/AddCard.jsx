// src/pages/AddCard.jsx

// import React from 'react';
// import CardForm from '../components/CardForm';
// import CardPreview from '../components/CardPreview';

// const AddCard = () => {
//   return (
//     <div className='page-form'>
//       <CardPreview/>

//       <CardForm />
//     </div>
//   );
// };

// export default AddCard;





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