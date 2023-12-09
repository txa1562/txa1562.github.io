import { Injector, WritableSignal, effect, signal } from "@angular/core";
import { SignalInput } from "@library/signals/signalTypes";

export interface DebounceSignalOptions {
  /** Pass injector if this is not created in Injection Context */
  injector?: Injector
}

// export function debounceSignal<T>(source: SignalInput)
export function debounceSignal<T>(initialValue: T, delay: number, options?: DebounceSignalOptions): WritableSignal<T> {
  const _internal = signal<T>(initialValue);
  const _output = signal<T>(initialValue);
  const _setOutputFn = _output.set;

  let timeoutId: ReturnType<typeof setTimeout>;
  effect(() => {
    // cancel the last updated value
    clearTimeout(timeoutId);

    // need this to update the effect
    const _nextValue = _internal();

    timeoutId = setTimeout(() => _setOutputFn(_nextValue), delay);
  }, options);

  // set internal whenever output is set
  _output.set = (value) => _internal.set(value);

  // update from the current output value
  _output.update = (updateFn) => _internal.set(updateFn(_output()));

  return _output;
}