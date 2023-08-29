
interface InputProps {
  label?: string;
  className: string;
  isNotAllowed?: boolean;
  placeholder: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  max?: number;
}

export const InputText = ({ className, isNotAllowed, placeholder, value, onChange }: InputProps) => {
  return (
    <input
      type="text"
      className={className}
      placeholder={placeholder}
      disabled={isNotAllowed}
      value={value}
      onChange={onChange}
    />
  )
}

export const InputNumber = ({ className, isNotAllowed, placeholder, value, onChange, max }: InputProps) => {
  return (
    <input
      type="number"
      className={className}
      placeholder={placeholder}
      disabled={isNotAllowed}
      value={value}
      onChange={onChange}
      maxLength={max}
    />
  )
}