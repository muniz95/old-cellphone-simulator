import React, { ChangeEventHandler } from 'react';

interface IProps {
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const TextInput = ({ id, onChange }: IProps) => (
  <input type="text" name={id} id={id} autoComplete="off" onChange={onChange} />
);

export default TextInput;
