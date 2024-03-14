declare class Debounce {
    private timer;
    private withTimer;
    /**
     * 创建新的防抖实例
     */
    static new(): Debounce;
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
}
export default Debounce;
