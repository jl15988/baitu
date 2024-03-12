import DateTime, {DateField} from "./DateTime";
import NumberUtil from "../number/NumberUtil";

class DateUtil {

    /**
     * 秒毫秒值
     */
    static readonly secondsMillis: number = 1000;
    /**
     * 分钟毫秒值
     */
    static readonly minutesMillis: number = this.secondsMillis * 60;
    /**
     * 小时毫秒值
     */
    static readonly hoursMillis: number = this.minutesMillis * 60;
    /**
     * 天毫秒值
     */
    static readonly dayMillis: number = this.hoursMillis * 24;

    /**
     * 获取当前Date日期
     */
    date(): Date {
        return new Date();
    }

    /**
     * 获取当前DateTime日期
     */
    dateTime(): DateTime {
        return new DateTime();
    }

    /**
     * 获取当前时间戳
     */
    now(): number {
        return Date.now();
    }

    /**
     * 获取当前时间，格式：yyyy-MM-dd HH:mm:ss
     */
    formatNow(): string {
        return this.format(new Date());
    }

    /**
     * 获取当前日期，格式：yyyy-MM-dd
     */
    formatToDate(): string {
        return this.format(new Date(), "yyyy-MM-dd");
    }

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
    parse(dateTime: string | number | Date | DateTime): Date {
        if (!dateTime) {
            return new DateTime();
        }
        if (typeof dateTime === "string") {
            const dateTimeReg = /年|月|日|点|时|分|秒/g;
            const onlyTime = !/年/g.test(dateTime) && /时|点|:/g.test(dateTime);
            let newDateTime = dateTime.replace(dateTimeReg, "").trim();
            const length = newDateTime.length;
            let year = "", month = "", day = "", hour = "", min = "", second = "";
            if (onlyTime) {
                newDateTime = newDateTime.replace(/:/g, "");
                for (let i = 1; i <= newDateTime.length; i++) {
                    const val = newDateTime[i - 1];
                    if (i <= 2) {
                        hour += val;
                    } else if (i <= 4) {
                        min += val;
                    } else if (i <= 6) {
                        second += val;
                    }
                }
                return new DateTime(1970, 0, 1, Number(hour), Number(min), Number(second));
            }
            if (length === "yyyyMMddHHmmss".length
                || length === "yyyyMMddHHmm".length
                || length === "yyyyMMdd".length
                || (dateTimeReg.test(dateTime) && (length === "yyyyMMddHH".length || length === "yyyyMM".length))) {
                for (let i = 1; i <= newDateTime.length; i++) {
                    const val = newDateTime[i - 1];
                    if (i <= 4) {
                        year += val;
                    } else if (i <= 6) {
                        month += val;
                    } else if (i <= 8) {
                        day += val;
                    } else if (i <= 10) {
                        hour += val;
                    } else if (i <= 12) {
                        min += val;
                    } else if (i <= 14) {
                        second += val;
                    }
                }
                return new DateTime(Number(year), month === "" ? 0 : Number(month) - 1, Number(day) || 1, Number(hour), Number(min), Number(second));
            }
            newDateTime = dateTime.replace(/日|秒/g, "").trim();
            newDateTime = newDateTime.replace(/年|月/g, "/").trim();
            newDateTime = newDateTime.replace(/点|时|分/g, ":").trim();
            if (/^\d+$/.test(newDateTime.trim()) && (length === 13 || length === 10)) {
                if (length === 10) {
                    return new DateTime(Number(newDateTime) * 1000);
                }
                return new DateTime(Number(newDateTime));
            }
            // 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
            // 处理 '2022-07-10 01:02:03'，跳过 '2022-07-10T01:02:03'
            if (newDateTime.includes('-') && !newDateTime.includes('T')) {
                return new DateTime(newDateTime.replace(/-/g, '/'));
            }
            return new DateTime(newDateTime);
        }

        return new DateTime(dateTime);
    }

    /**
     * 将参数转为DateTime类型
     * @param dateTime
     */
    toDateTime(dateTime: string | number | Date | DateTime): DateTime {
        return new DateTime(this.parse(dateTime));
    }

    /**
     * 格式化日期，默认格式：yyyy-MM-dd HH:mm:ss
     * @param date 日期
     * @param format 格式
     */
    format(date: string | number | Date | DateTime, format?: string): string {
        if (!format) {
            format = "yyyy-MM-dd HH:mm:ss"
        }
        const newDate = this.parse(date);
        const timeSource = {
            "M+": newDate.getMonth() + 1,     //月份
            "d+": newDate.getDate(),     //日
            "H+": newDate.getHours(),     //小时
            "m+": newDate.getMinutes(),     //分
            "s+": newDate.getSeconds(),     //秒
            "q+": Math.floor((newDate.getMonth() + 3) / 3), //季度
            "S": newDate.getMilliseconds()    //毫秒
        }
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (newDate.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in timeSource)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (timeSource[k]) : (("00" + timeSource[k]).substr(("" + timeSource[k]).length)));
        return format;
    }

    /**
     * 获取当月天数
     * @param date 日期
     */
    daysOfMonth(date: Date | DateTime): number {
        return new DateTime(date).daysOfMonth();
    }

    /**
     * 获取日期1减日期2的差值
     */
    compare(date1: Date | DateTime, date2: Date | DateTime, dateField?: DateField): number {
        const time1 = date1.getTime();
        const time2 = date2.getTime();
        const diff = time1 - time2;
        let result = diff;
        if (DateField.SECONDS === dateField) {
            result = diff / DateUtil.secondsMillis;
        } else if (DateField.MINUTES === dateField) {
            result = diff / DateUtil.minutesMillis;
        } else if (DateField.HOURS === dateField) {
            result = diff / DateUtil.hoursMillis;
        } else if (DateField.DAY === dateField) {
            result = diff / DateUtil.dayMillis;
        } else if (DateField.MONTH === dateField || DateField.YEAR) {
            const month1 = date1.getMonth();
            const month2 = date2.getMonth();
            const day1 = date1.getDate();
            const day2 = date2.getDate();
            const days = this.daysOfMonth(date2);
            result = (day1 - day2) / days;
            if (month1 !== month2) {
                result += month1 - month2;
            }
        } else if (DateField.YEAR === dateField) {
            const year1 = date1.getFullYear();
            const year2 = date2.getFullYear();
            result = result / 12 + year1 - year2;
        } else {
            return diff;
        }
        return NumberUtil.fixed(result, 1);
    }

    /**
     * 根据日期获取年龄
     * @param date 日期
     */
    age(date: Date | DateTime): number {
        return NumberUtil.floor(this.compare(new Date(), date, DateField.YEAR));
    }
}

export default new DateUtil();
