interface ClassnamesObj {
  [k: string]: boolean;
}

type ClassnamesParams = Array<ClassnamesObj | string>;

export const classnames = (...args: ClassnamesParams) => {
  const classNames = [];

  for (let i = 0; i < args.length; i += 1) {
    if (typeof args[i] === 'string') {
      classNames.push(args[i]);
    }
    if (typeof args[i] === 'object') {
      const obj = args[i] as ClassnamesObj;
      Object.keys(obj).forEach((className) => {
        if (obj[className]) {
          classNames.push(className);
        }
      });
    }
  }

  return classNames.join(' ');
};
