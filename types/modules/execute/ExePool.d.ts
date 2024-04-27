import Executor from "./Executor";
/**
 * 执行池
 */
export default class ExePool {
    pool: Executor[];
    resultPool: any[];
    /**
     * 添加执行方法
     * @param fun 执行方法
     */
    add(fun: Function | Promise<any>): void;
    /**
     * 执行
     * @param cb 回调
     */
    exe(cb?: () => void): Promise<any>;
}
