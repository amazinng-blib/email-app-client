import React from 'react';
import { FaCircleNotch } from 'react-icons/fa';

interface ButtonProps {
  variant?: 'primary' | 'destructive';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  type?: 'submit' | 'button';
  className?: string;
  isLoading?: boolean;
  disabled?: boolean; // Added disabled prop
}

const Button: React.FC<ButtonProps> = ({
  variant,
  onClick,
  children,
  type,
  className,
  isLoading,
  disabled, // Added disabled prop
}) => {
  const getColor = () => {
    switch (variant) {
      case 'destructive':
        return 'red';
      case 'primary':
        return 'blue';
      default:
        return 'white';
    }
  };

  return (
    <button
      type={type}
      style={{
        backgroundColor: `${!variant ? '' : getColor()}`,
        border: `2px solid ${getColor()}`,
      }}
      onClick={!isLoading ? onClick : undefined}
      className={`rounded-[50px] px-12 py-2 focus:outline-none text-[#fff] ${className} flex justify-center items-center m-auto `}
      disabled={disabled || isLoading}
    >
      {children}
      {isLoading && <FaCircleNotch className="ml-3 animate-spin" />}
    </button>
  );
};

export default Button;
