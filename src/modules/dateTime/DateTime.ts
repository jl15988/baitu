import DateUtil from "./DateUtil";
import StrUtil from "../string/StrUtil";

/**
 * 日期属性
 */
export enum DateField {
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
export enum WeekDay {
    SUN = 0,
    MON = 1,
    TUE = 2,
    WED = 3,
    THUR = 4,
    FRI = 5,
    SAT = 6
}

/**
 * 月份属性
 */
export enum MonthField {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}

/**
 * DateTime数据对象
 */
export type DateTimeObjectValues = {
    /**
     * 年
     */
    year: number,
    /**
     * 月下标
     */
    monthIndex: number,
    /**
     * 月
     */
    month: number,
    /**
     * 日
     */
    day: number,
    /**
     * 星期
     */
    week: number,
    /**
     * 小时
     */
    hours: number,
    /**
     * 分钟
     */
    minutes: number,
    /**
     * 秒
     */
    seconds: number,
    /**
     * 毫秒
     */
    milliseconds: number
}

/**
 * 日期时间对象
 */
class DateTime {
    firstWeek: number = 0
    date: Date

    constructor();
    constructor(value: string | number | DateTime | Date);
    constructor(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number);

    constructor(yearOrValue?: number | string | DateTime | Date, monthIndex?: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number) {
        if (arguments.length === 0) {
            this.date = new Date()
            return this;
        }
        if (arguments.length === 1) {
            if (yearOrValue instanceof Date) {
                this.date = new Date(yearOrValue);
            } else if (yearOrValue instanceof DateTime) {
                this.date = new Date(yearOrValue.date);
            } else {
                this.date = new Date(yearOrValue!);
            }
            return this;
        }
        switch (arguments.length) {
            case 2:
                this.date = new Date(<number>yearOrValue, monthIndex!);
                return this;
            case 3:
                this.date = new Date(<number>yearOrValue, monthIndex!, date);
                return this;
            case 4:
                this.date = new Date(<number>yearOrValue, monthIndex!, date, hours);
                return this;
            case 5:
                this.date = new Date(<number>yearOrValue, monthIndex!, date, hours, minutes);
                return this;
            case 6:
                this.date = new Date(<number>yearOrValue, monthIndex!, date, hours, minutes, seconds);
                return this;
            case 7:
                this.date = new Date(<number>yearOrValue, monthIndex!, date, hours, minutes, seconds, ms);
                return this;
            default:
                this.date = new Date();
        }
        return this;
    }

    static create(): DateTime;
    static create(value: number | string): DateTime;
    static create(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): DateTime;

    static create(yearOrValue?: number | string, month?: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number) {
        if (arguments.length === 0) {
            return new DateTime();
        }
        if (this.arguments.length === 1) {
            return new DateTime(yearOrValue!);
        }
        return new DateTime(<number>yearOrValue, month! - 1, date, hours, minutes, seconds, ms);
    }

    /**
     * 日期年，月，日，周，时，分，秒对象数据
     */
    objectValues(): DateTimeObjectValues {
        const year = this.date.getFullYear();
        const monthIndex = this.date.getMonth();
        const day = this.date.getDate();
        const week = this.date.getDay();
        const hours = this.date.getHours();
        const minutes = this.date.getMinutes();
        const seconds = this.date.getSeconds();
        const milliseconds = this.date.getMilliseconds();
        return {
            year,
            monthIndex,
            month: (monthIndex + 1),
            day,
            week,
            hours,
            minutes,
            seconds,
            milliseconds
        }
    }

    /**
     * 转为年-月-日类型的日期
     * @returns {DateTime}
     */
    toDate(): DateTime {
        const values = this.objectValues();
        return new DateTime(values.year, values.monthIndex, values.day);
    }

    /**
     * 转为时-分-秒类型的时间
     * @returns {DateTime}
     */
    toTime(): DateTime {
        const dateTime = new DateTime(0);
        const values = this.objectValues();
        dateTime.date.setHours(values.hours);
        dateTime.date.setMinutes(values.minutes);
        dateTime.date.setSeconds(values.seconds);
        return dateTime;
    }

    /**
     * 格式化日期，默认格式：yyyy-MM-dd HH:mm:ss
     *
     * y年，M月份，d日，H小时，m分钟，s秒，q季度，S毫秒，w周
     * @param format 格式
     */
    format(format?: string) {
        return DateUtil.format(this, format);
    }

    /**
     * 格式化当前日期为年-月-日
     * @returns {string}
     */
    formatDate(): string {
        return this.format("yyyy-MM-dd");
    }

    /**
     * 格式化当前日期为年-月-日 时:分:秒
     * @returns {string}
     */
    formatDateTime(): string {
        return this.format("yyyy-MM-dd HH:mm:ss");
    }

    /**
     * 获取当前日期当天开始时间
     * @returns {DateTime}
     */
    beginOfDay(): DateTime {
        const values = this.objectValues();
        return new DateTime(values.year, values.monthIndex, values.day, 0, 0, 0);
    }

    /**
     * 获取当前日期当天结束时间
     * @returns {DateTime}
     */
    endOfDay(): DateTime {
        const values = this.objectValues();
        return new DateTime(values.year, values.monthIndex, values.day, 23, 59, 59, 999);
    }

