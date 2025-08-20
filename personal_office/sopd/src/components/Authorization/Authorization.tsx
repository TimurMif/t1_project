import React, { useState } from 'react';
import '../../styles/Authorization.css';
import Form from './FormAuth';
import backgroundImg from '../../assets/images/background_image.png';

function Authorization() {
  return (
    <div className="Auth">
        <div className='form-place'>
          <Form></Form>
        </div>
        <div className='image-place'>
          <img src={backgroundImg} alt="" />
        </div>
    </div>
  );
}

export default Authorization;
