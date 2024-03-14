import ObjectUtil from "../object/ObjectUtil";

let globalDebounce;

class Debounce {
    private timer = null;
    private withTimer = null;

    /**
     * 创建新的防抖实例
     */
    static new() {
        return new Debounce();
    }

    /**
     * 全局防抖（无论多长时间，只有最后一次执行达到指定时长才执行）
     * @param fn 方法
     * @param delay 触发时长（间隔时长），单位毫秒，大于此时长将执行方法
     */
    static of(fn: Function, delay: number) {
        if (ObjectUtil.isEmpty(globalDebounce)) {
            globalDebounce = new Debounce();
        }
        globalDebounce.of(fn, delay);
    }

    /**
     * 实例防抖（无论多长时间，只有最后一次执行达到指定时长才执行）
     * @param fn 方法
     * @param delay 触发时长（间隔时长），单位毫秒，大于此时长将执行方法
     */
    of(fn: Function, delay: number) {
        if (this.timer !== null) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            fn()
        }, delay);
    }

    /**
     * 全局闭包防抖，返回方法（无论多长时间，只有最后一次执行达到指定时长才执行）
     * @param fn 方法
     * @param delay 触发时长（间隔时长），单位毫秒，大于此时长将执行方法
     */
    static with(fn: Function, delay: number): Function {
        if (ObjectUtil.isEmpty(globalDebounce)) {
            globalDebounce = new Debounce();
        }
        return globalDebounce.with(fn, delay);
    }

    /**
     * 实例闭包防抖（无论多长时间，只有最后一次执行达到指定时长才执行）
     * @param fn 方法
     * @param delay 触发时长（间隔时长），单位毫秒，大于此时长将执行方法
     */
    with(fn: Function, delay: number): Function {
        const _this = this;
        return function () {
            const context = this;
            const args = arguments;
            if (_this.withTimer !== null) {
                clearTimeout(_this.withTimer);
            }
            _this.withTimer = setTimeout(() => {
                fn.apply(context, args);
            }, delay);
        }
    }
}

export default Debounce;
