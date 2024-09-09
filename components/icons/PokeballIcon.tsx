import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
}

const PokeballIcon: React.FC<IconProps> = ({ size = 64, color = 'black' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill={color}
  >
    <circle
      cx="50"
      cy="50"
      r="45"
      stroke="black"
      strokeWidth="5"
      fill="white"
    />
    <path d="M5 50 h90" stroke="black" strokeWidth="5" />
    <circle
      cx="50"
      cy="50"
      r="20"
      fill="white"
      stroke="black"
      strokeWidth="5"
    />
    <circle cx="50" cy="50" r="10" fill="black" />
  </svg>
);

export default PokeballIcon;
