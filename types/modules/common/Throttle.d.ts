declare class Throttle {
    private timer;
    private flag;
    /**
     * 节流（一段时间内只执行一次）
     * @param fn 方法
     * @param delay 时长，单位毫秒，时长内只执行一次方法
     * @param immediate 是否立即执行，默认true
     */
    of(fn: Function, delay: number, immediate?: boolean): void;
}
declare const _default: Throttle;
export default _default;
