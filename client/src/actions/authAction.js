import axios from "axios";
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from "./types";
import { _setAlert } from './alertAction';
import { setAuthToken } from "../utils/setAuthToken";



/**
 * 
 */
export const _loadUser = () => async dispatch =>{

    if(localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {

        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

    } catch (error) {

        dispatch({
            type: AUTH_ERR,
        });
        
    }


}





/**
 * Register User
 * @param {*} param0 
 */
export const _register = ({ name, email, password }) => async dispatch=>{

    //Configure header request
    const config= {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Change object javascript to json
    const data = JSON.stringify({ name, email, password});

    try {

        const res = await axios.post('/api/users', data, config);
        console.log('token',res.data)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });

        dispatch(_setAlert('Nouvel utilisateur enregistrer', 'success'))


    } catch (err) {
        
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => {
                dispatch(_setAlert(error.msg, 'danger'))
            });
        }

        dispatch({
          type: REGISTER_FAIL,
        });
    }

}




/**
 * Login User
 * @param {*} param0 
 */
export const _loginUser = (  email, password ) => async dispatch => {

    //Configure header request
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Change object javascript to json
    const data = JSON.stringify({ email, password });

    try {

        const res = await axios.post('/api/auth', data, config);

        console.log('token', res.data)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(_loadUser())


        dispatch(_setAlert('Utilisateur connecté', 'success'))


    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => {
                dispatch(_setAlert(error.msg, 'danger'))
            });
        }

        dispatch({
            type: LOGIN_FAIL,
        });
    }

};



/**
 * logout & clear 
 * the useer profile
 */
export const _logout =()=> dispatch =>{
    
    dispatch({type: LOGOUT });
    dispatch({ type: CLEAR_PROFILE })
}

