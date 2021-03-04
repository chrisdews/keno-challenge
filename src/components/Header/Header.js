import React from "react";
import PropTypes from "prop-types";
import './Header.css'

const Header = ({ children }) => {
  return <div className="header">{children}</div>;
};

Header.propTypes = {
  children: PropTypes.any,
};

export default Header;
