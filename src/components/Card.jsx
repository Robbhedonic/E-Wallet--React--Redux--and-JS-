// src/components/Card.jsx

// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { updateCard } from '../redux/cardSlice';

// const Card = ({ card, onDelete, onEdit }) => {
//   const dispatch = useDispatch();

//   const toggleCardState = () => {
//     if (card.state === 'Active') {
//       const confirmDeactivate = window.confirm('Are you sure you want to deactivate this card?');
//       if (!confirmDeactivate) return; // Si el usuario cancela, salir de la función
//     }
    
//     // Cambiar el estado de la tarjeta
//     const newState = card.state === 'Active' ? 'Inactive' : 'Active';
//     dispatch(updateCard({ id: card.id, card: { ...card, state: newState } }));
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this card?')) {
//       onDelete(id);
//     }
//   };

//   return (
//     <div 
//       className={`card ${card.cardType ? card.cardType.toLowerCase().replace(/\s+/g, '-') : ''}`} 
//       onClick={toggleCardState}
//       style={{ cursor: 'pointer' }} // Añadir un cursor de pointer para indicar que es clicable
//     >
//       <div className='first-line'>
//         <p className='title-bank-name'>{card.bankName}</p>
//         <button className={`card-state ${card.state === 'Active' ? 'active' : 'inactive'}`}>
//           {card.state}
//         </button>
//       </div>
      
//       <p className='card-number'>{card.cardNumber}</p>
//       <div className='other-number'>
//         <div className='vd-ccv'>
//           <p>Valid until</p>
//           <p>{card.validThru}</p>
//         </div>
//         <div className='vd-ccv'>
//           <p>CCV</p>
//           <p>{card.ccv}</p>
//         </div>
//       </div>
//       <p className='owner-name'>{card.cardHolderName}</p>
//       <div className='bottomCard'>
//         <button onClick={() => onEdit(card)} aria-label={`Edit ${card.cardHolderName}`}>Edit</button>
//         <button onClick={(e) => { e.stopPropagation(); handleDelete(card.id); }} aria-label={`Delete ${card.cardHolderName}`}>Delete</button>
//         <p>{card.cardType}</p>
//       </div>
//     </div>
//   );
// };

// export default Card;


// src/components/Card.jsx




// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { updateCard } from '../redux/cardSlice';

// const Card = ({ card, onDelete, onEdit }) => {
//   const dispatch = useDispatch();

//   // Función para cambiar el estado de la tarjeta
//   const toggleCardState = () => {
//     if (card.state === 'Active') {
//       const confirmDeactivate = window.confirm('Are you sure you want to deactivate this card?');
//       if (!confirmDeactivate) return; // Si el usuario cancela, salir de la función
//     }
    
//     const newState = card.state === 'Active' ? 'Inactive' : 'Active';
//     dispatch(updateCard({ id: card.id, card: { ...card, state: newState } }));
//   };

//   // Función para manejar la eliminación de la tarjeta
//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this card?')) {
//       onDelete(id);
//     }
//   };

//   return (
//     <div 
//       className={`card ${card.cardType ? card.cardType.toLowerCase().replace(/\s+/g, '-') : ''}`} 
//       style={{ cursor: 'pointer' }} // Se mantiene el cursor de pointer si es necesario para otros clicks
//     >
//       <div className='first-line'>
//         <p className='title-bank-name'>{card.bankName}</p>
//         <button 
//           className={`card-state ${card.state === 'Active' ? 'active' : 'inactive'}`}
//           onClick={toggleCardState} // Ahora el cambio de estado solo ocurre al hacer clic en este botón
//         >
//           {card.state}
//         </button>
//       </div>
      
//       <p className='card-number'>{card.cardNumber}</p>
//       <div className='other-number'>
//         <div className='vd-ccv'>
//           <p>Valid until</p>
//           <p>{card.validThru}</p>
//         </div>
//         <div className='vd-ccv'>
//           <p>CCV</p>
//           <p>{card.ccv}</p>
//         </div>
//       </div>
//       <p className='owner-name'>{card.cardHolderName}</p>
//       <div className='bottomCard'>
//         <button onClick={() => onEdit(card)} aria-label={`Edit ${card.cardHolderName}`}>Edit</button>
//         <button onClick={(e) => { e.stopPropagation(); handleDelete(card.id); }} aria-label={`Delete ${card.cardHolderName}`}>Delete</button>
//         <p>{card.cardType}</p>
//       </div>
//     </div>
//   );
// };

// export default Card;




















// // src/components/Card.jsx

// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { updateCard } from '../redux/cardSlice';

// const Card = ({ card, onDelete, onEdit }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Función para cambiar el estado de la tarjeta
//   const toggleCardState = () => {
//     if (card.state === 'Active') {
//       const confirmDeactivate = window.confirm('Are you sure you want to deactivate this card?');
//       if (!confirmDeactivate) return; // Si el usuario cancela, salir de la función
//     }
    
//     const newState = card.state === 'Active' ? 'Inactive' : 'Active';
//     dispatch(updateCard({ id: card.id, card: { ...card, state: newState } }));
//   };

