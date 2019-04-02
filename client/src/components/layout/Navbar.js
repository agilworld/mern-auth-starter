import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { logoutUser, clearCurrentProfile } from '../../actions/auth';
import { createNotification } from '../../utils/helpers'
import _ from 'lodash'
import lang from '../../langs'
import logo from '../../img/logo.png'
import { MdKeyboardBackspace, MdHome, MdExitToApp } from "react-icons/md";

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();

        createNotification('info', lang('success.logout'))
    }

    render() {
        const merchants = this.props.merchants
        let backto = null
        if (this.props.location.pathname != '/dashboard') {
            backto = this.props.location.hash ? _.trimStart(this.props.location.hash, "#") : '/dashboard'
        }

        return (
            <nav className="navbar sticky-top fixed-top navbar-light bg-light">
                {backto === null && <Link to="/dashboard" className="navbar-brand">
                    <img src={logo} width="80" alt="Logo" />
                </Link>}

                {backto && <Link to={backto}>
                    <MdKeyboardBackspace color="black" size="1.5em" />
                </Link>}

                {backto && <Link to="/dashboard">
                    <MdHome color="black" size="1.5em" />
                </Link>}

                {backto === null && <button type="button" onClick={this.onLogoutClick.bind(this)} className="nav-link btn btn-link">
                    <MdExitToApp size="1.5em" color="red" />
                </button>}

            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};


const mapStatetoProps = state => ({
    auth: state.auth,
});

export default connect(mapStatetoProps, { logoutUser, clearCurrentProfile })(Navbar);