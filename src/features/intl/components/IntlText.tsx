import React from 'react';

import { useIntl } from '../hooks/useIntl';

interface IntlTextProps extends TranslateMessage {
  children?: (message: Message | React.ReactNode) => React.ReactNode;
}

export const IntlText: React.FC<IntlTextProps> = ({ path, values, children }) => {
  const intl = useIntl();
  const withFunctionalKeys =
    !!values && !!Object.keys(values).filter((key) => typeof values[key] === 'function').length;

  const translateMessageWithTags = (
    message: Message,
    values?: TranslateMessage['values']
  ): React.ReactNode => {
    if (!values) return message;

    const keys = Object.keys(values);
    const functionalKeys = keys.filter((key) => typeof values[key] === 'function');
    const [key, ...restKeys] = functionalKeys;
    const htmlRegex = new RegExp(`<${key}>(.*?)</${key}>`, 'gm');
    const [contentWithTag, content] = htmlRegex.exec(message) ?? [];

    if (!contentWithTag) return message;
    const messageParts: string[] = message.split(contentWithTag);
    const result = (values[key] as IntlFunction)(content);
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([key]) => restKeys.includes(key))
    );

    return (
      <>
        {messageParts.map((messagePart, index) => (
          <>
            {!!index && result}
            {translateMessageWithTags(messagePart, filteredValues)}
          </>
        ))}
      </>
    );
  };

  if (withFunctionalKeys) {
    if (children && typeof children === 'function') {
      return <>{children(translateMessageWithTags(intl.translateMessage(path, values), values))}</>;
    }

    return <>{translateMessageWithTags(intl.translateMessage(path, values), values)}</>;
  }

  if (children && typeof children === 'function') {
    return <>{children(intl.translateMessage(path, values))}</>;
  }

  return <>{intl.translateMessage(path, values)}</>;
};
