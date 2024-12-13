import DateTime, {DateField, WeekDayType} from "./DateTime";
import NumberUtil from "../number/NumberUtil";
import ObjectUtil from "../object/ObjectUtil";

/**
 * 日期工具
 */
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
     * 将特定格式转为 DateTime
     * 支持格式：
     * - yyyy年MM月dd日HH(时/点)mm分ss秒
     * - yyyy年MM月dd日 HH(时/点)mm分ss秒
     * - yyyy年MM月dd日HH(时/点)mm分
     * - yyyy年MM月dd日HH(时/点)
     * - yyyy年MM月dd日
     * - yyyy年MM月
     * - yyyy年
     * - yyyyMMddHHmmss
     * - yyyyMMddHHmm
     * - 不支持 yyyyMMddHH，将判定为 10 位的时间戳
     * - yyyyMMdd
     * - 不支持 yyyyMM
     * - yyyy
     * - yyyy-MM-dd HH:mm:ss
     * - yyyy/MM/dd HH:mm:ss
     * - yyyy.MM.dd HH:mm:ss
     * - yyyy-MM-ddTHH:mm:ss
     * - yyyy-MM-dd HH:mm
     * - yyyy/MM/dd HH:mm
     * - yyyy.MM.dd HH:mm
     * - yyyy-MM-dd
     * - yyyy/MM/dd
     * - yyyy.MM.dd
     * - yyyy-MM
     * - yyyy/MM
     * - yyyy.MM
     * - HH:mm:ss
     * - HH(时/点)mm分ss秒
     * - HH:mm
     * - HH(时/点)mm分
     * - HH(时/点)
     * - 13 位或 10 位时间戳
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
     * 格式化日期，默认格式：yyyy-MM-dd HH:mm:ss
     *
     * y年，M月份，d日，H小时，m分钟，s秒，q季度，S毫秒，w周
     * @param date 日期
     * @param format 格式
     */
    format(date: string | number | Date | DateTime, format: string = "yyyy-MM-dd HH:mm:ss"): string {
        const newDate = this.parse(date);
        const objectValues = newDate.objectValues();
        const dateKeyMap = {
            // 年份
            "yyyy": objectValues.year,
            "yy": objectValues.simpleYear,
            // 月份
            "MM": objectValues.fullMonth,
            "M": objectValues.month,
            // 日
            "dd": objectValues.fullDay,
            "d": objectValues.day,
            // 小时
            "HH": objectValues.fullHours,
            "H": objectValues.hours,
            // 分
            "mm": objectValues.fullMinutes,
            "m": objectValues.minutes,
            // 秒
            "ss": objectValues.fullSeconds,
            "s": objectValues.seconds,
            // 季度
            "q": objectValues.quarter,
            // 毫秒
            "SSS": objectValues.milliseconds,
            // 周
            "w": objectValues.week,
            // 时区偏移
            "Z": newDate.timeZone(),
            "X": newDate.timeZone(true)
        }
        const quotedIndex: number[] = []
        const matchMap: {
            match: string
            index: number
            length: number
        }[] = []
        let match;
        // const regex = /"([^"]*)"|'([^']*)'/g;
        const regex = /\[([^\[]*)]/g;
        while ((match = regex.exec(format)) !== null) {
            quotedIndex.push(match.index)
            const len = match[0].length
            for (let i = 1; i < len - 1; i++) {
                quotedIndex.push(match.index + i)
            }
            matchMap.push({
                match: match[0],
                index: match.index,
                length: match[0].length
            })
        }
        return this.formatWithMap(format, dateKeyMap, ({match, index, formatedVal}) => {
            if (quotedIndex.includes(index - 1)) {
                return match;
            }
            return formatedVal;
        }).replace(regex, (m) => {
            return m.substring(1, m.length - 1);
        })
    }

    // /**
    //  * 格式化日期，默认格式：yyyy-MM-dd HH:mm:ss
    //  *
    //  * y年，M月份，d日，H小时，m分钟，s秒，q季度，S毫秒，w周
    //  * @param date 日期
    //  * @param format 格式
    //  */
    // format(date: string | number | Date | DateTime, format: string = "yyyy-MM-dd HH:mm:ss"): string {
    //     const newDate = this.parse(date);
    //     const objectValues = newDate.objectValues();
    //     const dateKeyMap = {
    //         "y+": objectValues.year,
    //         // 月份
    //         "M+": objectValues.month,
    //         // 日
    //         "d+": objectValues.day,
    //         // 小时
    //         "H+": objectValues.hours,
    //         // 分
    //         "m+": objectValues.minutes,
    //         // 秒
    //         "s+": objectValues.seconds,
    //         // 季度
    //         "q+": Math.floor((objectValues.monthIndex + 3) / 3),
    //         // 毫秒
    //         "SSS": objectValues.milliseconds,
    //         // 周
    //         "w+": objectValues.week
    //     }
    //     return this.formatWithMap(format, dateKeyMap, (dateKey, match, formatedVal) => {
    //         if ('y' === dateKey) {
    //             // 对两位数年份单独处理
    //             if (match[0].length === 2) {
    //                 return formatedVal.substring(2);
    //             }
    //         }
    //         return formatedVal;
    //     })
    //     // return format.replace(/(y)+|(M)+|(d)+/g, (match, t) => {
    //     //     // @ts-ignore
    //     //     const val = timeSource[t];
    //     //     if (/(y+)/.test(match)) {
    //     //         if ('yy' === match) {
    //     //             return val.toString().substring(2)
    //     //         }
    //     //         return val
    //     //     }
    //     //     if (val) {
    //     //         if (match.length === 1) {
    //     //             return val
    //     //         }
    //     //         return val.toString().padStart(2, '0');
    //     //     }
    //     //     return match;
    //     // })
    //     // if (/(y+)/.test(format))
    //     //     format = format.replace(RegExp.$1, (objectValues.year + "").substr(4 - RegExp.$1.length));
    //     // for (let k in timeSource)
    //     //     if (new RegExp("(" + k + ")").test(format))
    //     //         format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (timeSource[k]) : (("00" + timeSource[k]).substr(("" + timeSource[k]).length)));
    //     // return format;
    // }

    /**
     * 根据日期关键字映射格式化格式字符串
     * @param format 格式字符串
     * @param dateKeyMap 日期关键字映射
     * @param valueHandler 格式化值处理函数，对格式化值进行最后的处理
     */
    formatWithMap<M extends Record<string, string | number | (() => string | number)>>(
        format: string,
        dateKeyMap: M,
        valueHandler?: (params: {
            dateKey: keyof M,
            match: string,
            index: number,
            formatedVal: string
        }) => string
    ) {
        const funMapVal: Record<keyof M, string | number> = {} as Record<keyof M, string | number>
        for (let dateKey in dateKeyMap) {
            const typeReg = new RegExp(`${dateKey}`, 'g');
            format = format.replace(typeReg, (m, index) => {
                const mapVal = dateKeyMap[dateKey];
                if (ObjectUtil.isNull(mapVal)) return m;

                let val: string | number = '';
                if (typeof mapVal === 'function') {
                    // 处理函数类型
                    if (funMapVal.hasOwnProperty(dateKey)) {
                        val = funMapVal[dateKey];
                    } else {
                        funMapVal[dateKey] = mapVal();
                    }
                } else {
                    val = mapVal;
                }
                let formatedVal = m.length === 1 ? val.toString() : val.toString().padStart(2, '0');
                if (valueHandler) {
                    formatedVal = valueHandler({dateKey, match: m, index, formatedVal});
                }
                return formatedVal;
            })
            // const match = typeReg.exec(format);
            // if (match) {
            //     const mapVal = dateKeyMap[dateKey];
            //     if (ObjectUtil.isEmpty(mapVal)) continue;
            //
            //     let val: string | number = '';
            //     if (typeof mapVal === 'function') {
            //         // 处理函数类型
            //         if (funMapVal.hasOwnProperty(dateKey)) {
            //             val = funMapVal[dateKey];
            //         } else {
            //             funMapVal[dateKey] = mapVal();
            //         }
            //     } else {
            //         val = mapVal;
            //     }
            //     let formatedVal = match[0].length === 1 ? val.toString() : val.toString().padStart(2, '0');
            //     if (valueHandler) {
            //         formatedVal = valueHandler(dateKey, match, formatedVal, format);
            //     }
            //     format = StrUtil.replaceBetween(format, match.index, Math.min(match.index + match[0].length, format.length), formatedVal);
            // }
        }
        return format;
    }

    /**
     * 格式化为 yyyy-MM-dd HH:mm:ss 格式，默认当前时间
     * @param date 要格式化的日期
     */
    formatDateTime(date: (string | number | Date | DateTime) = new Date()): string {
        return this.format(date);
    }

    /**
     * 格式化为 yyyy-MM-dd，默认当前时间
     * @param date 要格式化的日期
     */
    formatDate(date: (string | number | Date | DateTime) = new Date()): string {
        return this.format(date, "yyyy-MM-dd");
    }

    /**
     * 格式化为 HH:mm:ss，默认当前时间
     * @param date 要格式化的日期
     */
    formatTime(date: (string | number | Date | DateTime) = new Date()): string {
        return this.format(date, "HH:mm:ss");
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
     * @param date 日期
     */
    daysOfYear(date: Date | DateTime): number {
        return new DateTime(date).daysOfYear();
    }

    /**
     * 是否闰年
     * @param date 日期
     */
    isLeapYear(date: Date | DateTime): boolean {
        return new DateTime(date).isLeapYear();
    }

    /**
     * 获取日期 1 减日期 2 的差值
     * @param date1 被减日期
     * @param date2 减日期
     * @param dateField 日期类型，默认毫秒
     */
    compare(date1: Date | DateTime, date2: Date | DateTime, dateField: keyof typeof DateField = "ms"): number {
        if (date1 instanceof DateTime) {
            date1 = date1.date
        }
        if (date2 instanceof DateTime) {
            date2 = date2.date
        }
        const time1 = date1.getTime();
        const time2 = date2.getTime();
        const diff = time1 - time2;
        let result = diff;
        if (dateField && DateField.ms !== DateField[dateField]) {
            const dateType = DateField[dateField]
            if (DateField.sec === dateType) {
                result = diff / DateUtil.secondsMillis;
            } else if (DateField.min === dateType) {
                result = diff / DateUtil.minutesMillis;
            } else if (DateField.hours === dateType) {
                result = diff / DateUtil.hoursMillis;
            } else if (DateField.day === dateType) {
                result = diff / DateUtil.dayMillis;
            } else if (DateField.week === dateType) {
                result = diff / DateUtil.weekMillis;
            } else if (DateField.month === dateType || DateField.year === dateType) {
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
                    const monthDays = tempDate2.offset("month", -1).daysOfMonth();
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
            }
        } else {
            return NumberUtil.fixed(diff, 2);
        }
        if (DateField.year === DateField[dateField]) {
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
        const dateObjectValues = new DateTime(date).objectValues()
        const nowDateTime = new DateTime();
        const objectValues = nowDateTime.objectValues();
        const nowYear = objectValues.year;
        const nowMonth = objectValues.monthIndex;
        const birthYear = dateObjectValues.year;
        const birthMonth = dateObjectValues.monthIndex;
        // 现在年-出生日期年
        let age = nowYear - birthYear;
        if (nowMonth === birthMonth) {
            // 若月份相等判断，若当前天小于出生日期天则未到出生日期，则减一
            if (objectValues.day < dateObjectValues.day) {
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
     * @param sec 秒数
     */
    convertSeconds(sec: number) {
        if (sec === DateUtil.simpleTimeStampLen) {
            sec = sec * 1000;
        }
        // 计算天数
        const days = Math.floor(sec / (60 * 60 * 24));
        sec %= (60 * 60 * 24);
        // 计算小时数
        const hours = Math.floor(sec / (60 * 60));
        sec %= (60 * 60);
        // 计算分钟数
        const minutes = Math.floor(sec / 60);
        sec %= 60;
        // 计算秒数
        const seconds = Math.floor(sec);

        return {
            days,
            hours,
            minutes,
            seconds
        }
    }

    /**
     * 获取日期为当月第几个星期几
     * @param date 日期
     */
    getWeekdayWhichOfMonth(date?: Date | DateTime) {
        date = date || new Date();
        // 获取月份的第一天
        let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

        // 获取指定日期的星期几（0代表星期日，1代表星期一，...，6代表星期六）
        let targetWeekday = date.getDay();

        // 初始化计数器
        let instanceCount = 0;

        // 遍历整个月，找到每个星期几第一次出现的位置
        let currentDate = new Date(firstDayOfMonth);
        while (currentDate.getMonth() === date.getMonth()) {
            // 如果当前日期是目标星期几
            if (currentDate.getDay() === targetWeekday) {
                instanceCount++;

                // 如果当前日期就是指定的日期，则返回实例数
                if (currentDate.getDate() === date.getDate()) {
                    return instanceCount;
                }
            }

            // 转到下一天
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // 如果函数运行到这里，说明日期不在目标月份中（这通常不会发生，除非输入错误）
        throw new Error("date error");
    }

    /**
     * 获取年份中的所有周末（周六周日）日期
     * @param year 年份
     */
    getAllWeekend(year: number): string[] {
        const weekEndList: string[] = []
        for (let i = 0; i <= 11; i++) {
            const monthDateTime = new DateTime(year, i)
            for (let j = 1; j <= monthDateTime.getMonthDayNumber(); j++) {
                const dayDateTime = new DateTime(year, i, j)
                if (dayDateTime.isWeekEnd()) {
                    weekEndList.push(dayDateTime.formatDate())
                }
            }
        }
        return weekEndList
    }

    /**
     * 获取当前日期当天开始时间
     * @param date 日期
     */
    beginOfDay(date: Date | DateTime): DateTime {
        const dateTime = new DateTime(date);
        return dateTime.beginOfDay();
    }

    /**
     * 获取当前日期当天结束时间
     * @param date 日期
     */
    endOfDay(date: Date | DateTime): DateTime {
        const dateTime = new DateTime(date);
        return dateTime.endOfDay();
    }

    /**
     * 获取当前日期当周开始时间
     * @param date 日期
     * @param firstWeek 设置周起始星期，0 为周日，6 为周六
     */
    beginOfWeek(date: Date | DateTime, firstWeek: WeekDayType): DateTime {
        const dateTime = new DateTime(date);
        dateTime.setFirstWeek(firstWeek);
        return dateTime.beginOfWeek();
    }

    /**
     * 获取当前日期当周结束时间
     * @param date 日期
     * @param firstWeek 设置周起始星期，0 为周日，6 为周六
     */
    endOfWeek(date: Date | DateTime, firstWeek: WeekDayType): DateTime {
        const dateTime = new DateTime(date);
        dateTime.setFirstWeek(firstWeek);
        return dateTime.endOfWeek();
    }

    /**
     * 获取当前日期当月第一天时间
     * @param date 日期
     */
    beginOfMonth(date: Date | DateTime): DateTime {
        const dateTime = new DateTime(date);
        return dateTime.beginOfMonth();
    }

    /**
     * 获取当前日期当月最后一天时间
     * @param date 日期
     */
    endOfMonth(date: Date | DateTime): DateTime {
        const dateTime = new DateTime(date);
        return dateTime.endOfMonth();
    }

    /**
     * 获取当前时间当年开始时间
     * @param date 日期
     */
    beginOfYear(date: Date | DateTime): DateTime {
        const dateTime = new DateTime(date);
        return dateTime.beginOfYear();
    }

    /**
     * 获取当前日期当年结束时间
     * @param date 日期
     */
    endOfYear(date: Date | DateTime): DateTime {
        const dateTime = new DateTime(date);
        return dateTime.endOfYear();
    }

    /**
     * 获取纪元日
     * @param date 日期
     */
    getEpochDay(date: Date | DateTime): number {
        // Unix纪元是1970年1月1日UTC
        const epochStart = new Date(1970, 0, 1); // 注意月份是从0开始的，所以0代表1月
        // 计算时间差（毫秒）
        const diff = date.getTime() - epochStart.getTime();
        // 将毫秒转换为天
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }
}

export default new DateUtil();
