import React from 'react';
import Login from './components/Login';
import Chat from './components/Chat';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider } from './utils/context/AppContext';

function App() {
  return (
    <div className="App">
      <AppContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
      </AppContextProvider>
    </div>
  );
}

export default App;
