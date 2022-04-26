import React from 'react';

import inputStyles from '../input.module.css';
import paswordInputstyles from './PasswordInput.module.css';

export const PasswordInput: React.FC<InputProps> = ({
  isError = false,
  helperText,
  label,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const showPasswordToggle = props.value;

  return (
    <>
      <div
        aria-hidden='true'
        aria-disabled={props.disabled}
        className={`${inputStyles.input_container} ${isError ? inputStyles.input_container : ''}`}
        onClick={() => inputRef.current?.focus()}
      >
        <input
          type={showPasswordToggle && showPassword ? 'text' : 'password'}
          ref={inputRef}
          className={inputStyles.input}
          {...props}
        />
        <label htmlFor={props.id} className={inputStyles.input_label}>
          {label}
        </label>
        {showPasswordToggle && (
          <div
            aria-hidden='true'
            role='button'
            className={paswordInputstyles.password_toogle_container}
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? (
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M5.53846 9.2325C5.53846 7.32021 7.08824 5.77 9 5.77C10.9118 5.77 12.4615 7.32021 12.4615 9.2325C12.4615 11.1448 10.9118 12.695 9 12.695C7.08824 12.695 5.53846 11.1448 5.53846 9.2325ZM9 7.155C7.85295 7.155 6.92308 8.08513 6.92308 9.2325C6.92308 10.3799 7.85295 11.31 9 11.31C10.1471 11.31 11.0769 10.3799 11.0769 9.2325C11.0769 8.08513 10.1471 7.155 9 7.155Z'
                  fill='black'
                  fillOpacity='0.7'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M1.91393 7.98263C1.52705 8.54026 1.38462 8.97646 1.38462 9.2325C1.38462 9.48854 1.52705 9.92474 1.91393 10.4824C2.28791 11.0214 2.84379 11.6057 3.54708 12.1456C4.95672 13.2278 6.88934 14.08 9 14.08C11.1107 14.08 13.0433 13.2278 14.4529 12.1456C15.1562 11.6057 15.7121 11.0214 16.0861 10.4824C16.4729 9.92474 16.6154 9.48854 16.6154 9.2325C16.6154 8.97646 16.4729 8.54026 16.0861 7.98263C15.7121 7.44359 15.1562 6.85927 14.4529 6.31935C13.0433 5.23716 11.1107 4.385 9 4.385C6.88934 4.385 4.95672 5.23716 3.54708 6.31935C2.84379 6.85927 2.28791 7.44359 1.91393 7.98263ZM2.70407 5.22065C4.30122 3.9945 6.52245 3 9 3C11.4776 3 13.6988 3.9945 15.2959 5.22065C16.096 5.83489 16.7568 6.52016 17.2236 7.19299C17.6775 7.84724 18 8.56521 18 9.2325C18 9.89979 17.6775 10.6178 17.2236 11.272C16.7568 11.9448 16.096 12.6301 15.2959 13.2444C13.6988 14.4705 11.4776 15.465 9 15.465C6.52245 15.465 4.30122 14.4705 2.70407 13.2444C1.90396 12.6301 1.24321 11.9448 0.776403 11.272C0.322496 10.6178 0 9.89979 0 9.2325C0 8.56521 0.322496 7.84724 0.776403 7.19299C1.24321 6.52016 1.90396 5.83489 2.70407 5.22065Z'
                  fill='black'
                  fillOpacity='0.7'
                />
              </svg>
            ) : (
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M16.8742 2.18193C17.1445 1.91155 17.1445 1.47317 16.8742 1.20279C16.6038 0.932404 16.1654 0.932404 15.8951 1.20279L1.12585 15.9731C0.855486 16.2435 0.855486 16.6818 1.12585 16.9522C1.39621 17.2226 1.83456 17.2226 2.10492 16.9522L4.73282 14.3241C5.99403 14.9179 7.44663 15.3087 9 15.3087C11.4776 15.3087 13.6988 14.3144 15.2959 13.0885C16.096 12.4744 16.7568 11.7893 17.2236 11.1166C17.6775 10.4625 18 9.74465 18 9.0775C18 8.41034 17.6775 7.69252 17.2236 7.03841C16.7568 6.36572 16.096 5.68059 15.2959 5.06647C15.054 4.88075 14.7977 4.70035 14.5283 4.52791L16.8742 2.18193ZM13.5226 5.53367L11.888 7.1684C12.2505 7.71566 12.4615 8.37193 12.4615 9.0775C12.4615 10.9894 10.9118 12.5393 9 12.5393C8.29448 12.5393 7.63826 12.3282 7.09104 11.9657L5.7833 13.2736C6.76686 13.6743 7.85734 13.924 9 13.924C11.1107 13.924 13.0433 13.072 14.4529 11.99C15.1562 11.4502 15.7121 10.866 16.0861 10.3271C16.4729 9.76959 16.6154 9.33349 16.6154 9.0775C16.6154 8.82151 16.4729 8.38541 16.0861 7.82789C15.7121 7.28896 15.1562 6.70476 14.4529 6.16495C14.1638 5.94307 13.8527 5.73085 13.5226 5.53367ZM8.10456 10.9521C8.37569 11.0819 8.67936 11.1546 9 11.1546C10.1471 11.1546 11.0769 10.2246 11.0769 9.0775C11.0769 8.75684 11.0043 8.45315 10.8745 8.18199L8.10456 10.9521Z'
                  fill='black'
                  fillOpacity='0.7'
                />
                <path
                  d='M9 2.84629C9.94187 2.84629 10.8467 2.98998 11.6943 3.23548C11.8729 3.2872 11.926 3.51049 11.7945 3.64196L11.0631 4.37349C11.0012 4.43534 10.9116 4.4601 10.8263 4.44059C10.2393 4.30631 9.62754 4.231 9 4.231C6.88934 4.231 4.95672 5.08299 3.54708 6.16495C2.84379 6.70476 2.28791 7.28896 1.91393 7.82789C1.52705 8.38541 1.38462 8.82151 1.38462 9.0775C1.38462 9.33349 1.52705 9.76959 1.91393 10.3271C2.2374 10.7932 2.69694 11.2932 3.27025 11.7691C3.38586 11.8651 3.39693 12.0402 3.29069 12.1464L2.66389 12.7733C2.57358 12.8636 2.42946 12.8715 2.33173 12.7893C1.69792 12.256 1.16868 11.6819 0.776403 11.1166C0.322496 10.4625 0 9.74465 0 9.0775C0 8.41034 0.322496 7.69252 0.776403 7.03841C1.24321 6.36572 1.90396 5.68059 2.70407 5.06647C4.30122 3.84058 6.52245 2.84629 9 2.84629Z'
                  fill='black'
                  fillOpacity='0.7'
                />
                <path
                  d='M9 5.61571C9.09741 5.61571 9.19389 5.61974 9.28927 5.62763C9.48629 5.64393 9.55769 5.87898 9.4179 6.01878L8.32374 7.11302C7.72069 7.3206 7.24323 7.79809 7.03566 8.40119L5.94154 9.49539C5.80174 9.6352 5.56667 9.5638 5.55037 9.36677C5.54248 9.27139 5.53846 9.17491 5.53846 9.0775C5.53846 7.16561 7.08824 5.61571 9 5.61571Z'
                  fill='black'
                  fillOpacity='0.7'
                />
              </svg>
            )}
          </div>
        )}
      </div>
      {isError && helperText && <div className={inputStyles.helper_text}>{helperText}</div>}
    </>
  );
};
