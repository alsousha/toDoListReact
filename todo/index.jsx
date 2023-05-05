import React from 'react';
import  from 'classnames';

import './Badge.scss';

const Badge = ({ color, onClick, className }) => (
  <i
    onClick={onClick}
    className={('badge', { [`badge--${color}`]: color }, className)}
  ></i>
);

export default Badge;
