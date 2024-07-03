import { Reducer } from "@reduxjs/toolkit";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LoginFormState } from "../interfaces/interfaces";
const initialstate: LoginFormState = {
  username: "",
  role:"",
  email: "",
  isLoggedIn: false,
};

const loginFormReducer: Reducer<LoginFormState> = (
  state = initialstate,
  action:any
) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        username: action.payload.userName,
        role:action.payload.role,
        email: action.payload.email,
        isLoggedIn: action.payload.isLoggedIn,
      };
    case LOGOUT_SUCCESS:
      return {
        username:"",
        role:"",
        email:"",
        isLoggedIn:"",
      };


    default:
      return state;
  }
};

export default loginFormReducer;