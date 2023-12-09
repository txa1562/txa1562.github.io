import { Signal, WritableSignal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

/**
 * UPDATABLE_SIGNAL
 */

/** Almost a writable signal, but restricted to set, update, or asReadOnly */
export type UpdatableSignal<T> = Signal<T> & Pick<WritableSignal<T>, 'set' | 'update' | 'asReadonly'>

/**
 * SIGNAL_INPUT
 */

/** A type that can be converted to a signal with {@link toSignal} */
export type ToSignalInput<T> = Parameters<typeof toSignal<T>>[0]

/** Could be a function used in a computed, a type compatible with {@link toSignal}, or just a signal */
export type SignalInput<T> = (() => T) | ToSignalInput<T> | Signal<T>

/** Extracts the emitted value of a {@link SignalInput} */
export type SignalInputValue<S extends SignalInput<unknown>> = S extends SignalInput<infer R> ? R : never

/** Extracts what the signal wouldbe from a {@link SignalInput} */
export type SignalInputSignal<S extends SignalInput<unknown>> = S extends Signal<unknown> ? S : S extends SignalInput<infer R> ? Signal<R> : never

/**
 * SIGNAL_PROXY
 */

/** A function of a signal */
export type SignalFunction<S extends Signal<unknown>, K extends keyof S> = S[K] extends (...args: any[]) => any ? S[K] : never

/** An object that is just the functions on a signal */
export type SignalFunctions<S extends Signal<unknown>> = {
  [K in keyof S as S[K] extends (...args: any[]) => any ? K : never]: S[K]
}

/** A signal-like object that is a copy of it's source signal. Unlike a signal it is NOT reactive */
export type SignalProxy<S extends Signal<unknown>> = Signal<ReturnType<S>> & SignalFunctions<S>