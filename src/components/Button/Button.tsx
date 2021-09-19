import React from "react";
import "./Button.css";

interface ButtonProps {
  label: string;
  action: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <button className="btn" onClick={props.action}>
      {props.label}
    </button>
  );
};

export default Button;
