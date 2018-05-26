import annotate from "./lib/dataClassAnnotation";

export interface DataClassProps {
  equalsTo?: false;
  log?: false;
}

export function dataclass(props: DataClassProps): any;
export function dataclass(target: {new(...args:any[]):{}}): any;
export function dataclass(arg: any): any {
  if (typeof arg === 'function') {
    return annotate({})(arg);
  } else {
    const options: DataClassProps = Object.assign({}, arg);
    return (target: {new(...args:any[]):{}}) => annotate(options)(target);
  }
}


