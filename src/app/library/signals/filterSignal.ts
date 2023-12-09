import { CreateSignalOptions, Signal, WritableSignal, signal } from "@angular/core";

export type FilterSignal<T, O = T> = Signal<T> & Omit<WritableSignal<O>, 'set' | 'update'> & {
  /** sets the new value IF it is compatible with the filter function */
  set(value: T): void
  /** updates the signal's value IF it is compatible with the filter function */
  update(updateFn: (value: O) => T): void
}

export function filterSignal<T, O extends T>(initialValue: O, filterFn: (x: T) => x is O, options?: CreateSignalOptions<O>): FilterSignal<T, O>
export function filterSignal<O>(initialValue: O, filterFn: (x: O) => boolean, options?: CreateSignalOptions<O>): FilterSignal<O>
export function filterSignal<T, O extends T>(initialValue: O, filterFn: (x: T) => boolean, options?: CreateSignalOptions<O>): FilterSignal<T, O> {
  const _internal = signal<O>(initialValue, options);
  const _setFn = _internal.set;

  return Object.assign(_internal, {
    set: (x: T) => setConditionally(x),
    update: (signalUpdateFn: (x: T) => T) => setConditionally(signalUpdateFn(_internal()))
  });
  
  function setConditionally(value: T): void {
    // if the value is compatible with the filter function, set the signal value
    if (filterFn(value)) _setFn.call(_internal, value as O);
  }
}