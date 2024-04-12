/**
 * 节流（一段时间内只执行一次）
 */
declare class Throttle {
    private timer;
    private withTimer;
    name: string;
    constructor(name?: string);
    /**
     * 创建新的节流实例
     * @param name 节流唯一名称
     */
    static new(name?: string): any;
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
    /**
     * 从节流池中取出某个实例
     * @param name 要取的节流名称
     */
    static getThrottlePool(name?: string): any;
    /**
     * 将节流从节流池中剔除
     */
    destroy(): void;
}
export default Throttle;
