
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

