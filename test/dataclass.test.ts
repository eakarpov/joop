import {dataclass} from "../build/dataclass";
import {suite, test} from "mocha-typescript";
import * as assert from "assert";

@dataclass class A {
  some: string = "asdad";
}

@dataclass({ equalsTo: false }) class B {
  next: string = "fdsfds";
  some: boolean = true;
  method: () => "asd";
}

@dataclass({ log: false }) class C {
  next: string = "fdsfds";
  some: boolean = true;
  method: () => "asd";
}

@suite class DataClassTest {
  @test toStringOverride() {
    const a = new A();
    console.log(a);
  }

  @test toStringOverride2() {
    const b = new B();
    console.log(b);
  }

  // does not work
  @test freezeObject() {
    const a = new A();
    assert.deepStrictEqual(Object.isFrozen(a), true);
  }

  @test freezeObject2() {
    const b = new B();
    assert.deepStrictEqual(Object.isFrozen(b), true);
  }

  @test standardConsoleLog() {
    const c = new C();
    console.log(c);
  }
}