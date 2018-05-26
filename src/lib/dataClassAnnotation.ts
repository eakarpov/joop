import {DataClassProps} from "../dataclass";
import * as util from "util";

export default function annotate(props?: DataClassProps) {
  return function dataclass<T extends {new(...args:any[]):{}}>(constructor: T) {

    // wrap the constructor to return a frozen object
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

    // new class to be returned
    const A: any = class extends Constructor {
      /**
       * Method for representation of object while using confole.log
       */
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
    if (props && props.log === false) {
      A.prototype[util.inspect.custom] = void 0;
    }
    if (props && props.equalsTo === false) {
      A.prototype.equalsTo = void 0;
    }
    return A;
  }
}