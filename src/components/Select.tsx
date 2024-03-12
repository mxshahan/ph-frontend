import React from "react";
import ReactSelect, { MultiValue, SingleValue } from "react-select";

interface ISelect {
  id: string;
  className?: string;
  label: string;
  options: {
    name: string;
    value: string;
    disabled?: boolean;
  }[];
  readonly?: boolean;
  value?: string | string[];
  onChange: Function;
  textColor?: string;
  multiple?: boolean;
  disabled?: boolean;
}

export function Select({
  id,
  className = "",
  label,
  options,
  value,
  onChange,
  readonly = false,
  textColor = "text-dark-blue",
  multiple = false,
  disabled = false,
}: ISelect) {
  return (
    <div className={className}>
      <label className="text-gray-500  text-sm flex-shrink-0" htmlFor={id}>
        {label}
      </label>
      {!readonly ? (
        <select
          multiple={multiple}
          id={id}
          className="w-full p-2 rounded-md border bg-white"
          value={value}
          onChange={(e) => {
            onChange(e);
          }}
          disabled={disabled}
        >
          {options.map((e, i) => {
            return (
              <option key={i} value={e.value} disabled={e.disabled}>
                {e.name}
              </option>
            );
          })}
        </select>
      ) : (
        <p className={"text-lg " + textColor}>{value}</p>
      )}
    </div>
  );
}

export interface SelectPlusOptionType {
  label: any;
  value: string;
  option?: any;
}

interface ISelectPlus {
  id?: string;
  className?: string;
  label?: React.ReactNode;
  options: SelectPlusOptionType[];
  readonly?: boolean;
  value?: SelectPlusOptionType | SelectPlusOptionType[];
  onChange?: (_e: MultiValue<SelectPlusOptionType> | SingleValue<SelectPlusOptionType>) => void;
  textColor?: string;
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  renderValues?: (_values: SelectPlusOptionType | SelectPlusOptionType[]) => React.ReactNode;
  onSearch?: (_e: string) => void;
  isSearchable?: boolean;
  filterOption?: any;
  loading?: boolean;
}

export function SelectPlus({
  id,
  className = "",
  label,
  options,
  value,
  onChange,
  readonly = false,
  textColor = "text-dark-blue",
  multiple = false,
  disabled = false,
  placeholder,
  renderValues,
  onSearch,
  isSearchable,
  filterOption = undefined,
  loading = false,
}: ISelectPlus) {
  return (
    <div className={className}>
      <label className="text-gray-500  text-sm flex-shrink-0" htmlFor={id}>
        {label}
      </label>
      {!readonly ? (
        <ReactSelect
          isLoading={loading}
          options={options}
          isMulti={multiple}
          id={id}
          value={value}
          onChange={(e) => {
            if (onChange) onChange(e);
          }}
          isDisabled={disabled}
          placeholder={placeholder}
          isClearable={true}
          onInputChange={(e) => {
            if (onSearch) onSearch(e);
          }}
          isSearchable={isSearchable}
          filterOption={filterOption}
        />
      ) : renderValues ? (
        renderValues(value ? value : [])
      ) : value ? (
        Array.isArray(value) ? (
          value.map((v) => <p className={"text-lg " + textColor}>{v.label}</p>)
        ) : (
          <p className={"text-lg " + textColor}>{value.label}</p>
        )
      ) : (
        "-"
      )}
    </div>
  );
}
