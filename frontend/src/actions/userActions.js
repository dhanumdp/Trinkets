import Axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from "../constants/userConstants";

const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
  try {
    const { data } = await Axios.put("/api/users/" + userId,
      { name, email, password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  const { data } = await Axios.post("/api/users/signin", { email, password });
  if(data['message'])
  {
    dispatch({ type: USER_SIGNIN_FAIL, payload: data.message });
  }
  else
  {
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  }
  // try {
    
  //   console.log(data);
  
  // } catch (error) {
  //   console.log(data);
  //   dispatch({ type: USER_SIGNIN_FAIL, payload: data.message });
  // }
}

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  const { data } = await Axios.post("/api/users/register", { name, email, password });
  console.log(data);
  if(data['error'])
  {
    dispatch({ type: USER_REGISTER_FAIL, payload: data.message });
  }
  else
  {
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.message });
     //Cookie.set('userInfo', JSON.stringify(data));
  }
  // try {
  
  //  
  // } catch (error) {
  //  
  // }
}

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  Cookie.remove('cartItems'); 
  dispatch({ type: USER_LOGOUT })
}
export { signin, register, logout, update };