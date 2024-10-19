
// // src/components/CardForm.jsx

// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { addCard, updateCard } from '../redux/cardSlice';
// import { useNavigate } from 'react-router-dom';

// const CardForm = ({ cardToEdit, setCardToEdit, setPreviewCardData }) => {
//   const [cardNumber, setCardNumber] = useState('');
//   const [cardHolderName, setCardHolderName] = useState('');
//   const [validThruMonth, setValidThruMonth] = useState('');
//   const [validThruYear, setValidThruYear] = useState('');
//   const [ccv, setCcv] = useState('');
//   const [bankName, setBankName] = useState('');
//   const [cardType, setCardType] = useState('');
//   const [state, setState] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Para navegar a la página de detalles

//   useEffect(() => {
//     if (cardToEdit) {
//       setCardNumber(cardToEdit.cardNumber);
//       setCardHolderName(cardToEdit.cardHolderName);
//       const [month, year] = cardToEdit.validThru.split('-');
//       setValidThruMonth(month);
//       setValidThruYear(year);
//       setCcv(cardToEdit.ccv);
//       setBankName(cardToEdit.bankName);
//       setState(cardToEdit.state);
//       setCardType(cardToEdit.cardType || '');
//     }
//   }, [cardToEdit]);

//   // Efecto para actualizar la vista previa
//   useEffect(() => {
//     const validThru = `${validThruMonth}-${validThruYear}`;
//     if (setPreviewCardData) {
//       setPreviewCardData({
//         cardNumber,
//         cardHolderName,
//         validThru,
//         ccv,
//         bankName,
//         cardType,
//         state
//       });
//     }
//   }, [cardNumber, cardHolderName, validThruMonth, validThruYear, ccv, bankName, cardType, state, setPreviewCardData]);

//   const handleCardNumberChange = (e) => {
//     const value = e.target.value;

//     if (value.length <= 16) {
//       setCardNumber(value);
//     } else{
//       alert("Maximun of number are 16")
//     }
//   };

//   const handleCcvChange = (e) => {
//     const value = e.target.value;
//     const regex = /^\d*$/;
//     if (value.length <= 3) {
//         if (regex.test(value)) {
//             setCcv(value);
//         } else {
//             alert("Only numbers are allowed in the CVV");
//         }
//       }
//   };


