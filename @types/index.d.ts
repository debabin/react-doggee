interface User {
  username: string;
  password: string;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare type $TSFixMe = any;
