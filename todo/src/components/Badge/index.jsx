import React from 'react';
import './Badge.scss';

const Badge = ({ color, onClick, className }) => 
	(
  <i
    onClick={onClick}
    className= {'badge ' + [`badge--${color} + ${className? className :""}`]}
  ></i>
);

export default Badge;
