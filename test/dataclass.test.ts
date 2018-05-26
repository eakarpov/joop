import {dataclass} from "../build/dataclass";
import {suite, test} from "mocha-typescript";

@dataclass class A {
  some: string = "asdad";
}

@dataclass({ eq: false }) class B {
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

  @test freezeObject() {
    const a = new A();
    // a['t'] = "3";
    console.log(a);
  }
}