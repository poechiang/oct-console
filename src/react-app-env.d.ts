/// <reference types="react-scripts" />
declare module '*.module.less' {
    const classes: {
      readonly [key: string]: string
    };
    export default classes;
    declare module '*.less'
  }

type Nullable<T=any> = T|null;
declare interface ExtensibleObject<T=any> extends Object{
  [x:string]:Nullable<T>;
}
type Style = ExtensibleObject<number|string>;
declare interface Language {
    key: string;
    icon?: ReactComponent;
    label?: string;
}
declare interface IActions{
  label:string;
  onClick:(any)=>void;
}

declare interface ComponentProps extends ExtensibleObject {
  className?: string;
  style?: { [x: string]: string | number };
}
type PageProps = ComponentProps
