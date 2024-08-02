# Ehto

A lightweight shared state management library for React applications.

## Features

- Simple API
- TypeScript support
- Lightweight (only 1.4 KB)
- No external dependencies

## Installation

```bash
npm install ehto
```
```bash
yarn add ehto
```
```bash
pnpm add ehto
```

## Usage
### Creating a store
```ts
import { createStore } from "ehto";

const useStore = createStore(0);

export const useCounterStore = () => {
  const [state, setState] = useStore();
  const Increment = () => {
    setState(state + 1);
  };
  const Decrement = () => {
    setState(state - 1);
  };
  return {
    state,
    Increment,
    Decrement,
  };
};
```

### Using the store in component
```tsx
import { useCounterStore } from "./useCounterStore";

export function Counter() {
  const { Increment, Decrement, state } = useCounterStore();
  return (
    <div>
      <span>{state}</span>
      <button onClick={Increment}>Inc</button>
      <button onClick={Decrement}>Dec</button>
    </div>
  );
}
```

## API

### createStore(initialState)
Creates a new store with the given initial state.
Returns a react hook with getter and setter

### useStore()
A hook for using and updating the store state in React components.
Returns a tuple `[state, setState]`:

`state:` the current store state
`setState:` a function to update the state

## License
### MIT