//   const handleCardHolderNameChange = (e) => {
//     const value = e.target.value;
//     const regex = /^[a-zA-Z\s]*$/;
//     if (regex.test(value)) {
//       setCardHolderName(value);
//     } else {
//       alert("Only letters are allowed in the card holder's name");
//     }
//   };


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (cardNumber.length !== 16 || ccv.length !== 3) {
//       alert("Invalid card number or CCV!");
//       return;
//     }

//     const validThru = `${validThruMonth}-${validThruYear}`;
//     const cardData = { cardNumber, cardHolderName, validThru, ccv, bankName, state, cardType };

//     let cardId;
//     if (cardToEdit) {
//       cardId = cardToEdit.id; // Usar el mismo ID si estamos editando
//       dispatch(updateCard({ id: cardId, card: cardData }));
//       setCardToEdit(null);
//     } else {
//       cardId = new Date().getTime(); // Generar un ID único si es una nueva tarjeta
//       dispatch(addCard({ ...cardData, id: cardId }));
//     }

//     // Guardar en localStorage
//     const currentCards = JSON.parse(localStorage.getItem('cards')) || [];
//     const updatedCards = cardToEdit
//       ? currentCards.map(card => card.id === cardToEdit.id ? { ...cardData, id: cardToEdit.id } : card)
//       :[...currentCards, { ...cardData, id: cardId }];

//     localStorage.setItem('cards', JSON.stringify(updatedCards));

//     // Limpiar formulario
//     setCardNumber('');
//     setCardHolderName('');
//     setValidThruMonth('');
//     setValidThruYear('');
//     setCcv('');
//     setBankName('');
//     setState('');
//     setCardType('');

//     // Navegar a la página de detalles
//     navigate(`/card/${cardId}`);
//   };

//   const months = Array.from({ length: 12 }, (_, i) => i + 1).map(m => ({
//     value: m < 10 ? `0${m}` : m,
//     label: m < 10 ? `0${m}` : m
//   }));

//   const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i);

//   return (
//     <form className="addForm" onSubmit={handleSubmit}>
//       <h1>{cardToEdit ? 'Editar Tarjeta' : 'Agregar Tarjeta'}</h1>
//       <select value={cardType} onChange={(e) => setCardType(e.target.value)} required>
//         <option value="" disabled>Select your payment networks</option>
//         <option value="Visa">Visa</option>
//         <option value="MasterCard">MasterCard</option>
//         <option value="American Express">American Express</option>
//         <option value="Discover">Discover</option>
//         <option value="Diners Club">Diners Club</option>
//         <option value="JCB">JCB</option>
//         <option value="Maestro">Maestro</option>
//         <option value="UnionPay">UnionPay</option>
//       </select>
//       <input 
//         type="number" 
//         value={cardNumber} 
//         onChange={handleCardNumberChange} 
//         placeholder="Number of the card" 
//         required 
//         min="0000000000000001" 
//         max="9999999999999999"
//       />
//       <input 
//         type="text" 
//         value={cardHolderName} 
//         onChange={handleCardHolderNameChange} 
//         placeholder="Nombre del titular" 
//         required 
//       />
//       <div>
//         <select className='date'
//           value={validThruMonth} 
//           onChange={(e) => setValidThruMonth(e.target.value)} 
//           required
//         >
//           <option value="" disabled>Mes</option>
//           {months.map(month => (
//             <option key={month.value} value={month.value}>{month.label}</option>
//           ))}
//         </select>
//         <select className='date'
//           value={validThruYear} 
//           onChange={(e) => setValidThruYear(e.target.value)} 
//           required
//         >
//           <option value="" disabled>Año</option>
//           {years.map(year => (
//             <option key={year} value={year}>{year}</option>
//           ))}
//         </select>
//       </div>
//       <input 
//         type="number" 
//         value={ccv} 
//         onChange={handleCcvChange} 
//         placeholder="CCV" 
//         required 
//         min="001" 
//         max="999"
//       />
//       <select 
//         value={bankName} 
//         onChange={(e) => setBankName(e.target.value)} 
//         required
//       >
//         <option value="" disabled>Select Bank</option>
//         <option value="SEB">SEB (Skandinaviska Enskilda Banken)</option>
//         <option value="Swedbank">Swedbank</option>
//         <option value="Nordea">Nordea</option>
//         <option value="Handelsbanken">Handelsbanken</option>
//         <option value="Danske Bank">Danske Bank</option>
//         <option value="Länsförsäkringar Bank">Länsförsäkringar Bank</option>
//         <option value="Ikano Bank">Ikano Bank</option>
//         <option value="Skandiabanken">Skandiabanken</option>
//         <option value="ICA Banken">ICA Banken</option>
//       </select>
//       <select value={state} onChange={(e) => setState(e.target.value)} required>
//         <option value="" disabled>Select State</option>
//         <option value="Active">Active</option>
//         <option value="Inactive">Inactive</option>
//       </select>
//       <button type="submit">{cardToEdit ? 'Actualizar' : 'Agregar Tarjeta'}</button>
//     </form>
//   );
// };

// export default CardForm;


// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { addCard, updateCard } from '../redux/cardSlice';
// import { useNavigate } from 'react-router-dom';

// const CardForm = ({ cardToEdit, setCardToEdit, setPreviewCardData }) => {
//   const [cardNumber, setCardNumber] = useState('');
//   const [cardHolderName, setCardHolderName] = useState('');
//   const [validThruMonth, setValidThruMonth] = useState('');
//   const [validThruYear, setValidThruYear] = useState('');
//   const [ccv, setCcv] = useState('');
//   const [bankName, setBankName] = useState('');
//   const [cardType, setCardType] = useState('');
//   const [state, setState] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Para navegar a la página de detalles

//   // Efecto para rellenar el formulario al editar
//   useEffect(() => {
//     if (cardToEdit) {
//       // Aquí cargamos los valores de la tarjeta que queremos editar
//       setCardNumber(cardToEdit.cardNumber || '');
//       setCardHolderName(cardToEdit.cardHolderName || '');
//       const [month, year] = cardToEdit.validThru ? cardToEdit.validThru.split('-') : ['', ''];
//       setValidThruMonth(month || '');
//       setValidThruYear(year || '');
//       setCcv(cardToEdit.ccv || '');
//       setBankName(cardToEdit.bankName || '');
//       setCardType(cardToEdit.cardType || '');
//       setState(cardToEdit.state || '');
//     }
//   }, [cardToEdit]); // Este efecto se ejecuta cada vez que `cardToEdit` cambia

//   // Efecto para actualizar la vista previa
//   useEffect(() => {
//     const validThru = `${validThruMonth}-${validThruYear}`;
//     if (setPreviewCardData) {
//       setPreviewCardData({
//         cardNumber,
//         cardHolderName,
//         validThru,
//         ccv,
//         bankName,
//         cardType,
//         state
//       });
//     }
//   }, [cardNumber, cardHolderName, validThruMonth, validThruYear, ccv, bankName, cardType, state, setPreviewCardData]);

//   const handleCardNumberChange = (e) => {
//     const value = e.target.value;
//     if (value.length <= 16) {
//       setCardNumber(value);
//     } else {
//       alert("Maximum number of digits allowed is 16");
//     }
//   };

//   const handleCcvChange = (e) => {
//     const value = e.target.value;
//     const regex = /^\d*$/;
//     if (value.length <= 3) {
//       if (regex.test(value)) {
//         setCcv(value);
//       } else {
//         alert("Only numbers are allowed in the CVV");
//       }
//     }
//   };

//   const handleCardHolderNameChange = (e) => {
//     const value = e.target.value;
//     const regex = /^[a-zA-Z\s]*$/;
//     if (regex.test(value)) {
//       setCardHolderName(value);
//     } else {
//       alert("Only letters are allowed in the card holder's name");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (cardNumber.length !== 16 || ccv.length !== 3) {
//       alert("Invalid card number or CCV!");
//       return;
//     }

//     const validThru = `${validThruMonth}-${validThruYear}`;
//     const cardData = { cardNumber, cardHolderName, validThru, ccv, bankName, state, cardType };

//     let cardId;
//     if (cardToEdit) {
//       cardId = cardToEdit.id; // Usar el mismo ID si estamos editando
//       dispatch(updateCard({ id: cardId, card: cardData }));
//       setCardToEdit(null);
//     } else {
//       cardId = new Date().getTime(); // Generar un ID único si es una nueva tarjeta
//       dispatch(addCard({ ...cardData, id: cardId }));
//     }

//     // Guardar en localStorage
//     const currentCards = JSON.parse(localStorage.getItem('cards')) || [];
//     const updatedCards = cardToEdit
//       ? currentCards.map(card => card.id === cardToEdit.id ? { ...cardData, id: cardToEdit.id } : card)
//       : [...currentCards, { ...cardData, id: cardId }];

//     localStorage.setItem('cards', JSON.stringify(updatedCards));

//     // Limpiar formulario
//     setCardNumber('');
//     setCardHolderName('');
//     setValidThruMonth('');
//     setValidThruYear('');
//     setCcv('');
//     setBankName('');
//     setState('');
//     setCardType('');

//     // Navegar a la página de detalles
//     navigate(`/card/${cardId}`);
//   };

//   const months = Array.from({ length: 12 }, (_, i) => i + 1).map(m => ({
//     value: m < 10 ? `0${m}` : m,
//     label: m < 10 ? `0${m}` : m
//   }));

//   const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i);

//   return (
//     <form className="addForm" onSubmit={handleSubmit}>
//       <h1>{cardToEdit ? 'Editar Tarjeta' : 'Agregar Tarjeta'}</h1>
//       <select value={cardType} onChange={(e) => setCardType(e.target.value)} required>
//         <option value="" disabled>Select your payment networks</option>
//         <option value="Visa">Visa</option>
//         <option value="MasterCard">MasterCard</option>
//         <option value="American Express">American Express</option>
//         <option value="Discover">Discover</option>
//       </select>
//       <input 
//         type="number" 
//         value={cardNumber} 
//         onChange={handleCardNumberChange} 
//         placeholder="Number of the card" 
//         required 
//       />
//       <input 
//         type="text" 
//         value={cardHolderName} 
//         onChange={handleCardHolderNameChange} 
//         placeholder="Nombre del titular" 
//         required 
//       />
//       <div>
//         <select className='date'
//           value={validThruMonth} 
//           onChange={(e) => setValidThruMonth(e.target.value)} 
//           required
//         >
//           <option value="" disabled>Mes</option>
//           {months.map(month => (
//             <option key={month.value} value={month.value}>{month.label}</option>
//           ))}
//         </select>
//         <select className='date'
//           value={validThruYear} 
//           onChange={(e) => setValidThruYear(e.target.value)} 
//           required
//         >
//           <option value="" disabled>Año</option>
//           {years.map(year => (
//             <option key={year} value={year}>{year}</option>
//           ))}
//         </select>
//       </div>
//       <input 
//         type="number" 
//         value={ccv} 
//         onChange={handleCcvChange} 
//         placeholder="CCV" 
//         required 
//       />
//       <select 
//         value={bankName} 
//         onChange={(e) => setBankName(e.target.value)} 
//         required
//       >
//         <option value="" disabled>Select Bank</option>
//         <option value="SEB">SEB (Skandinaviska Enskilda Banken)</option>
//         <option value="Swedbank">Swedbank</option>
//         <option value="Nordea">Nordea</option>
//         <option value="Handelsbanken">Handelsbanken</option>
//         <option value="Danske Bank">Danske Bank</option>
//         <option value="Länsförsäkringar Bank">Länsförsäkringar Bank</option>
//         <option value="Ikano Bank">Ikano Bank</option>
//         <option value="Skandiabanken">Skandiabanken</option>
//         <option value="ICA Banken">ICA Banken</option>
//       </select>
//       <select value={state} onChange={(e) => setState(e.target.value)} required>
//         <option value="" disabled>Select State</option>
//         <option value="Active">Active</option>
//         <option value="Inactive">Inactive</option>
//       </select>
//       <button type="submit">{cardToEdit ? 'Actualizar' : 'Agregar Tarjeta'}</button>
//     </form>
//   );
// };

// export default CardForm;




// // src/components/CardForm.jsx

// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { addCard, updateCard } from '../redux/cardSlice';
// import { useNavigate } from 'react-router-dom';

// const CardForm = ({ cardToEdit, setCardToEdit, setPreviewCardData }) => {
//   const [cardNumber, setCardNumber] = useState('');
//   const [cardHolderName, setCardHolderName] = useState('');
//   const [validThruMonth, setValidThruMonth] = useState('');
//   const [validThruYear, setValidThruYear] = useState('');
//   const [ccv, setCcv] = useState('');
//   const [bankName, setBankName] = useState('');
//   const [cardType, setCardType] = useState('');
//   const [state, setState] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Para navegar a la página de detalles

//   useEffect(() => {
//     if (cardToEdit) {
//       setCardNumber(cardToEdit.cardNumber);
//       setCardHolderName(cardToEdit.cardHolderName);
//       const [month, year] = cardToEdit.validThru.split('-');
//       setValidThruMonth(month);
//       setValidThruYear(year);
//       setCcv(cardToEdit.ccv);
//       setBankName(cardToEdit.bankName);
//       setState(cardToEdit.state);
//       setCardType(cardToEdit.cardType || '');
//     }
//   }, [cardToEdit]);

//   // Efecto para actualizar la vista previa
//   useEffect(() => {
//     const validThru = `${validThruMonth}-${validThruYear}`;
//     if (setPreviewCardData) {
//       setPreviewCardData({
//         cardNumber,
//         cardHolderName,
//         validThru,
//         ccv,
//         bankName,
//         cardType,
//         state
//       });
//     }
//   }, [cardNumber, cardHolderName, validThruMonth, validThruYear, ccv, bankName, cardType, state, setPreviewCardData]);

//   const handleCardNumberChange = (e) => {
//     const value = e.target.value;

//     if (value.length <= 16) {
//       setCardNumber(value);
//     } else {
//       alert("Maximun of number are 16");
//     }
//   };

//   const handleCcvChange = (e) => {
//     const value = e.target.value;
//     const regex = /^\d*$/;
//     if (value.length <= 3) {
//         if (regex.test(value)) {
//             setCcv(value);
//         } else {
//             alert("Only numbers are allowed in the CVV");
//         }
//       }
//   };

//   const handleCardHolderNameChange = (e) => {
//     const value = e.target.value;
//     const regex = /^[a-zA-Z\s]*$/;
//     if (regex.test(value)) {
//       setCardHolderName(value);
//     } else {
//       alert("Only letters are allowed in the card holder's name");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (cardNumber.length !== 16 || ccv.length !== 3) {
//       alert("Invalid card number or CCV!");
//       return;
//     }

//     const validThru = `${validThruMonth}-${validThruYear}`;
//     const cardData = { cardNumber, cardHolderName, validThru, ccv, bankName, state, cardType };

//     let cardId;
//     if (cardToEdit) {
//       cardId = cardToEdit.id; // Usar el mismo ID si estamos editando
//       dispatch(updateCard({ id: cardId, card: cardData }));
//       setCardToEdit(null);
//     } else {
//       cardId = new Date().getTime(); // Generar un ID único si es una nueva tarjeta
//       dispatch(addCard({ ...cardData, id: cardId }));
//     }

//     // Guardar en localStorage
//     const currentCards = JSON.parse(localStorage.getItem('cards')) || [];
//     const updatedCards = cardToEdit
//       ? currentCards.map(card => card.id === cardToEdit.id ? { ...cardData, id: cardToEdit.id } : card)
//       :[...currentCards, { ...cardData, id: cardId }];

//     localStorage.setItem('cards', JSON.stringify(updatedCards));

//     // Limpiar formulario
//     setCardNumber('');
//     setCardHolderName('');
//     setValidThruMonth('');
//     setValidThruYear('');
//     setCcv('');
//     setBankName('');
//     setState('');
//     setCardType('');

//     // Navegar a la página de detalles
//     navigate(`/card/${cardId}`);
//   };

//   const months = Array.from({ length: 12 }, (_, i) => i + 1).map(m => ({
//     value: m < 10 ? `0${m}` : m,
//     label: m < 10 ? `0${m}` : m
//   }));

//   const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i);

//   return (
//     <form className="addForm" onSubmit={handleSubmit}>
//       <h1>{cardToEdit ? 'Editar Tarjeta' : 'Agregar Tarjeta'}</h1>
//       <select value={cardType} onChange={(e) => setCardType(e.target.value)} required>
//         <option value="" disabled>Select your payment networks</option>
//         <option value="Visa">Visa</option>
//         <option value="MasterCard">MasterCard</option>
//         <option value="American Express">American Express</option>
//         <option value="Discover">Discover</option>
//         <option value="Diners Club">Diners Club</option>
//         <option value="JCB">JCB</option>
//         <option value="Maestro">Maestro</option>
//         <option value="UnionPay">UnionPay</option>
//       </select>
//       <input 
//         type="number" 
//         value={cardNumber} 
//         onChange={handleCardNumberChange} 
//         placeholder="Number of the card" 
//         required 
//         min="0000000000000001" 
//         max="9999999999999999"
//       />
//       <input 
//         type="text" 
//         value={cardHolderName} 
//         onChange={handleCardHolderNameChange} 
//         placeholder="Nombre del titular" 
//         required 
//       />
//       <div>
//         <select className='date'
//           value={validThruMonth} 
//           onChange={(e) => setValidThruMonth(e.target.value)} 
//           required
//         >
//           <option value="" disabled>Mes</option>
//           {months.map(month => (
//             <option key={month.value} value={month.value}>{month.label}</option>
//           ))}
//         </select>
//         <select className='date'
//           value={validThruYear} 
//           onChange={(e) => setValidThruYear(e.target.value)} 
//           required
//         >
//           <option value="" disabled>Año</option>
//           {years.map(year => (
//             <option key={year} value={year}>{year}</option>
//           ))}
//         </select>
//       </div>
//       <input 
//         type="number" 
//         value={ccv} 
//         onChange={handleCcvChange} 
//         placeholder="CCV" 
//         required 
//         min="001" 
//         max="999"
//       />
//       <select 
//         value={bankName} 
//         onChange={(e) => setBankName(e.target.value)} 
//         required
//       >
//         <option value="" disabled>Select Bank</option>
//         <option value="SEB">SEB (Skandinaviska Enskilda Banken)</option>
//         <option value="Swedbank">Swedbank</option>
//         <option value="Nordea">Nordea</option>
//         <option value="Handelsbanken">Handelsbanken</option>
//         <option value="Danske Bank">Danske Bank</option>
//         <option value="Länsförsäkringar Bank">Länsförsäkringar Bank</option>
//         <option value="Ikano Bank">Ikano Bank</option>
//         <option value="Skandiabanken">Skandiabanken</option>
//         <option value="ICA Banken">ICA Banken</option>
//       </select>
//       <select value={state} onChange={(e) => setState(e.target.value)} required>
//         <option value="" disabled>Select State</option>
//         <option value="Active">Active</option>
//         <option value="Inactive">Inactive</option>
//       </select>
//       <button type="submit">{cardToEdit ? 'Actualizar' : 'Agregar Tarjeta'}</button>
//     </form>
//   );
// };

// export default CardForm;



// // src/components/CardForm.jsx

// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { addCard, updateCard } from '../redux/cardSlice';
// import { useNavigate } from 'react-router-dom';

// const CardForm = ({ cardToEdit, setCardToEdit, setPreviewCardData }) => {
//   const [cardNumber, setCardNumber] = useState(cardToEdit?.cardNumber || '');
//   const [cardHolderName, setCardHolderName] = useState(cardToEdit?.cardHolderName || '');
//   const [validThruMonth, setValidThruMonth] = useState(cardToEdit ? cardToEdit.validThru.split('-')[0] : '');
//   const [validThruYear, setValidThruYear] = useState(cardToEdit ? cardToEdit.validThru.split('-')[1] : '');
//   const [ccv, setCcv] = useState(cardToEdit?.ccv || '');
//   const [bankName, setBankName] = useState(cardToEdit?.bankName || '');
//   const [cardType, setCardType] = useState(cardToEdit?.cardType || '');
//   const [state, setState] = useState(cardToEdit?.state || '');
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Para navegar a la página de detalles

//   useEffect(() => {
//     if (cardToEdit) {
//       setCardNumber(cardToEdit.cardNumber);
//       setCardHolderName(cardToEdit.cardHolderName);
//       const [month, year] = cardToEdit.validThru.split('-');
//       setValidThruMonth(month);
//       setValidThruYear(year);
//       setCcv(cardToEdit.ccv);
//       setBankName(cardToEdit.bankName);
//       setState(cardToEdit.state);
//       setCardType(cardToEdit.cardType || '');
//     }
//   }, [cardToEdit]);

//   // Efecto para actualizar la vista previa
//   useEffect(() => {
//     const validThru = `${validThruMonth}-${validThruYear}`;
//     if (setPreviewCardData) {
//       setPreviewCardData({
//         cardNumber,
//         cardHolderName,
//         validThru,
//         ccv,
//         bankName,
//         cardType,
//         state
//       });
//     }
//   }, [cardNumber, cardHolderName, validThruMonth, validThruYear, ccv, bankName, cardType, state, setPreviewCardData]);

//   const handleCardNumberChange = (e) => {
//     const value = e.target.value;

//     if (value.length <= 16) {
//       setCardNumber(value);
//     } else {
//       alert("Maximun of number are 16");
//     }
//   };

//   const handleCcvChange = (e) => {
//     const value = e.target.value;
//     const regex = /^\d*$/;
//     if (value.length <= 3) {
//         if (regex.test(value)) {
//             setCcv(value);
//         } else {
//             alert("Only numbers are allowed in the CVV");
//         }
//       }
//   };

//   const handleCardHolderNameChange = (e) => {
//     const value = e.target.value;
//     const regex = /^[a-zA-Z\s]*$/;
//     if (regex.test(value)) {
//       setCardHolderName(value);
//     } else {
//       alert("Only letters are allowed in the card holder's name");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (cardNumber.length !== 16 || ccv.length !== 3) {
//       alert("Invalid card number or CCV!");
//       return;
//     }

//     const validThru = `${validThruMonth}-${validThruYear}`;
//     const cardData = { cardNumber, cardHolderName, validThru, ccv, bankName, state, cardType };

//     let cardId;
//     if (cardToEdit) {
//       cardId = cardToEdit.id; // Usar el mismo ID si estamos editando
//       dispatch(updateCard({ id: cardId, card: cardData }));
//       setCardToEdit(null);
//     } else {
//       cardId = new Date().getTime(); // Generar un ID único si es una nueva tarjeta
//       dispatch(addCard({ ...cardData, id: cardId }));
//     }

//     // Guardar en localStorage
//     const currentCards = JSON.parse(localStorage.getItem('cards')) || [];
//     const updatedCards = cardToEdit
//       ? currentCards.map(card => card.id === cardToEdit.id ? { ...cardData, id: cardToEdit.id } : card)
//       :[...currentCards, { ...cardData, id: cardId }];

//     localStorage.setItem('cards', JSON.stringify(updatedCards));

//     // Limpiar formulario
//     setCardNumber('');
//     setCardHolderName('');
//     setValidThruMonth('');
//     setValidThruYear('');
//     setCcv('');
//     setBankName('');
//     setState('');
//     setCardType('');

//     // Navegar a la página de detalles
//     navigate(`/card/${cardId}`);
//   };

//   const months = Array.from({ length: 12 }, (_, i) => i + 1).map(m => ({
//     value: m < 10 ? `0${m}` : m,
//     label: m < 10 ? `0${m}` : m
//   }));

//   const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i);

//   return (
//     <form className="addForm" onSubmit={handleSubmit}>
//       <h1>{cardToEdit ? 'Editar Tarjeta' : 'Agregar Tarjeta'}</h1>
//       <select value={cardType} onChange={(e) => setCardType(e.target.value)} required>
//         <option value="" disabled>Select your payment networks</option>
//         <option value="Visa">Visa</option>
//         <option value="MasterCard">MasterCard</option>
//         <option value="American Express">American Express</option>
//         <option value="Discover">Discover</option>
//         <option value="Diners Club">Diners Club</option>
//         <option value="JCB">JCB</option>
//         <option value="Maestro">Maestro</option>
//         <option value="UnionPay">UnionPay</option>
//       </select>
//       <input 
//         type="number" 
//         value={cardNumber} 
//         onChange={handleCardNumberChange} 
//         placeholder="Number of the card" 
//         required 
//         min="0000000000000001" 
//         max="9999999999999999"
//       />
//       <input 
//         type="text" 
//         value={cardHolderName} 
//         onChange={handleCardHolderNameChange} 
//         placeholder="Nombre del titular" 
//         required 
//       />
//       <div>
//         <select className='date'
//           value={validThruMonth} 
//           onChange={(e) => setValidThruMonth(e.target.value)} 
//           required
//         >
//           <option value="" disabled>Mes</option>
//           {months.map(month => (
//             <option key={month.value} value={month.value}>{month.label}</option>
//           ))}
//         </select>
//         <select className='date'
//           value={validThruYear} 
//           onChange={(e) => setValidThruYear(e.target.value)} 
//           required
//         >
//           <option value="" disabled>Año</option>
//           {years.map(year => (
//             <option key={year} value={year}>{year}</option>
//           ))}
//         </select>
//       </div>
//       <input 
//         type="number" 
//         value={ccv} 
//         onChange={handleCcvChange} 
//         placeholder="CCV" 
//         required 
//         min="001" 
//         max="999"
//       />
//       <select 
//         value={bankName} 
//         onChange={(e) => setBankName(e.target.value)} 
//         required
//       >
//               <option value="" disabled>Select Bank</option>
//         <option value="SEB">SEB (Skandinaviska Enskilda Banken)</option>
//         <option value="Swedbank">Swedbank</option>
//         <option value="Nordea">Nordea</option>
//         <option value="Handelsbanken">Handelsbanken</option>
//         <option value="Danske Bank">Danske Bank</option>
//         <option value="Länsförsäkringar Bank">Länsförsäkringar Bank</option>
//         <option value="Ikano Bank">Ikano Bank</option>
//         <option value="Skandiabanken">Skandiabanken</option>
//         <option value="ICA Banken">ICA Banken</option>
//       </select>
//       <select value={state} onChange={(e) => setState(e.target.value)} required>
//         <option value="" disabled>Select State</option>
//         <option value="Active">Active</option>
//         <option value="Inactive">Inactive</option>
//       </select>
//       <button type="submit">{cardToEdit ? 'Actualizar' : 'Agregar Tarjeta'}</button>
//     </form>
//   );
// };

// export default CardForm;




import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCard, updateCard } from '../redux/cardSlice';
import { useNavigate } from 'react-router-dom';

