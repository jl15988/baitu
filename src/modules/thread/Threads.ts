const globalThreadPool = [];

/**
 * 线程工具
 */
class Threads {

    /**
     * 睡眠，需配合 await 使用
     * @param millis 睡眠时长（毫秒）
     */
    sleep(millis: number) {
        return new Promise(resolve => setTimeout(resolve, millis));
    }

    
}

export default new Threads();
