import React, { ChangeEventHandler } from "react";

interface IProps {
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const TextInput = ({id, onChange}: IProps) =>
  <input type="text" name={id} id={id}
    autoComplete="off" onChange={onChange} />;

export default TextInput;
