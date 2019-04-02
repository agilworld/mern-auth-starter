import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import classnames from 'classnames'
import _ from 'lodash'
import { saveMerchantToCache } from '../../actions/user';

class CardItemUser extends Component {

    static propTypes = {
        item: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
    };

    gotoEdit(item, evt) {
        evt.preventDefault()
        this.props.saveMerchantToCache(item)
        this.props.history.push("/user/edit/" + item.id + "#" + this.props.location.pathname)
    }

    render() {
        const item = this.props.item
        if (!item) {
            return null
        }

        let badgeClass = 'badge-dark'
        if (item.role.toLowerCase() == 'sales') {
            badgeClass = 'badge-warning'
        } else if (item.role.toLowerCase() == 'manager') {
            badgeClass = 'badge-danger'
        }

        return (
            <a onClick={this.gotoEdit.bind(this, item)}>
                <div className="card mb-3">
                    <div className="card-body" style={{ padding: '0.67rem' }}>
                        <div className="d-flex bd-highlight">
                            <div className="p-1 flex-fill bd-highlight">
                                <h4 className="card-title text-dark">{item.name}</h4>
                                <h5> {item.role && <span className={"badge " + badgeClass}>{item.role}</span>} <small className="py-2 text-danger">{item.phone}</small>
                                </h5>
                                <small className="mb-0 text-muted">Created at {item.join_date.long}</small>
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

export default connect(mapStatetoProps, { saveMerchantToCache })(CardItemUser);