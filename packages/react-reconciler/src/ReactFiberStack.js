/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Fiber} from './ReactFiber';

import warning from 'fbjs/lib/warning';

export type StackCursor<T> = {
  current: T,
};

export type Stack = {
  createCursor<T>(defaultValue: T): StackCursor<T>,
  isEmpty(): boolean,
  push<T>(cursor: StackCursor<T>, value: T, fiber: Fiber): void,
  pop<T>(cursor: StackCursor<T>, fiber: Fiber): void,

  // DEV only
  checkThatStackIsEmpty(): void,
  resetStackAfterFatalErrorInDev(): void,
};

export default function(): Stack {
  const valueStack: Array<any> = [];

  let fiberStack: Array<Fiber | null>;

  if (__DEV__) {
    fiberStack = [];
  }

  let index = -1;

  function createCursor<T>(defaultValue: T): StackCursor<T> {
    return {
      current: defaultValue,
    };
  }

  function isEmpty(): boolean {
    return index === -1;
  }

  function pop<T>(cursor: StackCursor<T>, fiber: Fiber): void {
    if (index < 0) {
      if (__DEV__) {
        warning(false, 'Unexpected pop.');
      }
      return;
    }

    if (__DEV__) {
      if (fiber !== fiberStack[index]) {
        warning(false, 'Unexpected Fiber popped.');
      }
    }

    cursor.current = valueStack[index];

    valueStack[index] = null;

    if (__DEV__) {
      fiberStack[index] = null;
    }

    index--;
  }

  function push<T>(cursor: StackCursor<T>, value: T, fiber: Fiber): void {
    index++;

    valueStack[index] = cursor.current;

    if (__DEV__) {
      fiberStack[index] = fiber;
    }

    cursor.current = value;
  }

  function checkThatStackIsEmpty() {
    if (__DEV__) {
      if (index !== -1) {
        warning(
          false,
          'Expected an empty stack. Something was not reset properly.',
        );
      }
    }
  }

  function resetStackAfterFatalErrorInDev() {
    if (__DEV__) {
      index = -1;
      valueStack.length = 0;
      fiberStack.length = 0;
    }
  }

  return {
    createCursor,
    isEmpty,
    pop,
    push,
    checkThatStackIsEmpty,
    resetStackAfterFatalErrorInDev,
  };
}
