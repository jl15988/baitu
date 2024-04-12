/**
 * 防抖（无论多长时间，只有最后一次执行达到指定时长才执行）
 */
declare class Debounce {
    private timer;
    private withTimer;
    name: string;
    constructor(name?: string);
    /**
     * 创建新的防抖实例
     */
    static new(name?: string): any;
    /**
     * 全局防抖（无论多长时间，只有最后一次执行达到指定时长才执行）
     * @param fn 方法
     * @param delay 触发时长（间隔时长），单位毫秒，大于此时长将执行方法
     */
    static of(fn: Function, delay: number): void;
    /**
     * 实例防抖（无论多长时间，只有最后一次执行达到指定时长才执行）
     * @param fn 方法
     * @param delay 触发时长（间隔时长），单位毫秒，大于此时长将执行方法
     */
    of(fn: Function, delay: number): void;
    /**
     * 全局闭包防抖，返回方法（无论多长时间，只有最后一次执行达到指定时长才执行）
     * @param fn 方法
     * @param delay 触发时长（间隔时长），单位毫秒，大于此时长将执行方法
     */
    static with(fn: Function, delay: number): Function;
    /**
     * 实例闭包防抖（无论多长时间，只有最后一次执行达到指定时长才执行）
     * @param fn 方法
     * @param delay 触发时长（间隔时长），单位毫秒，大于此时长将执行方法
     */
    with(fn: Function, delay: number): Function;
    /**
     * 从防抖池中取出某个实例
     * @param name 要取的防抖名称
     */
    static getDebouncePool(name?: string): any;
    /**
     * 将防抖从防抖池中剔除
     */
    destroy(): void;
}
export default Debounce;
