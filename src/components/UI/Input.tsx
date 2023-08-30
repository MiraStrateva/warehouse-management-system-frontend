import React, { forwardRef, PropsWithChildren } from "react";

interface Props {
  class: string;
  isValid: boolean;
  id: string;
  type: string;
  name: string;
  required: boolean;
  title: string;
  message: string;
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <div className={props.class}>
      <label htmlFor={props.id}>{props.title}</label>
      <input 
        id={props.id}
        type={props.type}
        name={props.name}
        ref={ref}
        required={props.required}
      />
      {!props.isValid && <p>{props.message}</p>}
    </div>
  );
});

export default Input;
