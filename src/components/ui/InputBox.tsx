import React from "react";

type InputBoxProps = {
  name: string;
  label?: string;
  validator?: (value: string) => boolean;
  onSubmit: (text: string) => void;
};

function InputBox(props: InputBoxProps) {
  function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validator = props.validator || ((value: string) => value.length > 0);
    if (inputRef.current && validator(inputRef.current.value)) {
      props.onSubmit(inputRef.current.value);
      inputRef.current.value = "";
    }
  }

  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={onFormSubmit}>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <input ref={inputRef} type="text" name={props.name}></input>
    </form>
  );
}

export default InputBox;
