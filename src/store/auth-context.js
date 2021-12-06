import React from 'react';

// Our context will be our app-wide state
const AuthContext = React.createContext({
    isLoggedIn: false
});

export default AuthContext;