//   // Función para manejar la eliminación de la tarjeta
//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this card?')) {
//       onDelete(id);
//     }
//   };

//   // Navegar al detalle de la tarjeta
//   const handleCardClick = () => {
//     navigate(`/card/${card.id}`);
//   };

//   return (
//     <div 
//       className={`card ${card.cardType ? card.cardType.toLowerCase().replace(/\s+/g, '-') : ''}`} 
//       style={{ cursor: 'pointer' }} 
//       onClick={handleCardClick} // Navegar al hacer clic en la tarjeta
//     >
//       <div className='first-line'>
//         <p className='title-bank-name'>{card.bankName}</p>
//         <button 
//           className={`card-state ${card.state === 'Active' ? 'active' : 'inactive'}`}
//           onClick={(e) => {
//             e.stopPropagation(); // Evitar que el evento de clic en la tarjeta se dispare
//             toggleCardState();
//           }} 
//         >
//           {card.state}
//         </button>
//       </div>
      
//       <p className='card-number'>{card.cardNumber}</p>
//       <div className='other-number'>
//         <div className='vd-ccv'>
//           <p>Valid until</p>
//           <p>{card.validThru}</p>
//         </div>
//         <div className='vd-ccv'>
//           <p>CCV</p>
//           <p>{card.ccv}</p>
//         </div>
//       </div>
//       <p className='owner-name'>{card.cardHolderName}</p>
//       <div className='bottomCard'>
//         <button onClick={(e) => { e.stopPropagation(); onEdit(card); }} aria-label={`Edit ${card.cardHolderName}`}>Edit</button>
//         <button onClick={(e) => { e.stopPropagation(); handleDelete(card.id); }} aria-label={`Delete ${card.cardHolderName}`}>Delete</button>
//         <p>{card.cardType}</p>
//       </div>
//     </div>
//   );
// };

// export default Card;
























// // src/components/Card.jsx

// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { updateCard } from '../redux/cardSlice';

// const Card = ({ card, onDelete, onEdit }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Función para cambiar el estado de la tarjeta
//   const toggleCardState = () => {
//     if (card.state === 'Active') {
//       const confirmDeactivate = window.confirm('Are you sure you want to deactivate this card?');
//       if (!confirmDeactivate) return; // Si el usuario cancela, salir de la función
//     }

//     const newState = card.state === 'Active' ? 'Inactive' : 'Active';

//     // Actualizar el estado en Redux
//     dispatch(updateCard({ id: card.id, card: { ...card, state: newState } }));

//     // Si estás usando localStorage, actualiza allí también
//     const cards = JSON.parse(localStorage.getItem('cards')) || [];
//     const updatedCards = cards.map((c) => (c.id === card.id ? { ...c, state: newState } : c));
//     localStorage.setItem('cards', JSON.stringify(updatedCards));
//   };

//   // Función para manejar la eliminación de la tarjeta
//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this card?')) {
//       onDelete(id);
//     }
//   };

//   // Navegar al detalle de la tarjeta
//   const handleCardClick = () => {
//     navigate(`/card/${card.id}`);
//   };

//   return (
//     <div 
//       className={`card ${card.cardType ? card.cardType.toLowerCase().replace(/\s+/g, '-') : ''}`} 
//       style={{ cursor: 'pointer' }} 
//       onClick={handleCardClick} // Navegar al hacer clic en la tarjeta
//     >
//       <div className='first-line'>
//         <p className='title-bank-name'>{card.bankName}</p>
//         <button 
//           className={`card-state ${card.state === 'Active' ? 'active' : 'inactive'}`}
//           onClick={(e) => {
//             e.stopPropagation(); // Evitar que el evento de clic en la tarjeta se dispare
//             toggleCardState(); // Cambiar el estado
//           }} 
//         >
//           {card.state}
//         </button>
//       </div>
      
//       <p className='card-number'>{card.cardNumber}</p>
//       <div className='other-number'>
//         <div className='vd-ccv'>
//           <p>Valid until</p>
//           <p>{card.validThru}</p>
//         </div>
//         <div className='vd-ccv'>
//           <p>CCV</p>
//           <p>{card.ccv}</p>
//         </div>
//       </div>
//       <p className='owner-name'>{card.cardHolderName}</p>
//       <div className='bottomCard'>
//         <button onClick={(e) => { e.stopPropagation(); onEdit(card); }} aria-label={`Edit ${card.cardHolderName}`}>Edit</button>
//         <button onClick={(e) => { e.stopPropagation(); handleDelete(card.id); }} aria-label={`Delete ${card.cardHolderName}`}>Delete</button>
//         <p>{card.cardType}</p>
//       </div>
//     </div>
//   );
// };

// export default Card;








// // src/components/Card.jsx


// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { updateCard } from '../redux/cardSlice';

// const Card = ({ card, onDelete, onEdit, showDeleteButton = true }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Función para cambiar el estado de la tarjeta
//   const toggleCardState = () => {
//     if (card.state === 'Active') {
//       const confirmDeactivate = window.confirm('Are you sure you want to deactivate this card?');
//       if (!confirmDeactivate) return; // Si el usuario cancela, salir de la función
//     }

