


// src/components/CardDetail.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateCard, deleteCard } from '../redux/cardSlice';

const CardDetail = () => {
  const { id } = useParams(); // Obtener el ID de la tarjeta desde la URL
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Para redirigir después de eliminar la tarjeta
  const cards = useSelector((state) => state.cards.cards);
  
  // Buscar la tarjeta específica por ID
  const card = cards.find((c) => c.id === parseInt(id));

  // Si la tarjeta no existe, mostrar un mensaje
  if (!card) {
    return <p>Card not found.</p>;
  }

  // Función para activar o desactivar la tarjeta
  const toggleCardState = () => {
    const newState = card.state === 'Active' ? 'Inactive' : 'Active';

    // Actualizar el estado en Redux
    dispatch(updateCard({ id: card.id, card: { ...card, state: newState } }));

    // Actualizar en localStorage
    const storedCards = JSON.parse(localStorage.getItem('cards')) || [];
    const updatedCards = storedCards.map((c) => (c.id === card.id ? { ...c, state: newState } : c));
    localStorage.setItem('cards', JSON.stringify(updatedCards));

    // Si la tarjeta se activa o desactiva, actualizar el activeCard en localStorage
    if (newState === 'Active') {
      localStorage.setItem('activeCard', JSON.stringify(card.id));
    } else if (newState === 'Inactive' && localStorage.getItem('activeCard') === JSON.stringify(card.id)) {
      localStorage.removeItem('activeCard');
    }
  };

  // Función para eliminar la tarjeta
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      dispatch(deleteCard(card.id));

      // Actualizar en localStorage para eliminar la tarjeta
      const storedCards = JSON.parse(localStorage.getItem('cards')) || [];
      const updatedCards = storedCards.filter((c) => c.id !== card.id);
      localStorage.setItem('cards', JSON.stringify(updatedCards));

      // Si la tarjeta eliminada estaba activa, remover también de 'activeCard' en localStorage
      const activeCardId = localStorage.getItem('activeCard');
      if (activeCardId && JSON.parse(activeCardId) === card.id) {
        localStorage.removeItem('activeCard');
      }

      // Redirigir al inicio después de eliminar la tarjeta
      navigate('/');
    }
  };

  // Navegar al formulario de edición
  const handleEdit = () => {
    navigate(`/edit-card/${card.id}`); // Redirige al formulario de edición con el ID de la tarjeta
  };

  useEffect(() => {
    // Asegurarse de que los cambios se guarden en localStorage cuando la tarjeta se actualice
    const storedCards = JSON.parse(localStorage.getItem('cards')) || [];
    const updatedCards = storedCards.map((c) => (c.id === card.id ? card : c));
    localStorage.setItem('cards', JSON.stringify(updatedCards));
  }, [card]);

  return (
    <div className='card-detail-main'>
    <div className="card-detail">
        <p><strong>Bank Name:</strong> {card.bankName}</p>
        <p><strong>Card Holder Name:</strong> {card.cardHolderName}</p>
        <p><strong>Card Number:</strong> {card.cardNumber}</p>
        <p><strong>Valid Thru:</strong> {card.validThru}</p>
        <p><strong>CCV:</strong> {card.ccv}</p>
        <p><strong>Card Type:</strong> {card.cardType}</p>
        <p><strong>Status:</strong> {card.state}</p>

      {/* Botón para activar/desactivar la tarjeta */}
      <button onClick={toggleCardState}>
        {card.state === 'Active' ? 'Deactivate Card' : 'Activate Card'}
      </button>

      {/* Solo mostrar los botones de editar y eliminar si la tarjeta NO está activa */}
      {card.state !== 'Active' && (
        <>
          <button onClick={handleEdit}>
            Edit Card
          </button>

          <button onClick={handleDelete}>
            Delete Card
          </button>
        </>
      )}
    </div>
    </div>
  );
};

export default CardDetail;