interface TextInputProps {
  name: string;
  label: string;
  type?: string;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  name,
  label,
  type = "text",
  className = "",
  defaultValue = "",
  disabled = false,
  onChange,
}: TextInputProps) {
  return (
    <label htmlFor={name} className={`input-wrap ${className}`}>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
        placeholder=" "
      />
      <span className="label">{label}</span>
    </label>
  );
}
