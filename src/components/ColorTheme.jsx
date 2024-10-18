// src/components/ColorTheme.jsx



import React, { useState, useEffect } from 'react';

const ColorTheme = () => {
  // Define un array con las opciones de colores específicos
  const colorOptions = [
    { name: 'Wine', color: 'rgb(128, 0, 32)' },
    { name: 'black', color: 'rgb(0, 0, 0)' },
    { name: 'blue', color: 'rgb(0, 0, 255)' },
    { name: 'little light gren', color: 'rgb(0, 128, 0)' },
    { name: 'turquesa', color: 'rgb(0, 206, 209)' },
    { name: 'grey', color: 'rgb(128, 128, 128)' },
  ];

  // Obtén el color almacenado en localStorage o usa el color predeterminado
  const storedColor = localStorage.getItem('backgroundColor') || colorOptions[0].color;
  const [backgroundColor, setBackgroundColor] = useState(storedColor);

  const handleColorChange = (event) => {
    const selectedColor = event.target.value;
    setBackgroundColor(selectedColor);
    localStorage.setItem('backgroundColor', selectedColor); // Almacena el color seleccionado en localStorage
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--background-color', backgroundColor);
  }, [backgroundColor]);

  return (
    <div className='page-settings'>
      <h2>Settings</h2>
      <label htmlFor="colorSelect">Choose your background color:</label>
      <select
        className='color-theme'
        id="colorSelect"
        onChange={handleColorChange}
        value={backgroundColor}
      >
        {colorOptions.map((option) => (
          <option key={option.color} value={option.color}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ColorTheme;