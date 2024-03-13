class Throttle {
    private timer = null;
    private flag = false;

    /**
     * 节流（一段时间内只执行一次）
     * @param fn 方法
     * @param delay 时长，单位毫秒，时长内只执行一次方法
     * @param immediate 是否立即执行，默认true
     */
    of(fn: Function, delay: number, immediate: boolean = true) {
        if (immediate) {
            if (!this.flag) {
                this.flag = true
                fn();
                this.timer = setTimeout(() => {
                    this.flag = false
                }, delay);
            }
        } else if (!this.flag) {
            this.flag = true;
            this.timer = setTimeout(() => {
                this.flag = false
                fn();
            }, delay);
        }
    }
}

export default new Throttle();
