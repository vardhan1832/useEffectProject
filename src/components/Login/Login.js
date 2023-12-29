import React, { useState,  useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailStateChange = (state, action) => {
  if(action.type === 'input'){
    return {value: action.value,isvalid:action.value.includes('@')}
  }
  if(action.type === 'blur'){
    return {value:state.value,isvalid:state.value.includes('@')}
  }
  return { value: "", isvalid: false };
};

const passwordStateChange = (state,action) =>{
  if(action.type === 'password'){
    return {value: action.value,isvalid: action.value.trim().length > 6}
  }
  if(action.type === 'blur'){
    return {value: state.value,isvalid: state.value.trim().length > 6}
  }
  return {value: '',isvalid: false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege, setEnteredCollege] = useState("");
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, emailDispatch] = useReducer(emailStateChange, {
    value: "",
    isvalid: null,
  });
  const [passwordState , passwordDispatch] = useReducer(passwordStateChange,{
    value: '',
    isvalid: null
  })

  //  useEffect(()=>{
  //    const time = setTimeout(() => {
  //     console.log('inside effect')
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length > 0
  //     );
  //   }, 1000);
  //     return ()=>{
  //       console.log('cleanup')
  //       clearTimeout(time)
  //     }
  //  },[enteredEmail,enteredPassword,enteredCollege])

  const emailChangeHandler = (event) => {
    emailDispatch({type:'input',value:event.target.value})
    setFormIsValid(
      event.target.value.includes("@") &&
        passwordState.value.trim().length > 6 &&
        enteredCollege.trim().length > 0
    );
  };

  const passwordChangeHandler = (event) => {
    passwordDispatch({type:'password',value:event.target.value})
    setFormIsValid(
      emailState.value.includes("@") &&
        event.target.value.trim().length > 6 &&
        enteredCollege.trim().length > 0
    );
  };

  const collegeChangeHandler = (event) => {
    setEnteredCollege(event.target.value);
    setFormIsValid(
      emailState.value.includes("@") &&
        passwordState.value.trim().length > 6 &&
        event.target.value.trim().length > 0
    );
  };

  const validateEmailHandler = () => {
    emailDispatch({type:'blur'})
  };

  const validatePasswordHandler = () => {
    passwordDispatch({type:'blur'})
  };

  const validateCollegeHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, enteredCollege);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isvalid === false ? classes.invalid : ""
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
            passwordState.isvalid === false ? classes.invalid : ""
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
        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
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
