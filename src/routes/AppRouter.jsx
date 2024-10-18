// src/routes/AppRouter.jsx


// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from '../pages/Home';
// import AddCard from '../pages/AddCard';
// import CardDetail from '../pages/CardDetail';
// import Settings from '../pages/Settings';

// const AppRouter = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/add-card" element={<AddCard />} />
//       <Route path="/settings" element={<Settings />} />
//       <Route path="/card-detail" element={<CardDetail />} />
//     </Routes>
//   );
// };

// export default AppRouter;



// src/routes/AppRouter.jsx

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from '../pages/Home';
// import AddCard from '../pages/AddCard';
// import CardDetail from '../pages/CardDetail';
// import Settings from '../pages/Settings';

// const AppRouter = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/add-card" element={<AddCard />} />
//       <Route path="/settings" element={<Settings />} />
//       {/* Ruta dinámica para los detalles de la tarjeta */}
//       <Route path="/card/:id" element={<CardDetail />} />
//     </Routes>
//   );
// };

// export default AppRouter;


// src/routes/AppRouter.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AddCard from '../pages/AddCard';
import CardDetail from '../pages/CardDetail';
import Settings from '../pages/Settings';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-card" element={<AddCard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/card/:id" element={<CardDetail />} /> {/* Ruta dinámica */}
    </Routes>
  );
};

export default AppRouter;