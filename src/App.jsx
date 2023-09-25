import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Join from './components/Join';
import Chat from './components/Chat';
import { SocketStorage } from './contexts/SocketContext';

function App() {
  return (
    <>
      <SocketStorage>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Join />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </SocketStorage>
    </>
  );
}

export default App;
