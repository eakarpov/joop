# JOOP - Just Object-Oriented Programming

Class-oriented programming implemented for JavaScript (TypeScript).

## Usage

```typescript
import {dataclass} from 'joop';

@dataclass
class A {
    property: any;
}

@dataclass({ equalsTo: false })
class A {
    property: any;
}
```

## Features

* immutable objects
    - objects produced by classed with dataclass annotation are immutable.

* toString() override
    - method toString is injected automatically for string representation of the object


* custom representation of an object in console.log
    - uses toString() method instead of standard mechanism.
    - can be turned off via { log: false } parameter in annotation



TODO: To be implemented
