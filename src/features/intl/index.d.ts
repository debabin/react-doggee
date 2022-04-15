type Message = string;
type IntlFunction = (message: Message) => import('react').ReactNode;
interface TranslateMessage {
  path: string;
  values?: Record<string, string | number | boolean | IntlFunction>;
}
