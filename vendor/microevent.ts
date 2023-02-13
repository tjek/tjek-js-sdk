class MicroEvent<
    EventMap extends Record<string, any[]> = Record<string, any[]>,
    N extends keyof EventMap = keyof EventMap
> {
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

export default MicroEvent;
