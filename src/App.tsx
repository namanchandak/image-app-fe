import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

const App: React.FC = () => {
  const [login, setLogin] = useState<boolean>(true);

  return (
    <div className="app-container">
      <h1 className="app-title">Welcome to Image App</h1>
      <div className="auth-container">
        {login ? (
          <Login setLogin={setLogin} />
        ) : (
          <Signup setLogin={setLogin} />
        )}
      </div>
    </div>
  );
};

export default App;