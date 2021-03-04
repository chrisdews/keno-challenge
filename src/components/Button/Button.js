import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'


const Button = ({children, className, onClick}) => {
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
};


Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.any
};


export default Button;
