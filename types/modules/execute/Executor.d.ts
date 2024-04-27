/**
 * 执行器
 */
export default class Executor {
    fun: Function | Promise<any>;
    id: string;
    startFun: Function | Promise<any>;
    endFun: Function | Promise<any>;
    constructor(fun: Function | Promise<any>);
    /**
     * 创建新的执行器
     * @param fun 执行方法
     */
    static new(fun: Function | Promise<any>): Executor;
    /**
     * 添加预执行方法
     * @param fun 执行方法
     */
    start(fun: Function | Promise<any>): void;
    /**
     * 添加补充执行方法
     * @param fun 执行方法
     */
    end(fun: Function | Promise<any>): void;
    /**
     * 执行
     */
    exe(): Promise<void>;
}
