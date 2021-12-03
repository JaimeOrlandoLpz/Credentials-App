import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {



  const [isLoggedIn, setIsLoggedIn] = useState(false);



  // Evaluates After every aspect of the component has been evaluated and only if the dependencies have changed
  useEffect(() => {
    const storeUserLoggedInformation = localStorage.getItem('isLoggedIn'); // Check if Item is stored in local storage
    if(storeUserLoggedInformation === '1'){
      setIsLoggedIn(true); // If local storage has inforrmation of a previous log, we sign the user in automatically without requiring credenteals
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    // We save a key-value pair in the local storage when the user logs in
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
