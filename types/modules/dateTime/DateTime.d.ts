/**
 * 日期属性
 */
export declare enum DateField {
    YEAR = "year",
    MONTH = "month",
    DAY = "day",
    WEEK = "week",
    HOURS = "hours",
    MINUTES = "minutes",
    SECONDS = "seconds"
}
/**
 * 周数
 */
export declare enum WeekDay {
    SUN = 0,
    MON = 1,
    TUE = 2,
    WED = 3,
    THUR = 4,
    FRI = 5,
    SAT = 6
}
declare class DateTime extends Date {
    firstWeek: number;
    static readonly DateField: typeof DateField;
    static readonly WeekDay: typeof WeekDay;
    static create(): DateTime;
    static create(value: number | string): DateTime;
    static create(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): DateTime;
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
    format(format: string): string;
    /**
     * 格式化当前日期为年-月-日
     * @returns {string}
     */
    formatDate(): string;
    /**
     * 格式化当前日期为年-月-日 时:分:秒
     * @returns {string}
     */
    formatDateTime(): string;
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
    setFirstWeek(type: WeekDay): void;
    /**
     * 日期偏移操作
     * @param type 偏移类型，见：{@link DateField}
     * @param offset 偏移大小
     * @returns {DateTime}
     */
    offset(type: DateField, offset: number): DateTime;
}
export default DateTime;
