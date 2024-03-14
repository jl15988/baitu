import ObjectUtil from "../object/ObjectUtil";

let globalThrottle;

class Throttle {
    private timer = null;
    private withTimer = null;

    /**
     * 创建新的节流实例
     */
    static new() {
        return new Throttle();
    }

    /**
     * 全局节流（一段时间内只执行一次）
     * @param fn 方法
     * @param delay 时长，单位毫秒，时长内只执行一次方法
     * @param immediate 是否立即执行，默认true
     */
    static of(fn: Function, delay: number, immediate: boolean = true) {
        if (ObjectUtil.isEmpty(globalThrottle)) {
            globalThrottle = new Throttle();
        }
        globalThrottle.of(fn, delay, immediate);
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
                }, delay);
            }
        } else if (!this.timer) {
            this.timer = setTimeout(() => {
                this.timer = null;
                fn();
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
        if (ObjectUtil.isEmpty(globalThrottle)) {
            globalThrottle = new Throttle();
        }
        return globalThrottle.with(fn, delay, immediate);
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
                    }, delay);
                }
            } else if (!_this.withTimer) {
                _this.withTimer = setTimeout(() => {
                    _this.withTimer = null;
                    fn.apply(context, args);
                }, delay);
            }
        }
    }
}

export default Throttle;
