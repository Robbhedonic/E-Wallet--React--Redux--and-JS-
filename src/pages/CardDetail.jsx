// src/pages/CardDetail.jsx




// // src/pages/CardDetail.jsx

// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateCard, deleteCard } from '../redux/cardSlice';

// const CardDetail = () => {
//   const { id } = useParams(); // Obtener el ID de la tarjeta desde la URL
//   const navigate = useNavigate(); // Para redirigir después de eliminar
//   const dispatch = useDispatch();

//   // Buscar la tarjeta en el estado global usando el ID
//   const card = useSelector((state) =>
//     state.cards.find((card) => card.id === parseInt(id))
//   );

//   // Estados locales para editar la tarjeta
//   const [cardHolderName, setCardHolderName] = useState(card.cardHolderName);
//   const [cardNumber, setCardNumber] = useState(card.cardNumber);
//   const [validThru, setValidThru] = useState(card.validThru);
//   const [ccv, setCcv] = useState(card.ccv);
//   const [cardType, setCardType] = useState(card.cardType);
//   const [bankName, setBankName] = useState(card.bankName);

//   if (!card) {
//     return <p>Card not found</p>; // Mostrar si no se encuentra la tarjeta
//   }

//   // Función para manejar la edición de la tarjeta
//   const handleEdit = () => {
//     const updatedCard = {
//       id: card.id,
//       cardHolderName,
//       cardNumber,
//       validThru,
//       ccv,
//       cardType,
//       bankName,
//       state: card.state,
//     };
//     dispatch(updateCard({ id: card.id, card: updatedCard }));
//     alert('Card information updated');
//   };

//   // Función para activar la tarjeta si está inactiva
//   const handleActivate = () => {
//     if (card.state === 'Inactive') {
//       const updatedCard = { ...card, state: 'Active' };
//       dispatch(updateCard({ id: card.id, card: updatedCard }));
//       alert('Card activated');
//     }
//   };

//   // Función para eliminar la tarjeta si está inactiva
//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this card?')) {
//       dispatch(deleteCard(card.id));
//       navigate('/'); // Redirigir después de eliminar
//     }
//   };

//   return (
//     <div>
//       <h2>Card Detail</h2>

//       <div className="card-details">
//         <p><strong>Bank Name:</strong> {card.bankName}</p>
//         <p><strong>Card Holder Name:</strong></p>
//         {card.state === 'Inactive' ? (
//           <input
//             type="text"
//             value={cardHolderName}
//             onChange={(e) => setCardHolderName(e.target.value)}
//           />
//         ) : (
//           <span>{card.cardHolderName}</span>
//         )}

//         <p><strong>Card Number:</strong></p>
//         {card.state === 'Inactive' ? (
//           <input
//             type="text"
//             value={cardNumber}
//             onChange={(e) => setCardNumber(e.target.value)}
//           />
//         ) : (
//           <span>{card.cardNumber}</span>
//         )}

//         <p><strong>Valid Thru:</strong></p>
//         {card.state === 'Inactive' ? (
//           <input
//             type="text"
//             value={validThru}
//             onChange={(e) => setValidThru(e.target.value)}
//           />
//         ) : (
//           <span>{card.validThru}</span>
//         )}

//         <p><strong>CCV:</strong></p>
//         {card.state === 'Inactive' ? (
//           <input
//             type="text"
//             value={ccv}
//             onChange={(e) => setCcv(e.target.value)}
//           />
//         ) : (
//           <span>{card.ccv}</span>
//         )}

//         <p><strong>Card Type:</strong></p>
//         {card.state === 'Inactive' ? (
//           <input
//             type="text"
//             value={cardType}
//             onChange={(e) => setCardType(e.target.value)}
//           />
//         ) : (
//           <span>{card.cardType}</span>
//         )}

//         <p><strong>Status:</strong> {card.state}</p>
//       </div>

//       {card.state === 'Inactive' ? (
//         <div>
//           <button onClick={handleEdit}>Save Changes</button>
//           <button onClick={handleActivate}>Activate Card</button>
//           <button onClick={handleDelete}>Delete Card</button>
//         </div>
//       ) : (
//         <p>You cannot edit or delete this card because it is active.</p>
//       )}
//     </div>
//   );
// };

// export default CardDetail;




// src/pages/CardDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CardDetail = () => {
  const { id } = useParams(); // Obtener el ID de la tarjeta desde la URL
  const [card, setCard] = useState(null);
  const navigate = useNavigate();

  // Cargar la tarjeta desde localStorage
  useEffect(() => {
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    const foundCard = cards.find((card) => card.id === parseInt(id));
    if (foundCard) {
      setCard(foundCard);
    } else {
      alert('Card not found');
      navigate('/'); // Redirigir al home si la tarjeta no se encuentra
    }
  }, [id, navigate]);

  // Manejar la activación de una tarjeta inactiva
  const handleActivate = () => {
    const updatedCard = { ...card, state: 'Active' };
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    const updatedCards = cards.map((c) => (c.id === card.id ? updatedCard : c));
    localStorage.setItem('cards', JSON.stringify(updatedCards));
    setCard(updatedCard);
  };

  // Manejar la eliminación de la tarjeta
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      const cards = JSON.parse(localStorage.getItem('cards')) || [];
      const updatedCards = cards.filter((c) => c.id !== card.id);
      localStorage.setItem('cards', JSON.stringify(updatedCards));
      navigate('/'); // Redirigir al home después de eliminar
    }
  };

  if (!card) return <div>Loading...</div>;

  return (
    <div>
      <h2>Card Detail</h2>
      <div className="card-details">
        <p><strong>Bank Name:</strong> {card.bankName}</p>
        <p><strong>Card Holder Name:</strong> {card.cardHolderName}</p>
        <p><strong>Card Number:</strong> {card.cardNumber}</p>
        <p><strong>Valid Thru:</strong> {card.validThru}</p>
        <p><strong>CCV:</strong> {card.ccv}</p>
        <p><strong>Card Type:</strong> {card.cardType}</p>
        <p><strong>Status:</strong> {card.state}</p>
      </div>

      {card.state === 'Inactive' ? (
        <div>
          <button onClick={handleActivate}>Activate Card</button>
          <button onClick={handleDelete}>Delete Card</button>
        </div>
      ) : (
        <p>This card is active and cannot be modified or deleted.</p>
      )}
    </div>
  );
};

export default CardDetail;

