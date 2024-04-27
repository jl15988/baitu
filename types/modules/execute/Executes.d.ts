/**
 * 执行器工具
 */
declare class Executes {
    /**
     * 睡眠，需配合 await 使用
     * @param millis 睡眠时长（毫秒）
     */
    sleep(millis: number): Promise<unknown>;
    /**
     * 转 Promise
     * @param fun 执行方法
     */
    toPromise(fun: Function | Promise<any>): Promise<any>;
    /**
     * 转 Promise 闭包
     * @param fun 执行方法
     */
    toPromiseClosure(fun: Function | Promise<any>): () => Promise<any>;
    /**
     * 自动判断并执行方法
     * @param fun 执行方法
     */
    exe(fun: Function | Promise<any>): Promise<any>;
}
declare const _default: Executes;
export default _default;
