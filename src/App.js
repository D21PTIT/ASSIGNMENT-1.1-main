import React from 'react';
import './App.css';

import {Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';
import ChangePW from './components/ChangePW';
import CreateUser from './components/CreateUser';
import ChatRealTime from './components/ChatRealTime';

function App() {

  return (
    <div class='ok'>
      <Routes>
      <Route path='/' element={<ChatRealTime />} />
        {/* <Route path='/' element={<Login />} /> */}
        <Route path='/home' element={<Home />} />
        <Route path='/forgot' element={<ChangePW />} />
        <Route path='/new' element={<CreateUser/>} />
    </Routes>
    </div>
  )

}

export default App;
