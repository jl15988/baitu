import DateTime, { DateField } from "./DateTime";
declare class DateUtil {
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
     * 获取当前时间，格式：yyyy-MM-dd HH:mm:ss
     */
    formatNow(): string;
    /**
     * 获取当前日期，格式：yyyy-MM-dd
     */
    formatToDate(): string;
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
     * @param date 日期
     * @param format 格式
     */
    format(date: string | number | Date | DateTime, format?: string): string;
    /**
     * 获取当月天数
     * @param date 日期
     */
    daysOfMonth(date: Date | DateTime): number;
    /**
     * 获取日期1减日期2的差值
     */
    compare(date1: Date | DateTime, date2: Date | DateTime, dateField?: DateField): number;
    /**
     * 根据日期获取年龄
     * @param date 日期
     */
    age(date: Date | DateTime): number;
}
declare const _default: DateUtil;
export default _default;
