import DateTime, { DateField } from "./DateTime";
/**
 * 日期工具
 */
export declare class DateUtil {
    /**
     * 秒毫秒值
     */
    static readonly secondsMillis: number;
    /**
     * 分钟毫秒值
     */
    static readonly minutesMillis: number;
    /**
     * 小时毫秒值
     */
    static readonly hoursMillis: number;
    /**
     * 天毫秒值
     */
    static readonly dayMillis: number;
    /**
     * 一星期毫秒值
     */
    static readonly weekMillis: number;
    /**
     * 时间戳长度
     */
    static readonly timeStampLen: number;
    /**
     * 简单时间戳长度
     */
    static readonly simpleTimeStampLen: number;
    /**
     * 获取当前Date日期
     */
    date(): Date;
    /**
     * 获取当前DateTime日期
     */
    dateTime(): DateTime;
    /**
     * 获取当前时间戳
     */
    now(): number;
    /**
     * 将特定格式转为DateTime
     * 支持格式：
     * yyyy年MM月dd日HH(时/点)mm分ss秒
     * yyyy年MM月dd日 HH(时/点)mm分ss秒
     * yyyy年MM月dd日HH(时/点)mm分
     * yyyy年MM月dd日HH(时/点)
     * yyyy年MM月dd日
     * yyyy年MM月
     * yyyy年
     * yyyyMMddHHmmss
     * yyyyMMddHHmm
     * 不支持yyyyMMddHH，将判定为10位的时间戳
     * yyyyMMdd
     * 不支持yyyyMM
     * yyyy
     * yyyy-MM-dd HH:mm:ss
     * yyyy/MM/dd HH:mm:ss
     * yyyy.MM.dd HH:mm:ss
     * yyyy-MM-ddTHH:mm:ss
     * yyyy-MM-dd HH:mm
     * yyyy/MM/dd HH:mm
     * yyyy.MM.dd HH:mm
     * yyyy-MM-dd
     * yyyy/MM/dd
     * yyyy.MM.dd
     * yyyy-MM
     * yyyy/MM
     * yyyy.MM
     * HH:mm:ss
     * HH(时/点)mm分ss秒
     * HH:mm
     * HH(时/点)mm分
     * HH(时/点)
     * 13位或10位时间戳
     * @param dateTime 日期
     */
    parse(dateTime: string | number | Date | DateTime): Date;
    /**
     * 将参数转为DateTime类型
     * @param dateTime
     */
    toDateTime(dateTime: string | number | Date | DateTime): DateTime;
    /**
     * 格式化日期，默认格式：yyyy-MM-dd HH:mm:ss
     * y年，M月份，d日，H小时，m分钟，s秒，q季度，S毫秒，w周
     * @param date 日期
     * @param format 格式
     */
    format(date: string | number | Date | DateTime, format?: string): string;
    /**
     * 格式化为yyyy-MM-dd HH:mm:ss格式，默认当前时间
     */
    formatDateTime(date?: (string | number | Date | DateTime)): string;
    /**
     * 格式化为yyyy-MM-dd，默认当前时间
     */
    formatDate(date?: (string | number | Date | DateTime)): string;
    /**
     * 获取当月天数
     * @param date 日期
     */
    daysOfMonth(date: Date | DateTime): number;
    /**
     * 获取当年天数
     */
    daysOfYear(date: Date | DateTime): number;
    /**
     * 是否闰年
     */
    isLeapYear(date: Date | DateTime): boolean;
    /**
     * 获取日期1减日期2的差值
     */
    compare(date1: Date | DateTime, date2: Date | DateTime, dateField?: DateField): number;
    /**
     * 根据日期获取年龄（周岁）
     * @param date 日期
     */
    age(date: Date | DateTime): number;
    /**
     * 获取秒数含有多少天、小时、分钟、秒
     * @param secondsValue 秒数
     */
    convertSeconds(secondsValue: number): {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
    /**
     * 格式化秒数为 xx天xx小时xx分钟xx秒，如果达不到某一单位则不添加
     * @param secondsValue 秒数
     * @param labels 天、小时、分钟、秒的属性名，默认天、小时、分钟、秒
     * @param pad 是否补零
     */
    formatSeconds(secondsValue: number, labels: {
        day: string;
        hour: string;
        minute: string;
        second: string;
    }, pad?: boolean): string;
}
declare const _default: DateUtil;
export default _default;
