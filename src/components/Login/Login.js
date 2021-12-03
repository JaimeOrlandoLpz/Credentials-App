import React, { useState, useEffect, useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// Reducer Functions can be declared outside of the component function

// Depending of the type of action regarding the email input, states should be updated using the reducer function
const emailReducer = (state, action) => {

  if(action.type === 'USER_INPUT' ){
    return({value: action.val, isValid: action.val.includes('@')});
  }

  if(action.type === 'INPUT_BLUR'){
    return({value: state.value, isValid: state.value.includes('@')});
  }
    return {
      value: '',
      isValid: false
    };
}

const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return({value: action.val, isValid: action.val.trim().length > 6});
  }

  if(action.type === 'INPUT_BLUR'){
    return({
      value: state.value, isValid: state.value.trim().length > 6
    });
  }
  return({value: '', isValid: false});
}

const Login = (props) => {


  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // Handle Email Value and Validity within the same state
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: false});

    // Handle Password Value and Validity within the same state
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: false});

  // Use ALIAS assignment to save email and password validity in variables
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  // Side effect will be run at the end of the first component evaluation and whenever one of the three dependencies changes
  useEffect(()=>{
    
     const identifier = setTimeout(()=>{
      console.log("Validating Form");
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      clearTimeout(identifier); //Clears timer every time the cleanup function executes
      /* Cleanup function that will run whenever new side effects execute */
      console.log("CLEANUP");
    }

  }, [ emailIsValid, passwordIsValid ]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});
    
    // setFormIsValid(emailState.value.includes('@') && passwordState.value.trim().length > 6);

  };

  const passwordChangeHandler = (event) => {
    
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
      passwordState.value.length > 6 && emailState.value.includes('@')
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
