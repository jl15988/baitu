export class ThreadPool {
    pool: Promise<any>[] = [];
    resultPool: any[] = [];

    add(executor: Function | Promise<any>) {
        if (executor instanceof Promise) {
            this.pool.push(executor);
        } else {
            this.pool.push(new Promise((resolve, reject) => {
                resolve(executor());
            }));
        }
    }

    exe() {
        for (let executor of this.pool) {
            try {
                executor.then(res => {
                    this.resultPool.push(res);
                })
            } catch (e) {
                this.resultPool.push(e);
            }
        }
    }
}
