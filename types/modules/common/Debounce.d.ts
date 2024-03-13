declare class Debounce {
    private timer;
    /**
     * 防抖（无论多长时间，只有最后一次执行达到指定时长才执行）
     * @param fn 方法
     * @param delay 触发时长（间隔时长），单位毫秒，大于此时长将执行方法
     */
    of(fn: Function, delay: number): void;
}
declare const _default: Debounce;
export default _default;
