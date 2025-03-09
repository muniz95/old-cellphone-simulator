import React, { ChangeEvent } from 'react';

interface TextInputProps {
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ id, onChange }) => {
  return <input type="text" id={id} onChange={onChange} />;
};

export default TextInput;
