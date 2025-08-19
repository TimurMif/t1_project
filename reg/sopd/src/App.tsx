import React, { useState } from 'react';
import './styles/App.css';
import { TextField } from '@mui/material';
import Form from './components/Form';
import { lightBlue } from '@mui/material/colors';

import backgroundImg from './assets/images/background_img.png';
import Sopd from './components/Sopd';
import EndPage from './components/EndPage';

function App() {
  const [showForm, setShowForm] = useState(true); 
  const [showEndPage, setshowEndPage] = useState(false); 

  const handleFormSubmit = () => {
    setShowForm(false); 
  };

  const handleshowEndPage = () => {
    setshowEndPage(true);
  };

  if (!showEndPage) {
    return (
      <div className="App">
        <div className='form-place'>
          {showForm ? (
            <Form onFormSubmit={handleFormSubmit} />
          ): (
            <Sopd onShowEndPage={handleshowEndPage} />
          )}
        </div>
        <div className='image-place'>
          <img src={backgroundImg} alt="" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="App endpage">
          <EndPage></EndPage>
      </div>
    );
  }
}

export default App;
