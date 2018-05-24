export default function dataclass<T extends {new(...args:any[]):{}}>(constructor: T) {
  return class extends constructor {
    toString = () => "asd";
    toJSON = () => ({ some: "asd" });
  }
}