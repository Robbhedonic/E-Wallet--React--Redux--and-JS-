
// src/components/CardList.jsx

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCard, updateCard } from '../redux/cardSlice';
import Card from './Card';

const CardList = () => {
  const cards = useSelector((state) => state.cards.cards); // Obtener las tarjetas desde el estado
  const dispatch = useDispatch();
  const [activeCardId, setActiveCardId] = useState(null); // Estado para manejar la tarjeta activa

  useEffect(() => {
    // Al cargar el componente, obtener la tarjeta activa desde el localStorage
    const storedActiveCard = localStorage.getItem('activeCard');
    if (storedActiveCard) {
      setActiveCardId(JSON.parse(storedActiveCard)); // Guardar el ID de la tarjeta activa desde el localStorage
    }
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteCard(id));
    // Si la tarjeta eliminada es la activa, también la removemos del localStorage
    if (id === activeCardId) {
      localStorage.removeItem('activeCard');
      setActiveCardId(null); // Resetear la tarjeta activa
    }
  };

  const handleActivate = (id) => {
    // Verificar si ya hay una tarjeta activa en el localStorage o en el estado local
    if (activeCardId) {
      alert('Solo puedes tener una tarjeta activa.');
      return;
    }

    const cardToActivate = cards.find((card) => card.id === id);
    if (cardToActivate) {
      const updatedCard = { ...cardToActivate, state: 'Active' };
      dispatch(updateCard(updatedCard)); // Actualiza el estado de la tarjeta a 'Active'

      // Guardar la tarjeta activa en el localStorage
      localStorage.setItem('activeCard', JSON.stringify(id));
      setActiveCardId(id); // Actualizar el estado local con el ID de la tarjeta activa
    }
  };

  const handleDeactivate = (id) => {
    const cardToDeactivate = cards.find((card) => card.id === id);
    if (cardToDeactivate) {
      const updatedCard = { ...cardToDeactivate, state: 'Inactive' };
      dispatch(updateCard(updatedCard)); // Actualiza el estado de la tarjeta a 'Inactive'

      // Remover la tarjeta activa del localStorage
      localStorage.removeItem('activeCard');
      setActiveCardId(null); // Resetear el estado de la tarjeta activa
    }
  };

  // Filtrar las tarjetas inactivas
  const inactiveCards = cards.filter((card) => card.state === 'Inactive');

  // Verificar si se alcanzó el límite de 4 tarjetas
  const cardLimitReached = cards.length >= 4;

  return (
    <div className="card-list">
      {/* Mostrar el enlace para agregar tarjeta solo si no se ha alcanzado el límite */}
      {!cardLimitReached && <Link className="add-card" to="/add-card">Add Card</Link>}

      <h2>Active Cards</h2>
      {cards
        .filter((card) => card.state === 'Active')
        .map((card) => (
          <Card
            key={card.id}
            card={card}
            onDelete={null} // No se muestra el botón de "Delete" para tarjetas activas
            onDeactivate={() => handleDeactivate(card.id)} // Permitir desactivar la tarjeta
            showActivateButton={false} // Ocultar el botón de activar
            showDeleteButton={false} // Ocultar el botón de eliminar en las tarjetas activas
          />
        ))}

      <h2>Inactive Cards</h2>
      {inactiveCards.length > 0 ? (
        inactiveCards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onDelete={handleDelete}
            onActivate={() => handleActivate(card.id)} // Pasar la función para activar la tarjeta
            showActivateButton={true} // Mostrar el botón de activar solo para tarjetas inactivas
            showDeleteButton={false} // Mostrar el botón de "Delete" solo para tarjetas inactivas
            isActivateDisabled={!!activeCardId} // Deshabilitar el botón de activar si ya hay una tarjeta activa
          />
        ))
      ) : (
        <p>No hay tarjetas inactivas.</p>
      )}
    </div>
  );
};

export default CardList;