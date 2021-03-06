import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
//Action
import { _setAlert } from '../../actions/alertAction';
import { _register } from '../../actions/authAction';





const Register = ({ _setAlert, _register, isAuthenticated }) => {

/**
 * State
 * Hook
 * And default value
 */
const [stateFormdata , setStateFormData] =  useState({
    name:'',
    email:'',
    password:'',
    password2:''
});


const { name, email, password, password2} = stateFormdata;

/**
 * call it 
 * on change 
 * event inout
 * @param {*} e 
 */
const handleChange = e =>{
    setStateFormData({
        ...stateFormdata,
        [e.target.name]: e.target.value
    })
}



/**
 * 
 * @param {*} e 
 */
const handleSubmitForm = async(e) =>{
    e.preventDefault();

    if(password !== password2){
        //Call action redux to add alert msg into store
        _setAlert('Password not match..', 'danger');
    }else{
        //Call action redux to register user and generate us token
        _register({name, email, password});
        console.log('data-submit', 'SUCCESS')

    }
}



    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>

            <h1 className="large text-primary">Sign Up</h1>
            
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

            <form className="form" onSubmit= {e => handleSubmitForm(e)}  noValidate>

                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Name"
                        name="name" 
                        required 
                        value={name}
                        onChange={e => handleChange(e)}  />
                </div>

                <div className="form-group">

                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email"
                        value= {email}
                        onChange={e => handleChange(e)}  />

                    <small className="form-text">
                         This site uses Gravatar so if you want a profile image, use a
                        Gravatar email
                    </small>
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={e => handleChange(e)} />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        value={password2}
                        onChange={e => handleChange(e)}  />
                </div>

                <input type="submit" className="btn btn-primary" value="Register" />

            </form>

            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>

        </Fragment>

    )
}




//
Register.propTypes = {
  _setAlert: PropTypes.func.isRequired,
  _register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

//
const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { _setAlert, _register})(Register)






/**
 * JSON.stringify(obj)
 * 
 * Transforme l'objet obj en paramètre en une chaîne de caractères au format JSON.
 * La chaîne retournée est optimisée pour réduire sa taille au minimum possible.
 * Equivalent en PHP à json_encode() :  Retourne la chaîne JSON equivalente à un objet.
 * 
 * 
 * L'étape inverse, permettant le passage d'une chaîne à la création de son objet, est réalisée par parse().
 */