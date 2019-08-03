import axios from "axios";
import { REGISTER_FAIL, REGISTER_SUCCESS } from "./types";
import { _setAlert } from './alertAction';








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