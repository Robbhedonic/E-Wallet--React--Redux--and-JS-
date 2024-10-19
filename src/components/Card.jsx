

// src/components/Card.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateCard } from '../redux/cardSlice';

const Card = ({ card, onDelete, showDeleteButton = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Verificar si ya hay una tarjeta activa en localStorage
    const activeCard = localStorage.getItem('activeCard');
    if (activeCard && card.state === 'Inactive') {
      setIsDisabled(true); // Deshabilitar botón si hay una tarjeta activa y esta es inactiva
    } else {
      setIsDisabled(false); // Habilitar el botón si no hay tarjeta activa
    }
  }, [card.state]);

  const toggleCardState = () => {
    if (card.state === 'Active') {
      const confirmDeactivate = window.confirm('Are you sure you want to deactivate this card?');
      if (!confirmDeactivate) return;
    } else if (localStorage.getItem('activeCard')) {
      alert('Solo puedes tener una tarjeta activa.');
      return;
    }

    const newState = card.state === 'Active' ? 'Inactive' : 'Active';

    // Actualizar el estado en Redux
    dispatch(updateCard({ id: card.id, card: { ...card, state: newState } }));

    // Actualizar en localStorage
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    const updatedCards = cards.map((c) => (c.id === card.id ? { ...c, state: newState } : c));
    localStorage.setItem('cards', JSON.stringify(updatedCards));

    // Actualizar la tarjeta activa en localStorage si se activa
    if (newState === 'Active') {
      localStorage.setItem('activeCard', JSON.stringify(card.id));
    } else {
      localStorage.removeItem('activeCard');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      onDelete(id);
    }
  };

  const handleCardClick = () => {
    navigate(`/card/${card.id}`);
  };

  return (
    <div className={`card ${card.cardType ? card.cardType.toLowerCase().replace(/\s+/g, '-') : ''}`} style={{ cursor: 'pointer' }} onClick={handleCardClick}>
      <div className="first-line">
        <p className="title-bank-name">{card.bankName}</p>
        <button
          className={`card-state ${card.state === 'Active' ? 'active' : 'inactive'}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleCardState();
          }}
          disabled={isDisabled}
        >
          {card.state}
        </button>
      </div>
      <p className="card-number">{card.cardNumber}</p>
      <div className="other-number">
        <div className="vd-ccv">
          <p>Valid until</p>
          <p>{card.validThru}</p>
        </div>
        <div className="vd-ccv">
          <p>CCV</p>
          <p>{card.ccv}</p>
        </div>
      </div>
      <p className="owner-name">{card.cardHolderName}</p>
      <div className="bottomCard">
        {showDeleteButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(card.id);
            }}
            aria-label={`Delete ${card.cardHolderName}`}
          >
            Delete
          </button>
        )}
        <p>{card.cardType}</p>
      </div>
    </div>
  );
};

export default Card;