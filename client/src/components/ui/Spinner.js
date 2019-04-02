import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'
import { connect } from 'react-redux'

const initialState = {
    percent: 0,
    status: 'hidden',
}

class Spinner extends Component {
    state = { ...initialState }
    render() {
        if (this.props.loading.status == 'start') {
            return (
                <div className="spinner-container">
                    <div className="container">
                        <div className="row align-items-center text-center">
                            <div className="col">
                                <div className="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }

        return null;
    }
}

const mapStatetoProps = state => ({
    loading: state.loadingRequest,
});


export default connect(mapStatetoProps)(Spinner);