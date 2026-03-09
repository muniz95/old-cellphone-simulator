import React, { ChangeEventHandler } from 'react';
import { UiTextInput } from '@/shared/ui/controls';

interface IProps {
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const TextInput = ({ id, onChange }: IProps) => {
  return (
    <UiTextInput name={id} id={id} autoComplete="off" onChange={onChange} />
  );
};

export default TextInput;
