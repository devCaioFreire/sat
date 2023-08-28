
interface InputProps {
  label?: string;
  className: string;
  isAllowed: boolean;
  placeholder: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  max?: number;
}

export const InputText = ({ label, className, isAllowed, placeholder, value, onChange }: InputProps) => {
  return (
    <input
      type="text"
      className={className}
      placeholder={placeholder}
      disabled={isAllowed}
      value={value}
      onChange={onChange}
    />
  )
}

export const InputNumber = ({ className, isAllowed, placeholder, value, onChange, max }: InputProps) => {
  return (
    <input
      type="number"
      className={className}
      placeholder={placeholder}
      disabled={isAllowed}
      value={value}
      onChange={onChange}
      maxLength={max}
    />
  )
}