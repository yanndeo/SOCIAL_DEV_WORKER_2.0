import axios from "axios";
import { _setAlert } from './alertAction';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from "./types";
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
 };




/**
 * Add a Experience
 * to the profile
 * @param {*} formDataExperience 
 * @param {*} history 
 */
 export const _addExperience = (formDataExperience , history)=> async dispatch =>{

     const config = {
         headers: {
             'Content-Type': 'application/json'
         }
     }

    try {
        
        const res = await axios.put("/api/profile/experience", formDataExperience, config );

        dispatch({
            type: UPDATE_PROFILE,
            payload : res.data
        });

        dispatch(_setAlert('Experience added', 'success'));

        history.push('/dashboard');


    } catch (err) {
        const errors = err.response.data.errors;

        if (errors){
            errors.forEach(error =>{
                dispatch(_setAlert(error.msg , "danger") )
            })
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

 }






 /**
  * Add Education 
  * to the profile
  * @param {*} formDataEducation 
  * @param {*} history 
  */
export const _addEducation = (formDataEducation, history) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {

        const res = await axios.put("/api/profile/education", formDataEducation, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(_setAlert('Education added', 'success'));

        history.push('/dashboard');


    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => {
                dispatch(_setAlert(error.msg, "danger"))
            })
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

}