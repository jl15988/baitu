/**
 * 全局防抖池
 */
const globalDebouncePool: {
    [name: string]: Debounce
} = {};

/**
 * 默认的防抖名称
 */
const defaultDebounceName = "defaultDebounceName";

/**
 * 防抖（无论多长时间，只有最后一次执行达到指定时长才执行）
 */
class Debounce {
    private timer: undefined | number | NodeJS.Timeout = undefined;
    private withTimer: undefined | number | NodeJS.Timeout = undefined;
    name: undefined | string = undefined;

    constructor(name?: string) {
        if (name) {
            this.name = name;
        }
    }

    /**
     * 创建新的防抖实例
     */
    static new(name?: string) {
        if (name) {
            return Debounce.getDebouncePool(name);
        }
        return new Debounce();
    }

    /**
     * 全局防抖（无论多长时间，只有最后一次执行达到指定时长才执行）
     * @param fn 方法
     * @param delay 触发时长（间隔时长），单位毫秒，大于此时长将执行方法
     */
    static of(fn: Function, delay: number) {
        const debounce = Debounce.getDebouncePool();
        debounce.of(fn, delay);
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
            fn();
            this.destroy();
        }, delay);
    }

    /**
     * 全局闭包防抖，返回方法（无论多长时间，只有最后一次执行达到指定时长才执行）
     * @param fn 方法
     * @param delay 触发时长（间隔时长），单位毫秒，大于此时长将执行方法
     */
    static with(fn: Function, delay: number): Function {
        const debounce = Debounce.getDebouncePool();
        return debounce.with(fn, delay);
    }

    /**
     * 实例闭包防抖（无论多长时间，只有最后一次执行达到指定时长才执行）
     * @param fn 方法
     * @param delay 触发时长（间隔时长），单位毫秒，大于此时长将执行方法
     */
    with(fn: Function, delay: number): Function {
        const _this = this;
        return function () {
            // @ts-ignore
            const context = this;
            const args = arguments;
            if (_this.withTimer !== null) {
                clearTimeout(_this.withTimer);
            }
            _this.withTimer = setTimeout(() => {
                fn.apply(context, args);
                _this.destroy();
            }, delay);
        }
    }

    /**
     * 从防抖池中取出某个实例
     * @param name 要取的防抖名称
     */
    static getDebouncePool(name?: string) {
        if (!name) {
            name = defaultDebounceName;
        }
        let debounce;
        if (!globalDebouncePool[name]) {
            debounce = globalDebouncePool[name] = new Debounce(name);
        } else {
            debounce = globalDebouncePool[name];
        }
        return debounce;
    }

    /**
     * 将防抖从防抖池中剔除
     */
    destroy() {
        if (this.timer) {
            try {
                clearTimeout(this.timer);
            } catch (e) {
            }
        }
        if (this.withTimer) {
            try {
                clearTimeout(this.withTimer);
            } catch (e) {
            }
        }
        delete globalDebouncePool[this.name!];
    }
}

export default Debounce;
