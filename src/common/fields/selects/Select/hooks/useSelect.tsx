import React from 'react';

import { useOnClickOutside } from '@utils/hooks';

interface UseSelectParams {
  options: Option[];
  filterOption: FilterOptionFunc;
  value: Option | null;
  onChange: (option: Option) => void;
}

export const useSelect = ({ options, value, onChange, filterOption }: UseSelectParams) => {
  const [inputValue, setInputValue] = React.useState('');
  const selectRef = React.useRef<HTMLInputElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const ulRef = React.useRef<HTMLUListElement>(null);

  const [showOptions, setShowOptions] = React.useState(false);

  const [searchSelectedOption, setSearchSelectedOption] = React.useState({
    index: options?.findIndex((option) => option.id === value?.id),
    id: value?.id
  });

  const filteredOptions = React.useMemo(
    () => options?.filter((option) => filterOption(option, inputValue)),
    [options, inputValue]
  );

  // When filtering, changing the index of the selected option
  React.useEffect(() => {
    if (!filteredOptions.length) return;
    const searchOption = filteredOptions.find((option) => searchSelectedOption.id === option.id);
    if (!searchOption) return setSearchSelectedOption({ index: 0, id: filteredOptions[0].id });

    setSearchSelectedOption({
      id: searchOption.id,
      index: filteredOptions.findIndex((option) => option.id === searchOption.id)
    });
  }, [filteredOptions]);

  // Reset input statement (focus, value)
  const resetInput = () => {
    if (inputRef.current) inputRef.current.blur();
    setInputValue('');
  };

  // Click outside select
  useOnClickOutside(
    selectRef,
    () => {
      setShowOptions(false);
      const selectedOptionIndex = options.findIndex((el) => el.id === value?.id);
      setSearchSelectedOption({ index: selectedOptionIndex, id: value?.id });
      resetInput();
    },
    [value]
  );

  // Scroll to selected option on open and reselect and key up/down
  React.useLayoutEffect(() => {
    if (ulRef.current && searchSelectedOption) {
      const optionHeight = ulRef.current.scrollHeight / options.length;
      ulRef.current.scrollTop = optionHeight * searchSelectedOption.index - optionHeight;
    }
  }, [ulRef, searchSelectedOption.index, showOptions]);

  const selectOption = (option: Option) => {
    const originalOptionIndex = options.findIndex((el) => el.id === option.id);
    onChange(option);
    setSearchSelectedOption({ id: option.id, index: originalOptionIndex });
    setShowOptions(false);
    resetInput();
  };

  // Logic for pressing keys up/down/enter for select
  const onSelectKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const firstOptionIndex = 0;
    const lastOptionIndex = filteredOptions.length - 1;
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (searchSelectedOption.index === firstOptionIndex) {
        const lastOption = filteredOptions[lastOptionIndex];
        return setSearchSelectedOption({ id: lastOption.id, index: lastOptionIndex });
      }

      const upperOption = filteredOptions[searchSelectedOption.index - 1];
      return setSearchSelectedOption({
        id: upperOption.id,
        index: searchSelectedOption.index - 1
      });
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (searchSelectedOption.index === lastOptionIndex) {
        const firstOption = filteredOptions[firstOptionIndex];
        return setSearchSelectedOption({ id: firstOption.id, index: firstOptionIndex });
      }

      const lowerOption = filteredOptions[searchSelectedOption.index + 1];
      return setSearchSelectedOption({
        id: lowerOption.id,
        index: searchSelectedOption.index + 1
      });
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      const option = filteredOptions[searchSelectedOption.index];
      selectOption(option);
    }
  };

  const onOptionClick = (option: Option) => selectOption(option);

  const onSelectClick = () => {
    if (inputRef.current && !showOptions) {
      setShowOptions(true);
      inputRef.current.focus();
      return;
    }

    resetInput();
    setShowOptions(false);
  };

  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  return {
    refs: { selectRef, ulRef, inputRef },
    functions: { onSelectClick, onOptionClick, onSelectKeyDown, searchInputHandler },
    state: {
      filteredOptions,
      showOptions,
      searchSelectedOption,
      value,
      inputValue
    }
  };
};
