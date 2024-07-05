/**
 * ID工具
 */
import SnowflakeIdWorker from "./SnowflakeIdWorker";

class IDUtil {

    /**
     * 生成 UUID
     * @param simple 是否简单的，为 true 时会去掉 “-”
     */
    uuid(simple: boolean = false) {
        let d = new Date().getTime();
        let template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
        if (simple) {
            template = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx";
        }
        return template.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    /**
     * 创建雪花对象，用于获取雪花 ID，注：需自行处理雪花对象的唯一性，因为不同的对象生成的 id 可能会有重复，或者使用 globalSnowflake 获取全局雪花对象
     * @param workerId 机器ID
     * @param dataCenterId 数据中心ID
     */
    snowflake(workerId?: number, dataCenterId?: number) {
        return new SnowflakeIdWorker(workerId, dataCenterId);
    }

    /**
     * 获取全局雪花对象
     * @param workerId 机器ID
     * @param dataCenterId 数据中心ID
     */
    globalSnowflake(workerId?: number, dataCenterId?: number) {
        return SnowflakeIdWorker.global(workerId, dataCenterId);
    }
}

export default new IDUtil();
