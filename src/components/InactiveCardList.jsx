
// src/components/InactiveCardList.jsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirigir al formulario de edición
import Card from './Card';
import { deleteCard, deleteInactiveCards } from '../redux/cardSlice'; // Importar deleteCard

const InactiveCardList = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cards);

  // Filtrar las tarjetas inactivas
  const inactiveCards = cards.filter(card => card.state === 'Inactive');

  // Eliminar todas las tarjetas inactivas
  const handleDeleteAll = () => {
    if (inactiveCards.length > 0) {
      if (window.confirm('Are you sure you want to delete all inactive cards?')) {
        dispatch(deleteInactiveCards());

        // Eliminar las tarjetas inactivas del localStorage
        const storedCards = JSON.parse(localStorage.getItem('cards')) || [];
        const updatedCards = storedCards.filter(card => card.state !== 'Inactive');
        localStorage.setItem('cards', JSON.stringify(updatedCards));
      }
    } else {
      alert('No inactive cards to delete.');
    }
  };

  // Eliminar una tarjeta individual
  const handleDeleteCard = (id) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      dispatch(deleteCard(id));

      // Eliminar la tarjeta del localStorage
      const storedCards = JSON.parse(localStorage.getItem('cards')) || [];
      const updatedCards = storedCards.filter(card => card.id !== id);
      localStorage.setItem('cards', JSON.stringify(updatedCards));

      // Si la tarjeta eliminada estaba activa, remover también de 'activeCard' en localStorage
      const activeCardId = localStorage.getItem('activeCard');
      if (activeCardId && JSON.parse(activeCardId) === id) {
        localStorage.removeItem('activeCard');
      }
    }
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
              onDelete={() => handleDeleteCard(card.id)}  // Lógica para eliminar una tarjeta individual
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