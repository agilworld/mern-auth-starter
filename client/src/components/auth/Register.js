import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import lang from '../../langs'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/auth';
import { registerValidate } from '../../validations/authValidate';
import { createNotification, pageTitle, encapsulateErrors } from '../../utils/helpers'
import Document from '../layout/Document'
import logo from '../../img/logo.png'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    async onSubmit(e) {
        e.preventDefault();
        const userData = {
            email: this.state.username,
            password: this.state.password,
            password2: this.state.password2,
            name: this.state.name
        };

        try {
            await registerValidate(userData)
        } catch (err) {
            this.setState({ errors: err })
            createNotification('error', _.map(err, (val) => { return val }).join("\n\n\n"))
            return false;
        }

        this.props.registerUser(userData)
            .then(res => {
                createNotification('success', lang('success.register'))
                this.props.history.push("/")
            })
            .catch(err => {
                const error = this.props.errors
                if (error && typeof error == 'object') {
                    if (_.has(error, 'status') && (error.status === 400 ||
                        error.status === 401 ||
                        error.status === 403 ||
                        error.status === 422)) {
                        createNotification('warning', encapsulateErrors(error.data))
                    } else {
                        createNotification('error', lang('error.server_unknown'))
                    }
                } else {
                    createNotification('error', lang('error.server_unknown'))
                }

            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;
        return (
            <Document title={pageTitle("Login")} className="pageLogin">
                <div id="bodyLogin">
                    <div className="align-self-center text-center mb-4">
                        <img src={logo} width="150" alt="Logo" />
                    </div>

                    <div className="shadow-sm p-4 mb-5 bg-white rounded">

                        <div className="col align-self-center w-auto-xs mb-3">
                            <div className="text-color">
                                <div className="text-uppercase text-muted text-center mb-4 text-sm">
                                    Register New User
                                </div>

                                <form name="formLogin" noValidate>
                                    <div className="form-label-group mb-4">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Enter Full Name"
                                            className={classnames('form-control form-control-lg', {
                                                'is-invalid': errors.name
                                            })}
                                            onChange={this.onChange}
                                            value={this.state.name}
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.name}.</div>}
                                    </div>

                                    <div className="form-label-group mb-4">
                                        <input
                                            type="email"
                                            name="username"
                                            id="email"
                                            placeholder="Email Address"
                                            className={classnames('form-control form-control-lg', {
                                                'is-invalid': errors.username
                                            })}
                                            onChange={this.onChange}
                                            value={this.state.username}
                                        />
                                        {errors.username && <div className="invalid-feedback">{errors.username}.</div>}
                                    </div>

                                    <div className="form-label-group mb-4">
                                        <input
                                            type="password"
                                            name="password"
                                            className={classnames('form-control form-control-lg', {
                                                'is-invalid': errors.password
                                            })}
                                            placeholder="Password"
                                            onChange={this.onChange}
                                            value={this.state.password}
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password}.</div>}
                                    </div>

                                    <div className="form-label-group mb-4">
                                        <input
                                            type="password"
                                            name="password2"
                                            className={classnames('form-control form-control-lg', {
                                                'is-invalid': errors.confirm_password
                                            })}
                                            placeholder="Enter Confirmation Password"
                                            onChange={this.onChange}
                                            value={this.state.password2}
                                        />
                                        {errors.confirm_password && <div className="invalid-feedback">{errors.confirm_password}.</div>}
                                    </div>

                                    <button type="button" id="registerSubmit" disabled={this.props.loaded ? true : false} onClick={this.onSubmit} className="btn btn-danger btn-block btn-lg">{this.props.loaded ? 'Loading...' : 'Register'}</button>

                                    <div className="text-center mt-3">
                                        <Link to="/">Back to Login</Link>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Document>
        )
    }
}

Register.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    loaded: state.loadingBar.sectionBar === 1 ? true : false
});

export default connect(mapStateToProps, { registerUser })(Register);

