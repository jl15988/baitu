/**
 * 雪花ID生成器
 */
export default class SnowflakeIdWorker {
    /**
     * 机器ID
     */
    workerId: number;
    /**
     * 数据中心ID
     */
    dataCenterId: number;
    /**
     * 序列号
     */
    sequence: number;
    lastTimestamp: number;
    /**
     * 开始时间戳
     */
    startTimestamp: number;
    /**
     * 机器ID占用的位数
     */
    workerIdBits: number;
    /**
     * 数据中心ID占用的位数
     */
    datacenterIdBits: number;
    maxWorkerId: number;
    /**
     * 序列号占用的位数
     */
    sequenceBits: number;
    /**
     * 机器ID偏移
     */
    workerIdShift: number;
    /**
     * 时间戳左移
     */
    timestampLeftShift: number;
    /**
     * 序列号掩码
     */
    sequenceMask: number;
    timeOffset: number;
    constructor(workerId?: number, dataCenterId?: number);
    _tilNextMillis(lastTimestamp: any): number;
    _timeGen(): number;
    nextId(): string;
}