const CardForm = ({ cardToEdit, setCardToEdit, setPreviewCardData }) => {
  const [cardNumber, setCardNumber] = useState(cardToEdit?.cardNumber || '');
  const [cardHolderName, setCardHolderName] = useState(cardToEdit?.cardHolderName || '');
  const [validThruMonth, setValidThruMonth] = useState(cardToEdit ? cardToEdit.validThru.split('-')[0] : '');
  const [validThruYear, setValidThruYear] = useState(cardToEdit ? cardToEdit.validThru.split('-')[1] : '');
  const [ccv, setCcv] = useState(cardToEdit?.ccv || '');
  const [bankName, setBankName] = useState(cardToEdit?.bankName || '');
  const [cardType, setCardType] = useState(cardToEdit?.cardType || '');
  const [state, setState] = useState(cardToEdit?.state || '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cardToEdit) {
      setCardNumber(cardToEdit.cardNumber);
      setCardHolderName(cardToEdit.cardHolderName);
      const [month, year] = cardToEdit.validThru.split('-');
      setValidThruMonth(month);
      setValidThruYear(year);
      setCcv(cardToEdit.ccv);
      setBankName(cardToEdit.bankName);
      setState(cardToEdit.state);
      setCardType(cardToEdit.cardType || '');
    }
  }, [cardToEdit]);

  useEffect(() => {
    const validThru = `${validThruMonth}-${validThruYear}`;
    if (setPreviewCardData) {
      setPreviewCardData({
        cardNumber,
        cardHolderName,
        validThru,
        ccv,
        bankName,
        cardType,
        state,
      });
    }
  }, [cardNumber, cardHolderName, validThruMonth, validThruYear, ccv, bankName, cardType, state, setPreviewCardData]);

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    if (value.length <= 16) {
      setCardNumber(value);
    } else {
      alert("Maximum of number are 16");
    }
  };

  const handleCcvChange = (e) => {
    const value = e.target.value;
    const regex = /^\d*$/;
    if (value.length <= 3) {
      if (regex.test(value)) {
        setCcv(value);
      } else {
        alert("Only numbers are allowed in the CVV");
      }
    }
  };

  const handleCardHolderNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setCardHolderName(value);
    } else {
      alert("Only letters are allowed in the card holder's name");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardNumber.length !== 16 || ccv.length !== 3) {
      alert("Invalid card number or CCV!");
      return;
    }

    const validThru = `${validThruMonth}-${validThruYear}`;
    const cardData = { cardNumber, cardHolderName, validThru, ccv, bankName, state, cardType };

    // Recuperar las tarjetas actuales del localStorage
    const currentCards = JSON.parse(localStorage.getItem('cards')) || [];

    // Verificar si ya hay 4 tarjetas
    if (currentCards.length >= 4 && !cardToEdit) {
      alert("Ya tienes el máximo de 4 tarjetas. Debes eliminar una antes de agregar otra.");
      return;
    }

    // Verificar si ya hay una tarjeta activa
    const activeCards = currentCards.filter(card => card.state === 'Active');
    if (state === 'Active' && activeCards.length >= 1 && (!cardToEdit || cardToEdit.state !== 'Active')) {
      alert("Ya tienes una tarjeta activa. Solo puedes tener una tarjeta activa a la vez.");
      return;
    }

    let cardId;
    if (cardToEdit) {
      cardId = cardToEdit.id; // Usar el mismo ID si estamos editando
      dispatch(updateCard({ id: cardId, card: cardData }));
      setCardToEdit(null);
    } else {
      cardId = new Date().getTime(); // Generar un ID único si es una nueva tarjeta
      dispatch(addCard({ ...cardData, id: cardId }));
    }

    // Guardar en localStorage
    const updatedCards = cardToEdit
      ? currentCards.map(card => card.id === cardToEdit.id ? { ...cardData, id: cardToEdit.id } : card)
      : [...currentCards, { ...cardData, id: cardId }];

    localStorage.setItem('cards', JSON.stringify(updatedCards));

    // Limpiar formulario
    setCardNumber('');
    setCardHolderName('');
    setValidThruMonth('');
    setValidThruYear('');
    setCcv('');
    setBankName('');
    setState('');
    setCardType('');

    // Navegar a la página de detalles
    navigate(`/card/${cardId}`);
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1).map(m => ({
    value: m < 10 ? `0${m}` : m,
    label: m < 10 ? `0${m}` : m,
  }));

  const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i);

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <h1>{cardToEdit ? 'Editar Tarjeta' : 'Agregar Tarjeta'}</h1>
      <select value={cardType} onChange={(e) => setCardType(e.target.value)} required>
        <option value="" disabled>Select your payment networks</option>
        <option value="Visa">Visa</option>
        <option value="MasterCard">MasterCard</option>
        <option value="American Express">American Express</option>
        <option value="Discover">Discover</option>
        <option value="Diners Club">Diners Club</option>
        <option value="JCB">JCB</option>
        <option value="Maestro">Maestro</option>
        <option value="UnionPay">UnionPay</option>
      </select>
      <input 
        type="number" 
        value={cardNumber} 
        onChange={handleCardNumberChange} 
        placeholder="Number of the card" 
        required 
        min="0000000000000001" 
        max="9999999999999999"
      />
      <input 
        type="text" 
        value={cardHolderName} 
        onChange={handleCardHolderNameChange} 
        placeholder="Nombre del titular" 
        required 
      />
      <div>
        <select className='date'
          value={validThruMonth} 
          onChange={(e) => setValidThruMonth(e.target.value)} 
          required
        >
          <option value="" disabled>Mes</option>
          {months.map(month => (
            <option key={month.value} value={month.value}>{month.label}</option>
          ))}
        </select>
        <select className='date'
          value={validThruYear} 
          onChange={(e) => setValidThruYear(e.target.value)} 
          required
        >
          <option value="" disabled>Año</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <input 
        type="number" 
        value={ccv} 
        onChange={handleCcvChange} 
        placeholder="CCV" 
        required 
        min="001" 
        max="999"
      />
      <select 
        value={bankName} 
        onChange={(e) => setBankName(e.target.value)} 
        required
      >
        <option value="" disabled>Select Bank</option>
        <option value="SEB">SEB (Skandinaviska Enskilda Banken)</option>
        <option value="Swedbank">Swedbank</option>
        <option value="Nordea">Nordea</option>
        <option value="Handelsbanken">Handelsbanken</option>
        <option value="Danske Bank">Danske Bank</option>
        <option value="Länsförsäkringar Bank">Länsförsäkringar Bank</option>
        <option value="Ikano Bank">Ikano Bank</option>
        <option value="Skandiabanken">Skandiabanken</option>
        <option value="ICA Banken">ICA Banken        </option>
      </select>
      <select value={state} onChange={(e) => setState(e.target.value)} required>
        <option value="" disabled>Select State</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <button type="submit">{cardToEdit ? 'Actualizar' : 'Agregar Tarjeta'}</button>
    </form>
  );
};

export default CardForm;