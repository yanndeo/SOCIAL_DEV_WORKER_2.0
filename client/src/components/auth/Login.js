import React ,{Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { _loginUser } from '../../actions/authAction';


const Login = ({ _loginUser, isAuthenticated}) => {



    /**
     * State
     * Hook
     * And default value
     */
    const [stateFormdata, setStateFormData] = useState({
        email: '',
        password: '',
    });


    const { email, password } = stateFormdata;

    /**
     * call it 
     * on change 
     * event inout
     * @param {*} e 
     */
    const handleChange = e => {
        setStateFormData({
            ...stateFormdata,
            [e.target.name]: e.target.value
        })
    }



    /**
     * 
     * @param {*} e 
     */
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        _loginUser(email, password)
        
    };

    if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }




    return (


        <Fragment>

            <h1 className="large text-primary">Sign In</h1>

            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>

            <form className="form" onSubmit={e => handleSubmitForm(e)}>
                
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => handleChange(e)} />

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
              
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>

            <p className="my-1">
                Don't have an account? <Link to="/register">Sign In</Link>
            </p>

        </Fragment>
    )
}

Login.propTypes = {
  _loginUser: PropTypes.func.isRequired,
  isAuthenticated:  PropTypes.bool,
};


const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps,{_loginUser} )(Login)
