import DateUtil from "./DateUtil";
import StrUtil from "../string/StrUtil";

/**
 * 日期属性
 */
export enum DateField {
    year = "year",
    month = "month",
    day = "day",
    week = "week",
    hours = "hours",
    min = "minutes",
    sec = "seconds",
    ms = "milliseconds"
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
 * 星期
 */
export type WeekDayType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

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
     * 两位数年
     */
    simpleYear: number,
    /**
     * 月下标
     */
    monthIndex: number,
    /**
     * 月
     */
    month: number,
    /**
     * 补零月
     */
    fullMonth: string,
    /**
     * 日
     */
    day: number,
    /**
     * 补零日
     */
    fullDay: string,
    /**
     * 星期
     */
    week: number,
    /**
     * 小时
     */
    hours: number,
    /**
     * 补零小时
     */
    fullHours: string,
    /**
     * 分钟
     */
    minutes: number,
    /**
     * 补零分钟
     */
    fullMinutes: string,
    /**
     * 秒
     */
    seconds: number,
    /**
     * 补零秒
     */
    fullSeconds: string,
    /**
     * 毫秒
     */
    milliseconds: number,
    /**
     * 补零毫秒
     */
    fullMilliseconds: string,
    /**
     * 季度
     */
    quarter: number,
}

/**
 * 日期时间对象
 */
class DateTime {
    firstWeek: number = 0
    date: Date

    toString() {
        return this.date.toString()
    }

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
     * 获取月份
     */
    month() {
        return this.date.getMonth() + 1
    }

    getTime() {
        return this.date.getTime();
    }

    setTime(time: number) {
        return this.date.setTime(time);
    }

    getFullYear() {
        return this.date.getFullYear();
    }

    setFullYear(year: number, month?: number, date?: number) {
        if (month && date) {
            return this.date.setFullYear(year, month, date);
        } else if (month) {
            return this.date.setFullYear(year, month);
        }
        return this.date.setFullYear(year);
    }

    getMonth() {
        return this.date.getMonth();
    }

    setMonth(month: number, date?: number) {
        if (date) {
            return this.date.setMonth(month, date);
        }
        return this.date.setMonth(month);
    }

    getDate() {
        return this.date.getDate();
    }

    setDate(date: number) {
        return this.date.setDate(date);
    }

    getDay() {
        return this.date.getDay();
    }

    getHours() {
        return this.date.getHours();
    }

    setHours(hours: number, min?: number, sec?: number, ms?: number) {
        if (min && sec && ms) {
            return this.date.setHours(hours, min, sec, ms);
        } else if (min && sec) {
            return this.date.setHours(hours, min, sec);
        } else if (min) {
            return this.date.setHours(hours, min);
        }
        return this.date.setHours(hours);
    }

    getMinutes() {
        return this.date.getMinutes();
    }

    setMinutes(min: number, sec?: number, ms?: number) {
        if (sec && ms) {
            return this.date.setMinutes(min, sec, ms);
        } else if (sec) {
            return this.date.setHours(min, sec);
        }
        return this.date.setMinutes(min);
    }

    getSeconds() {
        return this.date.getSeconds();
    }

    setSeconds(sec: number, ms?: number) {
        if (ms) {
            return this.date.setSeconds(sec, ms);
        }
        return this.date.setSeconds(sec);
    }

    getMilliseconds() {
        return this.date.getMilliseconds();
    }

    setMilliseconds(ms: number) {
        return this.date.setMilliseconds(ms);
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
        const quarter = Math.floor((monthIndex + 3) / 3);
        return {
            year,
            simpleYear: Number(year.toString().substring(2)),
            monthIndex,
            month: (monthIndex + 1),
            fullMonth: (monthIndex + 1).toString().padStart(2, '0'),
            day,
            fullDay: day.toString().padStart(2, '0'),
            week,
            hours,
            fullHours: hours.toString().padStart(2, '0'),
            minutes,
            fullMinutes: minutes.toString().padStart(2, '0'),
            seconds,
            fullSeconds: seconds.toString().padStart(2, '0'),
            milliseconds,
            fullMilliseconds: milliseconds.toString().padStart(3, '0'),
            quarter,
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
     */
    formatDate(): string {
        return this.format("yyyy-MM-dd");
    }

    /**
     * 格式化当前日期为时-分-秒
     */
    formatTime(): string {
        return this.format("HH:mm:ss");
    }

    /**
     * 格式化当前日期为年-月-日 时:分:秒
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
     * @param weekDay 星期，0 为周日，6 为周六
     */
    setFirstWeek(weekDay: WeekDayType): DateTime {
        this.firstWeek = weekDay;
        return this;
    }

    /**
     * 日期偏移操作
     * @param dateField 偏移类型，见：{@link DateField}
     * @param offset 偏移大小
     * @returns {DateTime}
     */
    offset(dateField: keyof typeof DateField, offset: number): DateTime {
        if (!dateField) return this;
        const newDateTime = new DateTime(this);
        const values = newDateTime.objectValues();
        offset = offset || 0;
        const dateType = DateField[dateField]
        if (DateField.year === dateType) {
            const tempDateTime = new DateTime(newDateTime);
            newDateTime.date.setFullYear(values.year + Number(offset));
            if (newDateTime.date.getMonth() !== tempDateTime.date.getMonth()
                && newDateTime.date.getFullYear() === tempDateTime.date.getFullYear()) {
                // 如果偏移年份后月份不等于原来的月份，则说明月份超出了，取当月最后一天
                newDateTime.date.setDate(0);
            }
        } else if (DateField.month === dateType) {
            const tempDateTime = new DateTime(newDateTime);
            newDateTime.date.setMonth(values.monthIndex + Number(offset));
            if (newDateTime.date.getMonth() !== tempDateTime.date.getMonth() + Number(offset)
                && newDateTime.date.getFullYear() === tempDateTime.date.getFullYear()) {
                // 如果月份-1后，月份不等于上个月数，则说明上个月天数超出了，取上月最后一天
                newDateTime.date.setDate(0);
            }
        } else if (DateField.day === dateType) {
            newDateTime.date.setDate(values.day + Number(offset));
        } else if (DateField.week === dateType) {
            newDateTime.date.setDate(values.day + 7 * offset);
        } else if (DateField.hours === dateType) {
            newDateTime.date.setHours(values.hours = Number(offset));
        } else if (DateField.min === dateType) {
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

    /**
     * 获取月天数
     */
    getMonthDayNumber() {
        return this.endOfMonth().date.getDate()
    }

    /**
     * 判断当天是否为周末
     */
    isWeekEnd() {
        return WeekDay.SUN === this.date.getDay() || WeekDay.SAT === this.date.getDay()
    }

    /**
     * 判断当前时间是否在指定时间之前
     * @param date 指定时间
     */
    isBefore(date: Date | DateTime) {
        return DateUtil.compare(this, date) < 0
    }

    /**
     * 判断当前时间是否在指定时间之前或等于
     * @param date 指定时间
     */
    isBeforeOrEquals(date: Date | DateTime) {
        return DateUtil.compare(this, date) <= 0
    }

    /**
     * 判断当前时间是否在指定时间之后
     * @param date 指定时间
     */
    isAfter(date: Date | DateTime) {
        return DateUtil.compare(this, date) > 0
    }

    /**
     * 判断当前时间是否在指定时间之后或等于
     * @param date 指定时间
     */
    isAfterOrEquals(date: Date | DateTime) {
        return DateUtil.compare(this, date) >= 0
    }
}

export default DateTime;