//     const newState = card.state === 'Active' ? 'Inactive' : 'Active';

//     // Actualizar el estado en Redux
//     dispatch(updateCard({ id: card.id, card: { ...card, state: newState } }));

//     // Si estás usando localStorage, actualiza allí también
//     const cards = JSON.parse(localStorage.getItem('cards')) || [];
//     const updatedCards = cards.map((c) => (c.id === card.id ? { ...c, state: newState } : c));
//     localStorage.setItem('cards', JSON.stringify(updatedCards));
//   };

//   // Función para manejar la eliminación de la tarjeta
//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this card?')) {
//       onDelete(id);
//     }
//   };

//   // Navegar al detalle de la tarjeta
//   const handleCardClick = () => {
//     navigate(`/card/${card.id}`);
//   };

//   return (
//     <div 
//       className={`card ${card.cardType ? card.cardType.toLowerCase().replace(/\s+/g, '-') : ''}`} 
//       style={{ cursor: 'pointer' }} 
//       onClick={handleCardClick} // Navegar al hacer clic en la tarjeta
//     >
//       <div className='first-line'>
//         <p className='title-bank-name'>{card.bankName}</p>
//         <button 
//           className={`card-state ${card.state === 'Active' ? 'active' : 'inactive'}`}
//           onClick={(e) => {
//             e.stopPropagation(); // Evitar que el evento de clic en la tarjeta se dispare
//             toggleCardState(); // Cambiar el estado
//           }} 
//         >
//           {card.state}
//         </button>
//       </div>
      
//       <p className='card-number'>{card.cardNumber}</p>
//       <div className='other-number'>
//         <div className='vd-ccv'>
//           <p>Valid until</p>
//           <p>{card.validThru}</p>
//         </div>
//         <div className='vd-ccv'>
//           <p>CCV</p>
//           <p>{card.ccv}</p>
//         </div>
//       </div>
//       <p className='owner-name'>{card.cardHolderName}</p>
//       <div className='bottomCard'>
//         <button onClick={(e) => { e.stopPropagation(); onEdit(card); }} aria-label={`Edit ${card.cardHolderName}`}>Edit</button>
//         {showDeleteButton && ( // Solo mostrar el botón si showDeleteButton es true
//           <button onClick={(e) => { e.stopPropagation(); handleDelete(card.id); }} aria-label={`Delete ${card.cardHolderName}`}>Delete</button>
//         )}
//         <p>{card.cardType}</p>
//       </div>
//     </div>
//   );
// };

// export default Card;





import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateCard } from '../redux/cardSlice';

const Card = ({ card, onDelete, onEdit, showDeleteButton = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Función para cambiar el estado de la tarjeta
  const toggleCardState = () => {
    if (card.state === 'Active') {
      const confirmDeactivate = window.confirm('Are you sure you want to deactivate this card?');
      if (!confirmDeactivate) return; // Si el usuario cancela, salir de la función
    }

    const newState = card.state === 'Active' ? 'Inactive' : 'Active';

    // Actualizar el estado en Redux
    dispatch(updateCard({ id: card.id, card: { ...card, state: newState } }));

    // Si estás usando localStorage, actualiza allí también
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    const updatedCards = cards.map((c) => (c.id === card.id ? { ...c, state: newState } : c));
    localStorage.setItem('cards', JSON.stringify(updatedCards));
  };

  // Función para manejar la eliminación de la tarjeta
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      onDelete(id);
    }
  };

  // Navegar al detalle de la tarjeta
  const handleCardClick = () => {
    navigate(`/card/${card.id}`);
  };

  return (
    <div 
      className={`card ${card.cardType ? card.cardType.toLowerCase().replace(/\s+/g, '-') : ''}`} 
      style={{ cursor: 'pointer' }} 
      onClick={handleCardClick} // Navegar al hacer clic en la tarjeta
    >
      <div className='first-line'>
        <p className='title-bank-name'>{card.bankName}</p>
        <button 
          className={`card-state ${card.state === 'Active' ? 'active' : 'inactive'}`}
          onClick={(e) => {
            e.stopPropagation(); // Evitar que el evento de clic en la tarjeta se dispare
            toggleCardState(); // Cambiar el estado
          }} 
        >
          {card.state}
        </button>
      </div>
      
      <p className='card-number'>{card.cardNumber}</p>
      <div className='other-number'>
        <div className='vd-ccv'>
          <p>Valid until</p>
          <p>{card.validThru}</p>
        </div>
        <div className='vd-ccv'>
          <p>CCV</p>
          <p>{card.ccv}</p>
        </div>
      </div>
      <p className='owner-name'>{card.cardHolderName}</p>
      <div className='bottomCard'>
        <button onClick={(e) => { e.stopPropagation(); onEdit(card); }} aria-label={`Edit ${card.cardHolderName}`}>Edit</button>
        {showDeleteButton && (
          <button onClick={(e) => { e.stopPropagation(); handleDelete(card.id); }} aria-label={`Delete ${card.cardHolderName}`}>Delete</button>
        )}
        <p>{card.cardType}</p>
      </div>
    </div>
  );
};

export default Card;