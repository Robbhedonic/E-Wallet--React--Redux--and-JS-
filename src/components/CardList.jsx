
// src/components/CardList.jsx

import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCard, updateCard } from '../redux/cardSlice';
import Card from './Card';
import CardForm from './CardForm'; // Importar el formulario de edición

const CardList = () => {
  const cards = useSelector((state) => state.cards.cards);
  const dispatch = useDispatch();
  const [cardToEdit, setCardToEdit] = useState(null); // Estado para manejar la tarjeta en edición

  const handleDelete = (id) => {
    dispatch(deleteCard(id));
  };
  const handleEdit = (id) => {
    dispatch(cardToEditd(id));
  };

  const handleSave = (updatedCard) => {
    dispatch(updateCard(updatedCard)); // Actualiza la tarjeta en el store
    setCardToEdit(null); // Cierra el formulario de edición
  };

  // Filtrar las tarjetas activas
  const activeCards = cards.filter((card) => card.state === 'Active');

  return (
    <div className="card-list">
        <Link className="add-card" to="/add-card">Add Card</Link>
     
      {cardToEdit ? (
        <CardForm 
          cardToEdit={cardToEdit} 
          setCardToEdit={setCardToEdit} // Permitir cancelar o guardar la edición
        />
      ) : (
        activeCards.map((card) => (
          <Card 
            key={card.id} 
            card={card} 
            onDelete={handleDelete} 
            onEdit={handleEdit}  // Aquí se pasa la tarjeta a editar
            showDeleteButton={false} 
            showEditButton={false} 
          />
        ))
      )}
    </div>
  );
};

export default CardList;


