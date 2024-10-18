// src/pages/Settings.jsx

import React from 'react';
import ColorTheme from '../components/ColorTheme';
import InactiveCardList from '../components/InactiveCardList';

const Settings = () => {
 

  return (
    <div className='page-settings'>
      <ColorTheme/>
      <InactiveCardList/>
      
     
    </div>
  );
};

export default Settings;