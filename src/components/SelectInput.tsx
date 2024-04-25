import React from "react";
import Select, { type SelectInstance, type StylesConfig } from "react-select";

interface SelectOption {
  value: number;
  label: string;
}

interface SelectInputProps {
  inputId: string;
  label: string;
  options: SelectOption[];
  defaultValue?: SelectOption;
  onMenuOpen: () => void;
  menuIsOpen: boolean;
}

const selectStyles: StylesConfig<SelectOption, false> = {
  control: (base) => ({
    ...base,
    border: "none",
    padding: 0,
    margin: 0,
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 0 0 14px",
    margin: 0,
  }),
  indicatorsContainer: (base) => ({
    ...base,
    display: "none",
  }),
  input: (base) => ({
    ...base,
    padding: 0,
    margin: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#e4e4e7"
      : state.isFocused
        ? "#f4f4f5"
        : "inherit",
    color: "black",
  }),
};

const SelectInput = React.forwardRef<
  SelectInstance<SelectOption>,
  SelectInputProps
>((props, ref) => {
  return (
    <div className="select-item">
      <label htmlFor={props.inputId}>{props.label}</label>
      <Select
        inputId={props.inputId}
        ref={ref}
        menuIsOpen={props.menuIsOpen}
        options={props.options}
        defaultValue={props.defaultValue}
        styles={selectStyles}
        components={{
          DropdownIndicator: () => null,
          Control(value) {
            return (
              <div className="control" onClick={value.selectProps.onMenuOpen}>
                <div className="value">{value.children}</div>
              </div>
            );
          },
        }}
      />
    </div>
  );
});

export default SelectInput;
