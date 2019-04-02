import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import classnames from 'classnames'
import _ from 'lodash'
import { saveMerchantToCache } from '../../actions/mechant';

class CardItem extends Component {

    static propTypes = {
        item: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
    };

    gotoDetail(item, evt) {
        evt.preventDefault()
        this.props.saveMerchantToCache(item)
        this.props.history.push("/merchants/detail/" + item.id + "#" + this.props.location.pathname)
    }

    render() {
        const item = this.props.item
        if (!item) {
            return null
        }

        return (
            <a key={item.number} onClick={this.gotoDetail.bind(this, item)}>
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="d-flex bd-highlight">
                            <div className="p-1 flex-grow bd-highlight mr-3">
                                <h1> <span className="badge badge-danger">{_.toUpper(item.name.charAt(0))}</span> </h1>
                                <p className="text-success">{item.number}</p>
                            </div>
                            <div className="p-1 flex-fill bd-highlight">
                                <h4 className="card-title text-dark">{item.name}</h4>
                                <h6> {item.merchant_type && <span className="badge badge-dark">{item.merchant_type.name}</span>} <small className="py-2 text-muted">{item.location}</small>
                                </h6>
                                <p className="mb-0 font-weight-bold">Saldo : {item.saldo.total_currency}</p>
                                <small className="mb-0 text-muted">Join date : {item.join_date.long}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        )

        return null;
    }
}

const mapStatetoProps = state => ({
    loadingRequest: state.loadingRequest,
});

export default connect(mapStatetoProps, { saveMerchantToCache })(CardItem);