
// src/components/InactiveCardList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import { deleteInactiveCards } from '../redux/cardSlice';  // Asegúrate de que la ruta esté bien

const InactiveCardList = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cards);

  // Filtrar las tarjetas inactivas
  const inactiveCards = cards.filter(card => card.state === 'Inactive');

  const handleDeleteAll = () => {
    dispatch(deleteInactiveCards());
  };

  return (
    <div className="inactive-card-list">
      <h2>Inactive Cards</h2>
      {inactiveCards.length > 0 ? (
        <>
          <button onClick={handleDeleteAll}>Delete all inactive cards</button>
          {inactiveCards.map(card => (
            <Card 
              key={card.id} 
              card={card} 
              onDelete={() => { /* Lógica para eliminar una carta individual si es necesario */ }} 
              onEdit={() => { /* Lógica para editar una carta si es necesario */ }} 
            />
          ))}
        </>
      ) : (
        <p>No hay tarjetas inactivas.</p>
      )}
    </div>
  );
};

export default InactiveCardList;