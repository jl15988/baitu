import StrUtil from "../string/StrUtil";

/**
 * 全局节流池
 */
const globalThrottlePool = {};

/**
 * 默认的节流名称
 */
const defaultThrottleName = "defaultThrottleName";

/**
 * 节流
 */
class Throttle {
    private timer = null;
    private withTimer = null;
    name: string = null;

    constructor(name?: string) {
        if (name) {
            this.name = name;
        }
    }

    /**
     * 创建新的节流实例
     * @param name 节流唯一名称
     */
    static new(name?: string) {
        if (name) {
            return Throttle.getThrottlePool(name);
        }
        return new Throttle();
    }

    /**
     * 全局节流（一段时间内只执行一次）
     * @param fn 方法
     * @param delay 时长，单位毫秒，时长内只执行一次方法
     * @param immediate 是否立即执行，默认true
     */
    static of(fn: Function, delay: number, immediate: boolean = true) {
        const throttle = Throttle.getThrottlePool();
        throttle.of(fn, delay, immediate);
    }

    /**
     * 实例节流（一段时间内只执行一次）
     * @param fn 方法
     * @param delay 时长，单位毫秒，时长内只执行一次方法
     * @param immediate 是否立即执行，默认true
     */
    of(fn: Function, delay: number, immediate: boolean = true) {
        if (immediate) {
            if (!this.timer) {
                fn();
                this.timer = setTimeout(() => {
                    this.timer = null;
                    this.destroy();
                    console.log(globalThrottlePool)
                }, delay);
            }
        } else if (!this.timer) {
            this.timer = setTimeout(() => {
                this.timer = null;
                fn();
                this.destroy();
                console.log(globalThrottlePool)
            }, delay);
        }
    }

    /**
     * 全局闭包节流（一段时间内只执行一次）
     * @param fn 方法
     * @param delay 时长，单位毫秒，时长内只执行一次方法
     * @param immediate 是否立即执行，默认true
     */
    static with(fn: Function, delay: number, immediate: boolean = true): Function {
        const throttle = Throttle.getThrottlePool();
        return throttle.with(fn, delay, immediate);
    }

    /**
     * 实例闭包节流（一段时间内只执行一次）
     * @param fn 方法
     * @param delay 时长，单位毫秒，时长内只执行一次方法
     * @param immediate 是否立即执行，默认true
     */
    with(fn: Function, delay: number, immediate: boolean = true): Function {
        const _this = this;
        return function () {
            const context = this;
            const args = arguments;
            if (immediate) {
                if (!_this.withTimer) {
                    fn.apply(context, args);
                    _this.withTimer = setTimeout(() => {
                        _this.withTimer = null;
                        _this.destroy();
                    }, delay);
                }
            } else if (!_this.withTimer) {
                _this.withTimer = setTimeout(() => {
                    _this.withTimer = null;
                    fn.apply(context, args);
                    _this.destroy();
                }, delay);
            }
        }
    }

    /**
     * 从节流池中取出某个实例
     * @param name 要取的节流名称
     */
    static getThrottlePool(name?: string) {
        if (StrUtil.isBlank(name)) {
            name = defaultThrottleName;
        }
        let debounce;
        if (!globalThrottlePool[name]) {
            debounce = globalThrottlePool[name] = new Throttle(name);
        } else {
            debounce = globalThrottlePool[name];
        }
        return debounce;
    }

    /**
     * 将节流从节流池中剔除
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
        delete globalThrottlePool[this.name];
    }
}

export default Throttle;
