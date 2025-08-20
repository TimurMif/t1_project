import React, { useState } from 'react';
import './styles/App.css';
import Authorization from './components/Authorization/Authorization';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './components/Pages/MainPage';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';

function App() {
    const userState = useSelector((state: RootState) => state.data);
    console.log(userState);

    return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Authorization></Authorization>}></Route>
          <Route path='/lk' element={userState.isLogin ? <MainPage></MainPage> : <Navigate to='/'></Navigate>}></Route>
        </Routes>
      </div>
    );
}

export default App;