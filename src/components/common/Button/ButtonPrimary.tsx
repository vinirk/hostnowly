import React from 'react';
import Button, { ButtonProps } from './Button';

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = '',
  ...args
}) => {
  return (
    <Button
      className={`disabled:bg-opacity-70 bg-primary-600 hover:bg-primary-700 text-neutral-50 ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
