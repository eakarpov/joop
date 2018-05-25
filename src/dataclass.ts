import * as util from 'util';

export interface DataClassProps {
  eq?: false;
}

export default function (props?: DataClassProps) { 
  return function dataclass<T extends {new(...args:any[]):{}}>(constructor: T) {
    const A = class extends constructor {
      /** Method for representation of object while usijng confole.log */
      [util.inspect.custom](depth, options) {
        return this.toString();
      }
      /**
       * String representation of the class;
       */
      toString() {
        return `${constructor.name} [${Object.keys(this).map(key => `${key} := ${this[key]}`)}]`;
      }
    }
    if (!props || props && props.eq) {
      A.prototype.eq = (elem: T) => false;
    }
    return A;
  }
}