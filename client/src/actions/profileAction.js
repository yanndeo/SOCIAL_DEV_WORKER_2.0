import axios from "axios";
import { _setAlert } from './alertAction';
import { GET_PROFILE, PROFILE_ERROR } from "./types";
//import { setAuthToken } from "../utils/setAuthToken";



/**
 * Get current
 * user profile
 */
 export const _getCurrentProfile = ()=> async dispatch => {

     try {
         const res = await axios.get('/api/profile/me');

         dispatch({
             type: GET_PROFILE,
             payload : res.data
         });

     } catch (error) {
         dispatch({
             type: PROFILE_ERROR,
             payload: { msg : error.response.statusText, status : error.response.status }
         })
     }
 }





 /**
  * Create or update
  * User profile
  * @param {*} formData 
  * @param {*} history 
  * @param {*} edit 
  */
 export const _createProfile = (formData , history , edit= false ) => async dispatch =>{

    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    try {

        const res = await axios.post('api/profile', formData, config );
        //Save and get this profile added/modified
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        //Display alert if is edit or not.
        dispatch(_setAlert((edit ? 'Profile Updated ': 'Profile added' ), 'success'))

        //Redirect 
        if(!edit){
            history.push('/dashboard')
        }

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach(error => {
            dispatch(_setAlert(error.msg, "danger"));
          });
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
 }