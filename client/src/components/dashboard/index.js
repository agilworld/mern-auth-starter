import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { logoutUser, clearCurrentProfile } from '../../actions/auth';
import { createNotification, pageTitle } from '../../utils/helpers'
import DocumentException from '../common/DocumentException'
import lang from '../../langs'

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        //await this.props.fetchDashboard()
    }

    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();

        createNotification('info', lang('success.logout'))
    }

    render() {
        const { user } = this.props.auth

        if (!user) {
            return null;
        }

        return (
            <DocumentException
                title={pageTitle('Dashboard')}
                className="dashboardPage"
                history={this.props.history}
                url={this.props.location.pathname}>
                <div className="container">
                    <div className="row justify-content-md-center mt-3">
                        <div className="col-sm-12 col-lg-8">
                            <div className="text-center">
                                <h3>Hello, {user.name}</h3>
                            </div>
                            <div className="card bg-secondary text-white mb-3">
                                <h5 className="card-header">My Profile</h5>
                                <div className="card-body">

                                    <h5 className="card-title">{user.name}
                                    </h5>
                                    <p className="card-text">{user.address}</p>
                                    <Link to="/profile" className="btn btn-light outline right-align">Update Profile</Link>

                                </div>
                            </div>

                        </div>
                    </div>


                </div>
            </DocumentException>
        )
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStatetoProps = state => ({
    auth: state.auth,
});

export default connect(mapStatetoProps, { logoutUser, clearCurrentProfile })(Dashboard);