import * as util from 'util';

export interface DataClassProps {
  eq?: false;
  log?: false;
}

export function dataclass(props: DataClassProps): Function;
export function dataclass(target: {new(...args:any[]):{}}): Function;
export function dataclass(arg: any): Function {
  if (typeof arg === 'function') {
    return annotate({})(arg);
  } else {
    const options: DataClassProps = Object.assign({}, arg);
    return (target: {new(...args:any[]):{}}) => annotate(options)(target);
  }
}
function annotate(props?: DataClassProps) {
  return function annotate<T extends {new(...args:any[]):{}}>(constructor: T) {
    const Constructor: any = (function () {
      function Constructor() {
        const a = new constructor(arguments);
        Object.keys(a).forEach(k => {
          this[k] = a[k];
        });
      }
      Constructor.prototype = constructor.prototype;
      return Object.freeze(Constructor);
    })();
    const A: any = class extends Constructor {
      [util.inspect.custom](depth, options) {
        return this.toString();
      };
      /**
       * String representation of the class;
       */
      toString() {
        return `${constructor.name} [${
          Object.keys(this).map(key => `${key} := ${this[key]}`)
        }${Object.keys(A.prototype).map(
          key => key === 'constructor' ? '' : `${key} := function () { [native code] }`)}]`;
      }
    };
    if (!props || props && props.log) {
      /** Method for representation of object while usijng confole.log */
      A.prototype[util.inspect.custom] = (function(depth, options) {
        return this.toString();
      }).bind(A);
    }
    if (!props || props && props.eq) {
      A.prototype.eq = (elem: T) => false;
    }
    return A;
  }
}