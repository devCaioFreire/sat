
interface InputProps {
  label?: string;
  className: string;
  isAllowed: boolean;
  placeholder: string;
}

export const Input = ({ label, className, isAllowed, placeholder }: InputProps) => {
  return (
    <input type="text" className={className} placeholder={placeholder} />
  )
}