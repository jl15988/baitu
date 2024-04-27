import IDUtil from "../common/IDUtil";
import Threads from "./Executes";


/**
 * 执行器
 */
export default class Executor {

    // 执行者
    fun: Function | Promise<any>;
    // 执行器id
    id: string;
    // 预执行
    startFun: Function | Promise<any>;
    // 补充执行
    endFun: Function | Promise<any>;

    constructor(fun: Function | Promise<any>) {
        this.fun = fun;
        this.id = IDUtil.uuid();
    }

    /**
     * 创建新的执行器
     * @param fun 执行方法
     */
    static new(fun: Function | Promise<any>): Executor {
        return new Executor(fun);
    }

    /**
     * 添加预执行方法
     * @param fun 执行方法
     */
    start(fun: Function | Promise<any>) {
        this.startFun = fun;
    }

    /**
     * 添加补充执行方法
     * @param fun 执行方法
     */
    end(fun: Function | Promise<any>) {
        this.endFun = fun;
    }

    /**
     * 执行
     */
    async exe(): Promise<void> {
        let result;
        if (this.startFun) {
            await Threads.exe(this.startFun)
        }
        if (this.fun instanceof Promise) {
            result = await this.fun;
        } else {
            result = await this.fun();
        }
        if (this.endFun) {
            await Threads.exe(this.endFun)
        }
        return result;
    }
}
