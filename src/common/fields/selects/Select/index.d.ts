interface Option {
  value: any;
  label: string;
  id: string | number;
}

interface FilterOptionFunc {
  (option: Option, inputValue: string): boolean;
}
