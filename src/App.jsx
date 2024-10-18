import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRouter from './routes/AppRouter';
import './App.css'; // Asegúrate de importar tu CSS aquí

const App = () => {
  return (
    <Router>
      <div className="container">

         <Header />


      <main>
          <AppRouter />
      </main>
       

         <Footer />

       
      </div>
    </Router>
  );
};

export default App;