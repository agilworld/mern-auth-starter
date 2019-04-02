import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'

class Cardbox extends Component {

    static propTypes = {
        rounded: PropTypes.bool,
        shadowSize: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']).isRequired,
        padding: PropTypes.oneOf(['2', '3', '4', '5']),
        className: PropTypes.string,
        children: PropTypes.element.isRequired,
    };

    static defaultProps = {
        rounded: true,
        shadowSize: 'sm',
        padding: '3'
    }

    render() {
        const shadowClass = this.props.shadowSize == 'md' ? 'shadow' : 'shadow-' + this.props.shadowSize
        const paddingClass = 'p-' + this.props.padding

        if (this.props.children) {
            return (
                <div className={classnames('bg-white ' + shadowClass + " " + paddingClass, {
                    'rounded': this.props.rounded,

                })}>
                    {React.Children.only(this.props.children)}
                </div>
            )
        }

        return null;
    }
}

export default Cardbox;