import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Document from '../layout/Document'
import Spinner from '../ui/Spinner'

class DocumentException extends Component {

    static propTypes = {
        url: PropTypes.string.isRequired,
        history: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        className: PropTypes.string.isRequired,
        children: PropTypes.element.isRequired,
    };

    static defaultProps = {
        url: '',
        history: null,
        className: ""
    }
    onRefresh() {
        // this.props.history.pushState({''})
        this.props.history.go(0)
    }

    render() {
        if (this.props.loading.status == 'start') {
            return <Spinner />
        } else if (this.props.loading.status == 'complete') {
            return (
                <Document title={this.props.title} className={this.props.className}>
                    {this.props.children && React.Children.only(this.props.children)}
                </Document>
            )
        } else if (this.props.loading.status == 'error') {
            return (
                <Document title={this.props.title} className={this.props.className}>

                    <div className="exception-container">
                        <div className="container">
                            <div className="row align-items-center text-center">
                                <div className="col">
                                    <h4>
                                        {this.props.loading.data.message ?
                                            this.props.loading.data.message : 'Error Network Connection'}</h4> <br />
                                    {this.props.url && <button type="button" className="btn btn-dark" onClick={this.onRefresh.bind(this)}>Refresh</button>}
                                </div>

                            </div>
                        </div>
                    </div>
                </Document>
            )
        }

        return null;
    }
}

const mapStatetoProps = state => ({
    loading: state.loadingRequest,
});


export default connect(mapStatetoProps)(DocumentException);