    /**
     * 获取当前日期当周开始时间
     * @returns {DateTime}
     */
    beginOfWeek(): DateTime {
        const values = this.objectValues();
        const extra = this.firstWeek || 0;
        return new DateTime(values.year, values.monthIndex, values.day - values.week + extra, 0, 0, 0);
    }

    /**
     * 获取当前日期当周结束时间
     * @returns {DateTime}
     */
    endOfWeek(): DateTime {
        const values = this.objectValues();
        const extra = this.firstWeek || 0;
        return new DateTime(values.year, values.monthIndex, values.day + (6 - values.week + extra), 23, 59, 59);
    }

    /**
     * 获取当前日期当月第一天时间
     * @returns {Date}
     */
    beginOfMonth(): DateTime {
        const values = this.objectValues();
        return new DateTime(values.year, values.monthIndex, 1, 0, 0, 0)
    }

    /**
     * 获取当前日期当月最后一天时间
     * @returns {Date}
     */
    endOfMonth(): DateTime {
        const values = this.objectValues();
        return new DateTime(values.year, values.monthIndex + 1, 0, 23, 59, 59, 999);
    }

    /**
     * 获取当前时间当年开始时间
     * @returns {DateTime}
     */
    beginOfYear(): DateTime {
        const year = this.date.getFullYear();
        return new DateTime(year, 0, 1, 0, 0, 0);
    }

    /**
     * 获取当前日期当年结束时间
     * @returns {DateTime}
     */
    endOfYear(): DateTime {
        const year = this.date.getFullYear();
        return new DateTime(year + 1, 0, 0, 23, 59, 59, 999);
    }

    /**
     * 设置周开始周数
     * @param type 周数，见：{@link WeekDay}
     */
    setFirstWeek(type: keyof typeof WeekDay): void {
        this.firstWeek = WeekDay[type];
    }

    /**
     * 日期偏移操作
     * @param type 偏移类型，见：{@link DateField}
     * @param offset 偏移大小
     * @returns {DateTime}
     */
    offset(type: keyof typeof DateField, offset: number): DateTime {
        if (!type) return this;
        const newDateTime = new DateTime(this);
        const values = newDateTime.objectValues();
        offset = offset || 0;
        if (DateField.YEAR === DateField[type]) {
            const tempDateTime = new DateTime(newDateTime);
            newDateTime.date.setFullYear(values.year + Number(offset));
            if (newDateTime.date.getMonth() !== tempDateTime.date.getMonth()
                && newDateTime.date.getFullYear() === tempDateTime.date.getFullYear()) {
                // 如果偏移年份后月份不等于原来的月份，则说明月份超出了，取当月最后一天
                newDateTime.date.setDate(0);
            }
        } else if (DateField.MONTH === DateField[type]) {
            const tempDateTime = new DateTime(newDateTime);
            newDateTime.date.setMonth(values.monthIndex + Number(offset));
            if (newDateTime.date.getMonth() !== tempDateTime.date.getMonth() + Number(offset)
                && newDateTime.date.getFullYear() === tempDateTime.date.getFullYear()) {
                // 如果月份-1后，月份不等于上个月数，则说明上个月天数超出了，取上月最后一天
                newDateTime.date.setDate(0);
            }
        } else if (DateField.DAY === DateField[type]) {
            newDateTime.date.setDate(values.day + Number(offset));
        } else if (DateField.WEEK === DateField[type]) {
            newDateTime.date.setDate(values.day + 7 * offset);
        } else if (DateField.HOURS === DateField[type]) {
            newDateTime.date.setHours(values.hours = Number(offset));
        } else if (DateField.MINUTES === DateField[type]) {
            newDateTime.date.setMinutes(values.minutes = Number(offset));
        } else {
            newDateTime.date.setSeconds(values.seconds = Number(offset));
        }
        return newDateTime;
    }

    /**
     * 获取当月天数
     */
    daysOfMonth(): number {
        return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    }

    /**
     * 获取当年天数
     */
    daysOfYear(): number {
        return this.isLeapYear() ? 366 : 365;
    }

    /**
     * 是否闰年
     */
    isLeapYear(): boolean {
        const year = this.date.getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    /**
     * 获取当前日期与指定日期之间的差值，当前-参数
     */
    compare(date: Date | DateTime, dateField: keyof typeof DateField): number {
        return DateUtil.compare(this, date, dateField);
    }

    /**
     * 获取当前日期年龄（周岁）
     */
    age(): number {
        return DateUtil.age(this);
    }

    /**
     * 年月数
     */
    yearMonthNumber() {
        return parseInt(this.date.getFullYear() + StrUtil.padStart(String(this.date.getMonth() + 1), 2, "0"))
    }

    /**
     * 年月日数
     */
    yearMonthDayNumber() {
        const month = StrUtil.padStart(String(this.date.getMonth() + 1), 2, "0");
        const day = StrUtil.padStart(String(this.date.getDate()), 2, "0");
        return parseInt(this.date.getFullYear() + month + day);
    }
}

export default DateTime;
