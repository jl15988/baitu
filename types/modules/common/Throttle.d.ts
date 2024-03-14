declare class Throttle {
    private timer;
    private withTimer;
    /**
     * 创建新的节流实例
     */
    static new(): Throttle;
    /**
     * 全局节流（一段时间内只执行一次）
     * @param fn 方法
     * @param delay 时长，单位毫秒，时长内只执行一次方法
     * @param immediate 是否立即执行，默认true
     */
    static of(fn: Function, delay: number, immediate?: boolean): void;
    /**
     * 实例节流（一段时间内只执行一次）
     * @param fn 方法
     * @param delay 时长，单位毫秒，时长内只执行一次方法
     * @param immediate 是否立即执行，默认true
     */
    of(fn: Function, delay: number, immediate?: boolean): void;
    /**
     * 全局闭包节流（一段时间内只执行一次）
     * @param fn 方法
     * @param delay 时长，单位毫秒，时长内只执行一次方法
     * @param immediate 是否立即执行，默认true
     */
    static with(fn: Function, delay: number, immediate?: boolean): Function;
    /**
     * 实例闭包节流（一段时间内只执行一次）
     * @param fn 方法
     * @param delay 时长，单位毫秒，时长内只执行一次方法
     * @param immediate 是否立即执行，默认true
     */
    with(fn: Function, delay: number, immediate?: boolean): Function;
}
export default Throttle;
