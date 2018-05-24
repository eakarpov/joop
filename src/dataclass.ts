export default function dataclass<T extends {new(...args:any[]):{}}>(constructor: T) {
  console.log(new constructor());
  // constructor.prototype.toString = () => "asdad";
  // constructor.prototype.toJSON = () => "sfffgd";
  return class extends constructor {
    toString() {
      return ";lk;lk;lk;lk"
    }
    toJSON() {
      return { aaa: "asdad "};
    }
  }
}