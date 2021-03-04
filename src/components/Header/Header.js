import React from "react";
import PropTypes from "prop-types";
import './Header.css'

const Header = ({ titleText }) => {
  return <div className="header">{titleText}</div>;
};

Header.propTypes = {
  titleText: PropTypes.string,
};

export default Header;
