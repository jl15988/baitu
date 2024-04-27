import Executor from "./Executor";

/**
 * 执行池
 */
export default class ExePool {
    pool: Executor[] = [];
    resultPool: any[] = [];

    /**
     * 添加执行方法
     * @param fun 执行方法
     */
    add(fun: Function | Promise<any>) {
        const executor = Executor.new(fun);
        this.pool.push(executor);
    }

    /**
     * 执行
     * @param cb 回调
     */
    async exe(cb?: () => void): Promise<any> {
        await Promise.all(this.pool.map(item => {
            return item.exe().then(res => this.resultPool.push(res));
        }))
        cb && cb();
        return this.resultPool;
    }
}
