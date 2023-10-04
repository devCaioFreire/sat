import { ReactNode } from 'react';

interface IconButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  title?: string;
  className?: string;
}

export const IconButton = ({ onClick, children, title, className }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`bg-transparent border-none px-2 hover:bg-backgroundFields hover:rounded ${className}`}>
      {children}
    </button>
  );
};