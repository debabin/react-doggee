interface Option {
  value: any;
  label: string;
  id: string;
}

interface FilterOptionFunc {
  (option: Option, inputValue: string): boolean;
}
