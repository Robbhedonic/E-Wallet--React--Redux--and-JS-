// import { createSlice } from '@reduxjs/toolkit';

// const cardSlice = createSlice({
//   name: 'cards',
//   initialState: [],
//   reducers: {
//     addCard: (state, action) => {
//       state.push(action.payload); // Agrega la nueva carta al estado
//     },
//     // Puedes agregar otras acciones aquí si es necesario
//   },
// });

// export const { addCard } = cardSlice.actions;
// export default cardSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   cards: [],
// };

// const cardSlice = createSlice({
//   name: 'cards',
//   initialState,
//   reducers: {
//     addCard: (state, action) => {
//       state.cards.push({ id: Date.now(), ...action.payload }); // Agrega un id único
//     },
//     updateCard: (state, action) => {
//       const { id, updatedCard } = action.payload;
//       const index = state.cards.findIndex(card => card.id === id);
//       if (index !== -1) {
//         state.cards[index] = { ...state.cards[index], ...updatedCard };
//       }
//     },
//     deleteCard: (state, action) => {
//       state.cards = state.cards.filter(card => card.id !== action.payload);
//     },
//   },
// });

// export const { addCard, updateCard, deleteCard } = cardSlice.actions;
// export default cardSlice.reducer;



// // src/redux/cardSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   cards: [],
// };

// const cardSlice = createSlice({
//   name: 'cards',
//   initialState,
//   reducers: {
//     addCard: (state, action) => {
//       state.cards.push({ id: Date.now(), ...action.payload }); // Agrega un id único
//     },
//     updateCard: (state, action) => {
//       const { id, card } = action.payload; // Cambié 'updatedCard' a 'card'
//       const index = state.cards.findIndex(card => card.id === id);
//       if (index !== -1) {
//         state.cards[index] = { ...state.cards[index], ...card }; // Actualiza los detalles de la tarjeta
//       }
//     },
//     deleteCard: (state, action) => {
//       state.cards = state.cards.filter(card => card.id !== action.payload);
//     },
//   },
// });

// export const { addCard, updateCard, deleteCard } = cardSlice.actions;



// export default cardSlice.reducer;




// // src/redux/cardSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   cards: [],
// };

// const cardSlice = createSlice({
//   name: 'cards',
//   initialState,
//   reducers: {
//     addCard: (state, action) => {
//       state.cards.push({ id: Date.now(), ...action.payload });
//     },
//     updateCard: (state, action) => {
//       const { id, card } = action.payload;
//       const index = state.cards.findIndex(card => card.id === id);
//       if (index !== -1) {
//         state.cards[index] = { ...state.cards[index], ...card };
//       }
//     },
//     deleteCard: (state, action) => {
//       state.cards = state.cards.filter(card => card.id !== action.payload);
//     },
//     deleteInactiveCards: (state) => {
//       state.cards = state.cards.filter(card => card.state !== 'Inactive');
//     },
//   },
// });

// export const { addCard, updateCard, del_eteCard, deleteInactiveCards } = cardSlice.actions;
// export default cardSlice.reducer;




// src/redux/cardSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [],
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.cards.push({ id: Date.now(), ...action.payload });
    },
    updateCard: (state, action) => {
      const { id, card } = action.payload;
      const index = state.cards.findIndex(card => card.id === id);
      if (index !== -1) {
        state.cards[index] = { ...state.cards[index], ...card };
      }
    },
    deleteCard: (state, action) => {
      state.cards = state.cards.filter(card => card.id !== action.payload);
    },
    deleteInactiveCards: (state) => {
      state.cards = state.cards.filter(card => card.state !== 'Inactive');
    },
  },
});

export const { addCard, updateCard, deleteCard, deleteInactiveCards } = cardSlice.actions;
export default cardSlice.reducer;