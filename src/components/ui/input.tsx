import { Eye, EyeOff, FileUp } from "lucide-react";
import { forwardRef, type InputHTMLAttributes, useRef, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type?: string;
  className?: string;
  accept?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      type = "text",
      className = "",
      accept,
      defaultValue = "",
      disabled = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (inputRef.current) {
        inputRef.current.value = file ? file.name : "";
      }

      if (onChange) {
        onChange(e);
      }
    };

    const isFileInput = type === "file";
    const isPasswordInput = type === "password";

    return (
      <label className={`relative block ${className}`}>
        <input
          type={isFileInput || showPassword ? "text" : type}
          id={`${name}${isFileInput ? "-url" : ""}`}
          name={`${name}${isFileInput ? "-url" : ""}`}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={isFileInput || isPasswordInput ? undefined : onChange}
          placeholder=" "
          className="peer block w-full appearance-none rounded-md border border-neutral-200 px-4 pb-1.5 pt-5 text-sm font-semibold placeholder:text-transparent focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black disabled:border-white disabled:bg-white disabled:pb-3.5 disabled:pt-3 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-white dark:disabled:border-neutral-800 dark:disabled:bg-neutral-900"
          ref={ref ?? inputRef}
          {...props}
        />

        <span className="absolute left-0 top-0 origin-left -translate-y-2 px-4 py-3 text-sm font-semibold opacity-60 duration-200 ease-in-out peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-2 peer-disabled:hidden">
          {label}
        </span>
        {disabled && <span className="sr-only">{label}</span>}

        {isFileInput && (
          <>
            <button
              type="button"
              aria-label="Upload file"
              className="absolute right-4 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center"
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              <FileUp className="size-6 opacity-60" />
            </button>
            <input
              type="file"
              name={name}
              id={name}
              className="hidden"
              ref={fileInputRef}
              accept={accept}
              onChange={handleFileChange}
            />
          </>
        )}

        {isPasswordInput && (
          <button
            type="button"
            aria-label="Toggle password visibility"
            className="absolute right-4 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="size-6 opacity-60" />
            ) : (
              <Eye className="size-6 opacity-60" />
            )}
          </button>
        )}
      </label>
    );
  }
);

Input.displayName = "Input";

export { Input };
