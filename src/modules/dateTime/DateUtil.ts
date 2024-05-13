import DateTime, {DateField} from "./DateTime";
import NumberUtil from "../number/NumberUtil";
import ObjectUtil from "../object/ObjectUtil";

/**
 * 日期工具
 */
export class DateUtil {

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
     * 一星期毫秒值
     */
    static readonly weekMillis: number = this.dayMillis * 7;
    /**
     * 时间戳长度
     */
    static readonly timeStampLen: number = 13;
    /**
     * 简单时间戳长度
     */
    static readonly simpleTimeStampLen: number = 10;

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
    parse(dateTime: string | number | Date | DateTime): DateTime {
        if (!dateTime) {
            return new DateTime();
        }
        if (typeof dateTime === "string") {
            const dateTimeReg = /年|月|日|点|时|分|秒/g;
            const onlyTime = !/年|-|\/|\./g.test(dateTime) && /时|点|:/g.test(dateTime);
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
        } else if (typeof dateTime === "number" && String(dateTime).length === 10) {
            return new DateTime(dateTime * 1000);
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
     * y年，M月份，d日，H小时，m分钟，s秒，q季度，S毫秒，w周
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
            "S": newDate.getMilliseconds(),    //毫秒
            "w": newDate.getDay() // 周
        }
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (newDate.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in timeSource)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (timeSource[k]) : (("00" + timeSource[k]).substr(("" + timeSource[k]).length)));
        return format;
    }

    /**
     * 格式化为yyyy-MM-dd HH:mm:ss格式，默认当前时间
     */
    formatDateTime(date: (string | number | Date | DateTime) = new Date()): string {
        return this.format(date);
    }

    /**
     * 格式化为yyyy-MM-dd，默认当前时间
     */
    formatDate(date: (string | number | Date | DateTime) = new Date()): string {
        return this.format(date, "yyyy-MM-dd");
    }

    /**
     * 获取当月天数
     * @param date 日期
     */
    daysOfMonth(date: Date | DateTime): number {
        return new DateTime(date).daysOfMonth();
    }

    /**
     * 获取当年天数
     */
    daysOfYear(date: Date | DateTime): number {
        return new DateTime(date).daysOfYear();
    }

    /**
     * 是否闰年
     */
    isLeapYear(date: Date | DateTime): boolean {
        return new DateTime(date).isLeapYear();
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
        } else if (DateField.WEEK === dateField) {
            result = diff / DateUtil.weekMillis;
        } else if (DateField.MONTH === dateField || DateField.YEAR === dateField) {
            if (diff < 0) {
                // 若date2大于date1，交换位置
                const tempDate = date1;
                date1 = date2;
                date2 = tempDate;
            }
            let tempDate1 = new DateTime(date1);
            let tempDate2 = new DateTime(date2);

            // 计算两日期月数差值
            const year1 = date1.getFullYear();
            const year2 = date2.getFullYear();
            const month1 = date1.getMonth() + 1;
            const month2 = date2.getMonth() + 1;
            let num = (year1 - year2) * 12 + (month1 - month2);
            // 取天数差值，标识大日期向小日期月份补天数后剩余的天数
            const compareDay = date1.getDate() - date2.getDate();
            if (compareDay === 0) {
                // 天数差值一致，则为最终结果
                result = num;
            } else if (compareDay < 0) {
                // 差值小于零，则说明小日期月份天数补全后，大日期月份天数不够了，所以取大日期的上个月
                const monthDays = tempDate2.offset(DateField.MONTH, -1).daysOfMonth();
                result = num - 1 + (monthDays + compareDay) / monthDays;
            } else {
                // 差值大于零，则直接用差值除大日期月份天数
                const monthDays = tempDate1.daysOfMonth();
                result = num + compareDay / monthDays;
            }
            // 添加符号
            if (diff < 0) {
                result = -result;
            }
        } else {
            return NumberUtil.fixed(diff, 2);
        }
        if (DateField.YEAR === dateField) {
            // 年份直接用月份除12
            result = result / 12;
        }
        return NumberUtil.fixed(result, 2);
    }

    /**
     * 根据日期获取年龄（周岁）
     * @param date 日期
     */
    age(date: Date | DateTime): number {
        const nowDateTime = DateTime.new();
        const nowYear = nowDateTime.getFullYear();
        const nowMonth = nowDateTime.getMonth();
        const birthYear = date.getFullYear();
        const birthMonth = date.getMonth();
        // 现在年-出生日期年
        let age = nowYear - birthYear;
        if (nowMonth === birthMonth) {
            // 若月份相等判断，若当前天小于出生日期天则未到出生日期，则减一
            if (nowDateTime.getDate() < date.getDate()) {
                --age;
            }
        } else if (nowMonth < birthMonth) {
            // 若月份小于出生日期月份，未到出生日期，则减一
            --age;
        }
        return age;
    }

    /**
     * 获取秒数含有多少天、小时、分钟、秒
     * @param secondsValue 秒数
     */
    convertSeconds(secondsValue: number) {
        if (secondsValue === DateUtil.simpleTimeStampLen) {
            secondsValue = secondsValue * 1000;
        }
        // 计算天数
        const days = Math.floor(secondsValue / (60 * 60 * 24));
        secondsValue %= (60 * 60 * 24);
        // 计算小时数
        const hours = Math.floor(secondsValue / (60 * 60));
        secondsValue %= (60 * 60);
        // 计算分钟数
        const minutes = Math.floor(secondsValue / 60);
        secondsValue %= 60;
        // 计算秒数
        const seconds = Math.floor(secondsValue);

        return {
            days,
            hours,
            minutes,
            seconds
        }
    }

    /**
     * 格式化秒数为 xx天xx时xx分xx秒，如果达不到某一单位则不添加
     * @param secondsValue 秒数
     * @param labels 天、小时、分钟、秒的属性名，默认天、时、分、秒
     * @param pad 是否补零
     */
    formatSeconds(secondsValue: number,
                  labels: { day: string, hour: string, minute: string, second: string },
                  pad: boolean = true) {
        const convert = this.convertSeconds(secondsValue);
        const days = convert.days;
        const hours = convert.hours;
        const minutes = convert.minutes;
        const seconds = convert.seconds;

        const defaultLabels = Object.assign({day: '天', hour: '时', minute: '分', second: '秒'}, labels);

        function toPad(n: number) {
            if (n) {
                if (pad) {
                    return n.toString().padStart(2, '0');
                }
                return n;
            }
            return '';
        }

        return ObjectUtil.appendIfNotEmpty(toPad(days), defaultLabels.day)
            + ObjectUtil.appendIfNotEmpty(toPad(hours), defaultLabels.hour)
            + ObjectUtil.appendIfNotEmpty(toPad(minutes), defaultLabels.minute)
            + ObjectUtil.appendIfNotEmpty(toPad(seconds), defaultLabels.second);
    }
}

export default new DateUtil();
