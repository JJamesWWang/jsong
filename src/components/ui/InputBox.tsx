import React, { useRef, useState } from "react";
import styles from "./InputBox.module.css";

type InputBoxProps = {
  name: string;
  size?: number;
  label?: string;
  error?: string;
  validator?: (value: string) => boolean;
  onSubmit?: (text: string) => void;
};

function InputBox(props: InputBoxProps) {
  const [isDirty, setIsDirty] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const validate = props.validator || ((value: string) => value.length > 0);

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setIsValid(validate(value));
    setIsDirty(true);
  }

  function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (props.onSubmit && inputRef.current) {
      if (validate(inputRef.current.value)) {
        props.onSubmit(inputRef.current.value);
        inputRef.current.value = "";
      } else {
        setIsValid(false);
      }
    }
  }

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form name={props.name} onSubmit={onFormSubmit} className={styles.InputBox}>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <input
        ref={inputRef}
        type="text"
        name={props.name}
        size={props.size || 32}
        onChange={onInputChange}
      ></input>
      {isDirty && !isValid && props.error && <p>{props.error}</p>}
    </form>
  );
}

export default InputBox;
