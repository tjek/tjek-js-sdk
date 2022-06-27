declare module 'microevent' {
    export default class MicroEvent {
        bind(name: string, cb: (...args) => any): void;
        unbind(name: string, cb: (...args) => any): void;
        trigger(name: string, ...args): void;
    }
}
