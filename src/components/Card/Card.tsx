import React from "react";
import './Card.css';

interface CardProps {
    component: React.ReactNode;
} 

const Card = ({component}: CardProps) => {
  return <div className="cardContainer">{component}</div>;
};

export default Card;
