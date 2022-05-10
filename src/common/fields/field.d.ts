interface FieldProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  loading?: boolean;
  isError?: boolean;
  helperText?: string;
  availableChars?: RegExp;
}
