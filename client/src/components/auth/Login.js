import React ,{Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


const Login = () => {



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




    const handleSubmitForm = async (e) => {
        e.preventDefault();
        
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
                        onChange={e => handleChange(e)}
                    />

                </div>

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={e => handleChange(e)}
                    />

                </div>
              
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>

            <p className="my-1">
                Don't have an account? <Link to="/register">Sign In</Link>
            </p>

        </Fragment>
    )
}



export default Login
