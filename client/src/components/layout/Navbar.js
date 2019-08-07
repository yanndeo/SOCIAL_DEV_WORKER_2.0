import React, { Fragment} from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//Actions
import { _logout } from '../../actions/authAction';



const Navbar = ({ auth: { isAuthenticated, loading} , _logout }) => {

    console.log("isAuthenticated", isAuthenticated);  


    //On Auth 
    const authLinks =  (
        <ul>
          
            <li>
                <a href="#!" onClick={_logout} >
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="hide-sm"> Logout </span>
                </a>
            </li>
        </ul>

    );

    // On not Auth
    const gestLinks = (
        <ul>
            <li><Link to="#!">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login"> Login</Link></li>
        </ul>
    );




    
    return (
        <nav className="navbar bg-dark">

            <h1>
                <Link to="/"><i className="fas fa-code"></i> SocialDevWeb II</Link>
            </h1>

            {!loading ? (<Fragment>{isAuthenticated ? authLinks : gestLinks} </Fragment>) : gestLinks }


           
        </nav>
    );
}


Navbar.propTypes = {
    _logout : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    auth: state.authReducer
});




export default connect(mapStateToProps, { _logout })(Navbar);
