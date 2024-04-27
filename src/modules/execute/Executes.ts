/**
 * 执行器工具
 */
class Executes {

    /**
     * 睡眠，需配合 await 使用
     * @param millis 睡眠时长（毫秒）
     */
    sleep(millis: number): Promise<unknown> {
        return new Promise(resolve => setTimeout(resolve, millis));
    }

    /**
     * 转 Promise
     * @param fun 执行方法
     */
    toPromise(fun: Function | Promise<any>) {
        if (fun instanceof Promise) {
            return fun;
        } else {
            return new Promise((resolve, reject) => {
                try {
                    const result = fun();
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            });
        }
    }

    /**
     * 转 Promise 闭包
     * @param fun 执行方法
     */
    toPromiseClosure(fun: Function | Promise<any>) {
        return async () => {
            return await this.toPromise(fun)
        }
    }

    /**
     * 自动判断并执行方法
     * @param fun 执行方法
     */
    async exe(fun: Function | Promise<any>): Promise<any> {
        if (fun instanceof Promise) {
            return await fun;
        }
        return fun();
    }

}

export default new Executes();
