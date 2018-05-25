import * as util from 'util';

export default function dataclass<T extends {new(...args:any[]):{}}>(constructor: T) {
  return class extends constructor {
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
}