class MicroEvent<
    EventMap extends Record<string, any[]> = Record<string, any[]>,
    N extends keyof EventMap = keyof EventMap
> {
    _eventTypes: EventMap;
    _events: Partial<Record<N, ((...args: EventMap[N]) => void)[]>> = {};
    bind<EN extends N>(
        eventName: EN,
        callback: (...args: EventMap[EN]) => void
    ) {
        const callbacks = this._events[eventName] ?? [];
        this._events[eventName] = [...callbacks, callback];
    }
    unbind<EN extends N>(
        eventName: EN,
        callback: (...args: EventMap[EN]) => void
    ) {
        const callbacks = this._events[eventName] ?? [];
        this._events[eventName] = callbacks.filter((cb) => cb !== callback);
    }
    trigger<EN extends N>(eventName: EN, ...args: EventMap[EN]) {
        const callbacks = this._events[eventName] ?? [];
        for (const callback of callbacks) callback(...args);
    }
}

// Utility for extracting event argument at second hand event consumption
// i.e. EventArg<Incito, 'sectionVisible'> => { sectionId: string; sectionPosition: number; }
type TypeArg<C extends MicroEvent> = C extends MicroEvent<infer U> ? U : never;
export type EventArg<
    C extends MicroEvent,
    N extends keyof TypeArg<C>
> = TypeArg<C>[N][0];

export default MicroEvent;
