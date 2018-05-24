import dataclass from "../build/dataclass";
import {suite, test} from "mocha-typescript";

@dataclass class A {
  some: string = "asdad";
}

@suite class DataClassTest {
  @test toStringOverride() {
    const a = new A();
    console.log(a);
  }
}