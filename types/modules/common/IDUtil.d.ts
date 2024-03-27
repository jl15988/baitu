/**
 * ID工具
 */
import SnowflakeIdWorker from "./SnowflakeIdWorker";
declare class IDUtil {
    /**
     * 生成UUID
     * @param simple 是否简单的，为true时会去掉“-”
     */
    uuid(simple?: boolean): string;
    /**
     * 获取雪花对象
     * @param workerId 机器ID
     * @param dataCenterId 数据中心ID
     */
    snowflake(workerId?: number, dataCenterId?: number): SnowflakeIdWorker;
}
declare const _default: IDUtil;
export default _default;
