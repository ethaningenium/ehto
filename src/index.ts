import { useEffect, useState } from "react";

type IStore<T> = {
  state: T;
  subscribers: ((value: T) => void)[];
  setState: (value: T) => void;
  subscribe: (subscriber: (value: T) => void) => () => void;
};

export function createStore<U>(initial: U) {
  const store: IStore<U> = {
    state: initial,
    subscribers: [],
    setState(newState) {
      this.state = newState;
      this.subscribers.forEach((subscriber) => subscriber(this.state));
    },
    subscribe(subscriber) {
      this.subscribers.push(subscriber);
      return () => {
        this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
      };
    },
  };

  function useStore() {
    const [state, setState] = useState(store.state);

    useEffect(() => {
      const unsubscribe = store.subscribe(setState);
      return unsubscribe;
    }, []);

    const setGlobalState = (newState: U) => {
      store.setState(newState);
    };

    return [state, setGlobalState] as const;
  }

  return useStore;
}
