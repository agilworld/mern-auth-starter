import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import _ from 'lodash'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { fetchProfile } from '../../actions/profile'
import { updateProfileValidate } from '../../validations/user'
import { createNotification, pageTitle } from '../../utils/helpers'
import DocumentException from '../common/DocumentException'

class UpdateProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            address: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.profile !== null) {
            return {
                name: prevState.name,
                email: prevState.email,
                address: prevState.address
            }
        }

        return null
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.profile && prevProps.profile !== this.props.profile) {

            this.setState({
                name: this.props.profile.user.name,
                email: this.props.profile.user.email,
                address: this.props.profile.user.address
            })
        }

        //this.forceUpdate()
    }

    async componentDidMount() {
        await this.props.fetchProfile()
    }

    async onSubmit(e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            address: this.state.address,
            name: this.state.name
        };

        try {
            await updateProfileValidate(userData)
        } catch (err) {
            this.setState({ errors: err })
            createNotification('error', _.map(err, (val) => { return val }).join("\n\n\n"))
            return false;
        }

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const profile = this.props.profile
        const errors = this.props.errors

        return (
            <DocumentException
                title={pageTitle('Update Profile')}
                className="profilePage"
                history={this.props.history}
                url={this.props.location.pathname}>
                <div className="container">
                    <div className="row justify-content-md-center mt-3">
                        <div className="col-sm-12 col-lg-8">
                            <div className="text-center">
                                <h3>My Profile</h3>
                            </div>

                            <form noValidate>
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
                                        name="email"
                                        id="email"
                                        placeholder="Email Address"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.email
                                        })}
                                        onChange={this.onChange}
                                        value={this.state.email}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}.</div>}
                                </div>

                                <div className="form-label-group mb-4">
                                    <textarea
                                        name="address"
                                        id="address"
                                        placeholder="Email Address"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.address
                                        })}
                                        onChange={this.onChange}
                                        value={this.state.address}
                                    >
                                    </textarea>
                                    {errors.address && <div className="invalid-feedback">{errors.address}.</div>}
                                </div>


                                <button type="button" id="registerSubmit" disabled={this.props.loaded ? true : false} onClick={this.onSubmit} className="btn btn-danger btn-block btn-lg">{this.props.loaded ? 'Loading...' : 'Update Profile'}</button>


                            </form>

                        </div>
                    </div>


                </div>
            </DocumentException>
        )
    }
}

UpdateProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object,
    errors: PropTypes.object
};

const mapStatetoProps = state => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStatetoProps, { fetchProfile })(UpdateProfile);