import DateTime from "./DateTime";
declare class DateUtil {
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
     * @param dateTime
     */
    parse(dateTime: string | number | Date | DateTime): Date;
    /**
     * 将参数转为DateTime类型
     * @param dateTime
     */
    toDateTime(dateTime: string | number | Date | DateTime): DateTime;
    format(date: string | number | Date | DateTime, format?: string): string;
}
declare const _default: DateUtil;
export default _default;
