import React from 'react';
import PropTypes from 'prop-types';

const Header = ({titleText}) => {
    return (
        <div>
            {titleText}
        </div>
    );
};

Header.propTypes = {
    titleText: PropTypes.string
};


export default Header;
