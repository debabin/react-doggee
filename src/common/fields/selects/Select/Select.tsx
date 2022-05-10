import React from 'react';

import inputStyles from '../../inputs/input.module.css';
import selectStyles from './Select.module.css';

import { useSelect } from './hooks/useSelect';

export interface SelectProps extends Omit<FieldProps, 'value' | 'onChange'> {
  options: Option[];
  value: Option | null;
  onChange: (option: Option) => void;
  filterOption?: FilterOptionFunc;
  components?: {
    Option?: React.ComponentType<{ option: Option }>;
    SelectedValue?: React.ComponentType<{ option: Option }>;
  };
}

const defaultFilterOption: FilterOptionFunc = (option, inputValue) =>
  option.label.toLowerCase().includes(inputValue.toLowerCase());

export const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  value,
  filterOption = defaultFilterOption,
  components,
  disabled,
  loading,
  isError = false,
  helperText,
  ...props
}) => {
  const { refs, functions, state } = useSelect({
    options,
    filterOption,
    value,
    onChange
  });

  const showValidationMessage = !state.showOptions && isError && !!helperText;
  const showOption = !!value;

  const optionItems = state.filteredOptions.map((option) => {
    const isSelected = state.searchSelectedOption.id === option.id;

    return (
      <li
        key={option.id}
        role='option'
        aria-selected={value?.id === option.id}
        aria-hidden='true'
        className={`${selectStyles.option_container} ${
          isSelected ? selectStyles.selected_option_container : ''
        }`}
        onClick={() => functions.onOptionClick(option)}
      >
        {components?.Option ? <components.Option option={option} /> : option.label}
      </li>
    );
  });

  const SelectIcon = React.useCallback(
    () => (
      <div
        aria-hidden='true'
        role='button'
        style={{ transform: state.showOptions ? 'rotate(180deg)' : 'rotate(0)' }}
      >
        <div className={selectStyles.select_icon} />
      </div>
    ),
    [state.showOptions]
  );

  return (
    <div
      aria-hidden
      className={selectStyles.date_input_container}
      ref={refs.selectRef}
      onKeyDown={functions.onSelectKeyDown}
    >
      <div
        aria-hidden='true'
        onClick={() => {
          if (disabled || loading || state.showOptions) return;
          functions.onSelectClick();
        }}
        className={`${isError ? inputStyles.input_error : ''} ${inputStyles.field_container}`}
      >
        <div aria-hidden='true' className={`${inputStyles.input_container}`}>
          <input
            autoComplete='off'
            type='text'
            disabled={disabled}
            className={selectStyles.input}
            ref={refs.inputRef}
            value={state.inputValue}
            onChange={functions.searchInputHandler}
          />
          {showOption && (
            <div className={selectStyles.option_label}>
              {components?.SelectedValue ? (
                <components.SelectedValue option={value} />
              ) : (
                value.label
              )}
            </div>
          )}
          <label htmlFor={props.id} className={selectStyles.input_label}>
            {props.label}
          </label>
        </div>

        <div className={inputStyles.indicator_container}>
          <SelectIcon />
        </div>
      </div>
      {state.showOptions && (
        <div className={selectStyles.options_container}>
          <ul ref={refs.ulRef} className={selectStyles.select_options_container}>
            {!state.filteredOptions.length && <div>no options</div>}
            {optionItems}
          </ul>
        </div>
      )}
      {showValidationMessage && <div className={inputStyles.helper_text}>{helperText}</div>}
    </div>
  );
};
