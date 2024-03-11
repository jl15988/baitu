/**
 * 日期属性
 */
export declare class DateField {
    static readonly YEAR: "year";
    static readonly MONTH: "month";
    static readonly DAY: "day";
    static readonly WEEK: "week";
    static readonly HOURS: "hours";
    static readonly MINUTES: "minutes";
    static readonly SECONDS: "seconds";
}
/**
 * 周数
 */
export declare const WeekDay: {
    SUN: number;
    MON: number;
    TUE: number;
    WED: number;
    THUR: number;
    FRI: number;
    SAT: number;
};
declare class DateTime extends Date {
    firstWeek: number;
    /**
     * 日期年，月，日，周，时，分，秒对象数据，与Date的get获取的一致
     */
    objectValues(): {
        [key: string]: number;
    };
    /**
     * 转为年-月-日类型的日期
     * @returns {DateTime}
     */
    toDate(): DateTime;
    /**
     * 格式化当前日期为年-月-日
     * @returns {string}
     */
    formatDate(): DateTime;
    /**
     * 格式化当前日期为年-月-日 时:分:秒
     * @returns {string}
     */
    formatDateTime(): DateTime;
    /**
     * 获取当前日期当天开始时间
     * @returns {DateTime}
     */
    beginOfDay(): DateTime;
    /**
     * 获取当前日期当天结束时间
     * @returns {DateTime}
     */
    endOfDay(): DateTime;
    /**
     * 获取当前日期当周开始时间
     * @returns {DateTime}
     */
    beginOfWeek(): DateTime;
    /**
     * 获取当前日期当周结束时间
     * @returns {DateTime}
     */
    endOfWeek(): DateTime;
    /**
     * 获取当前日期当月第一天时间
     * @returns {Date}
     */
    beginOfMonth(): DateTime;
    /**
     * 获取当前日期当月最后一天时间
     * @returns {Date}
     */
    endOfMonth(): DateTime;
    /**
     * 获取当前时间当年开始时间
     * @returns {DateTime}
     */
    beginOfYear(): DateTime;
    /**
     * 获取当前日期当年结束时间
     * @returns {DateTime}
     */
    endOfYear(): DateTime;
    /**
     * 设置周开始周数
     * @param type 周数，见：{@link WeekDay}
     */
    setFirstWeek(type: any): void;
    /**
     * 日期偏移操作
     * @param type 偏移类型，见：{@link DateField}
     * @param offset 偏移大小
     * @returns {DateTime}
     */
    offset(type: DateField, offset: number): DateTime;
}
export default DateTime;
