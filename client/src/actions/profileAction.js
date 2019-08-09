import axios from "axios";
import { _setAlert } from './alertAction';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED, GET_PROFILES, GET_REPOS } from "./types";
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
 };





/**
* Get all Profile
* access public
*/
export const _getProfiles = () => async dispatch => {

    dispatch({ type: CLEAR_PROFILE })

    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
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

};




/**
 * Delete experience
 * @param {*} experienceID 
 */
export const _deleteExperience = experienceID => async dispatch =>{

    try {
        const res = await axios.delete(`api/profile/experience/${experienceID} `);

        dispatch({
            type: UPDATE_PROFILE,
            payload:res.data
        });

        dispatch(_setAlert('Experience removed', 'success'));

    } catch (err) {
            console.log(err)

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

};


/**
 * Detele education
 * @param {*} educationID 
 */
export const _deleteEducation = educationID => async dispatch => {

    try {
        const res = await axios.delete(`api/profile/education/${educationID} `);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(_setAlert('Education removed', 'success'));

    } catch (err) {
        console.log(err)

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

};





/**
 * Delete profile
 */
export const _deleteAccount = ()=> async dispatch => {

    if(window.confirm('Are you sure? This can not restore')) {

        try {
            const res = await axios.delete(`api/profile `);

            dispatch({ type: CLEAR_PROFILE });    // => profile reducer
            dispatch({ type: ACCOUNT_DELETED }); // => auth reducer


            dispatch(_setAlert('Account removed', 'success'));

        } catch (err) {
            console.log(err)
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }

};




/**
* Get a profile
* by user id
*/
export const _getProfileById = userID => async dispatch => {


    try {
        const res = await axios.get(`api/profile/user/${userID}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
};



/**
* Get a profile
* 
*/
export const _getGithubRepo = username => async dispatch => {


    try {
        const res = await axios.get(`api/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });

        dispatch(_setAlert(error.response.data, 'danger'));



    }
}