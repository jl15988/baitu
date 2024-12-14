import dayjs, {Dayjs, OpUnitType, QUnitType, UnitType} from "dayjs";

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
    dayjs: Dayjs

    toString() {
        return this.dayjs.toDate().toString()
    }

    toDate(): Date {
        return this.dayjs.toDate()
    }

    constructor();
    constructor(value: dayjs.ConfigType | DateTime);
    constructor(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number);

    constructor() {
        let date: Date | null = null;
        if (arguments.length === 0) {
            date = new Date()
        } else if (arguments.length === 1) {
            if (arguments[0] instanceof Date) {
                date = new Date(arguments[0]);
            } else if (arguments[0] instanceof DateTime) {
                date = new Date(arguments[0].dayjs.valueOf());
            } else {
                date = dayjs(arguments[0]).toDate();
            }
        } else {
            const args: number[] = []
            for (let i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] !== "number") {
                    throw new Error("Date constructor argument must be a number");
                }
                if (i < 7) {
                    args[i] = arguments[i];
                }
            }
            // @ts-ignore
            date = dayjs(new Date(...args))
        }

        this.dayjs = dayjs(date)
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
     * 通过 dayjs 转换
     * @param dayjs
     */
    static fromDayjs(dayjs: Dayjs): DateTime {
        return new DateTime(dayjs.toDate());
    }

    /**
     * 转换为 dayjs 对象
     */
    toDayjs(): Dayjs {
        return this.dayjs.clone()
    }

    /**
     * 格式化为 dayjs 对象
     * @param date 日期
     * @param format 格式
     * @param strict 是否严格
     */
    static parseDayjs(date?: dayjs.ConfigType | DateTime, format?: dayjs.OptionType | string, strict?: boolean): Dayjs {
        return dayjs(date instanceof DateTime ? date.getDate() : date, format, strict);
    }

    /**
     * 日期内容转 DateTime
     * @param date 日期
     * @param format 格式
     * @param strict 是否严格
     */
    static parse(date?: dayjs.ConfigType | DateTime, format?: dayjs.OptionType | string, strict?: boolean): DateTime {
        return DateTime.fromDayjs(DateTime.parseDayjs(date, format, strict));
    }

    /**
     * 获取月份
     */
    month() {
        return this.dayjs.month() + 1
    }

    getTime() {
        return this.dayjs.valueOf();
    }

    get(unit: UnitType) {
        return this.dayjs.get(unit)
    }

    set(unit: UnitType, value?: number): DateTime;
    set(obj: Partial<Record<UnitType, number>>): DateTime;

    set(unitOrObj: UnitType | Partial<Record<UnitType, number>>, value?: number): DateTime {
        if (!unitOrObj) return this
        if (typeof unitOrObj === 'string') {
            if (value && typeof value === "number") {
                this.dayjs = this.dayjs.set(unitOrObj, value);
            }
        } else if (typeof unitOrObj === 'object') {
            let newDayjs = this.dayjs;
            for (let [key, value] of Object.entries(unitOrObj)) {
                if (value && typeof value === "number") {
                    newDayjs = newDayjs.set(key as UnitType, value)
                }
            }
            this.dayjs = newDayjs
        }
        return this
    };

    setTime(time: number): DateTime {
        this.dayjs = dayjs(time);
        return this;
    }

    getFullYear() {
        return this.dayjs.year();
    }

    setFullYear(year: number, month?: number, date?: number): DateTime {
        this.set({
            year,
            month,
            date
        })
        return this;
    }

    getMonth() {
        return this.dayjs.month();
    }

    setMonth(month: number, date?: number): DateTime {
        this.set({
            month,
            date
        })
        return this;
    }

    getDate() {
        return this.dayjs.date();
    }

    setDate(date: number): DateTime {
        this.set({
            date
        })
        return this;
    }

    getDay() {
        return this.dayjs.day();
    }

    setDay(day: number) {
        this.set({
            day
        })
        return this
    }

    getHours() {
        return this.dayjs.hour();
    }

    setHours(hours: number, min?: number, sec?: number, ms?: number): DateTime {
        this.set({
            hour: hours,
            minute: min,
            second: sec,
            millisecond: ms
        })
        return this;
    }

    getMinutes() {
        return this.dayjs.minute();
    }

    setMinutes(min: number, sec?: number, ms?: number): DateTime {
        this.set({
            minute: min,
            second: sec,
            millisecond: ms
        })
        return this;
    }

    getSeconds() {
        return this.dayjs.second();
    }

    setSeconds(sec: number, ms?: number) {
        this.set({
            second: sec,
            millisecond: ms
        })
        return this;
    }

    getMilliseconds() {
        return this.dayjs.millisecond();
    }

    setMilliseconds(ms: number) {
        this.set({
            millisecond: ms
        })
        return this;
    }

    /**
     * 获取时区
     */
    timeZone() {
        return dayjs.tz.guess()
    }

    /**
     * 转为年-月-日类型的日期
     * @returns {DateTime}
     */
    toDateObj(): DateTime {
        return new DateTime(this.dayjs.year(), this.dayjs.month(), this.dayjs.date());
    }

    /**
     * 转为时-分-秒类型的时间
     * @returns {DateTime}
     */
    toTimeObj(): DateTime {
        const dateTime = new DateTime(0);
        dateTime.dayjs.hour(this.dayjs.hour()).minute(this.dayjs.minute()).second(this.dayjs.second())
        return dateTime;
    }

    /**
     * 格式化日期，默认格式：YYYY-MM-DD HH:mm:ss
     *
     * 遵循 [dayjs]{@link https://day.js.org/docs/en/display/format} 格式化规则
     * @param format 格式
     */
    format(format: string = "YYYY-MM-DD HH:mm:ss"): string {
        return this.dayjs.format(format);
    }

    /**
     * 格式化当前日期为年-月-日
     */
    formatDate(): string {
        return this.format("YYYY-MM-DD");
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
        return this.format("YYYY-MM-DD HH:mm:ss");
    }

    /**
     * 获取当前日期当天开始时间
     * @returns {DateTime}
     */
    beginOfDay(): DateTime {
        return new DateTime(this.dayjs.startOf('day'));
    }

    /**
     * 获取当前日期当天结束时间
     * @returns {DateTime}
     */
    endOfDay(): DateTime {
        return new DateTime(this.dayjs.endOf('day'));
    }

    /**
     * 获取当前日期当周开始时间
     * @returns {DateTime}
     */
    beginOfWeek(): DateTime {
        return new DateTime(this.dayjs.startOf('week'));
    }

    /**
     * 获取当前日期当周结束时间
     * @returns {DateTime}
     */
    endOfWeek(): DateTime {
        return new DateTime(this.dayjs.endOf('week'));
    }

    /**
     * 获取当前日期当月第一天时间
     * @returns {Date}
     */
    beginOfMonth(): DateTime {
        return new DateTime(this.dayjs.startOf('month'))
    }

    /**
     * 获取当前日期当月最后一天时间
     * @returns {Date}
     */
    endOfMonth(): DateTime {
        return new DateTime(this.dayjs.endOf('month'));
    }

    /**
     * 获取当前时间当年开始时间
     * @returns {DateTime}
     */
    beginOfYear(): DateTime {
        return new DateTime(this.dayjs.startOf('year'));
    }

    /**
     * 获取当前日期当年结束时间
     * @returns {DateTime}
     */
    endOfYear(): DateTime {
        return new DateTime(this.dayjs.endOf('year'));
    }

    /**
     * 设置周开始周数
     * @param weekDay 星期，0 为周日，6 为周六
     */
    setFirstWeek(weekDay: WeekDayType): DateTime {
        this.dayjs.weekday(weekDay)
        return this;
    }

    /**
     * 日期偏移操作
     * @param dateField 偏移类型
     * @param offset 偏移大小
     * @returns {DateTime}
     */
    offset(dateField: dayjs.ManipulateType | undefined, offset: number): DateTime {
        const newDayjs = this.dayjs.subtract(offset, dateField)
        return new DateTime(newDayjs)
    }

    /**
     * 获取当月天数
     */
    daysOfMonth(): number {
        return this.dayjs.daysInMonth();
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
        return this.dayjs.isLeapYear()
    }

    /**
     * 获取当前日期与指定日期之间的差值
     *
     * @param date 日期
     * @param unit 单位
     * @param float 是否显示小数
     */
    compare(date: dayjs.ConfigType | DateTime, unit?: QUnitType | OpUnitType, float?: boolean): number {
        return this.dayjs.diff(date instanceof DateTime ? date.dayjs : date, unit, float)
    }

    /**
     * 获取当前日期年龄（周岁）
     */
    age(): number {
        const nowDate = dayjs();
        const curDate = this.dayjs;
        const nowYear = nowDate.year();
        const nowMonth = nowDate.month();
        const nowDay = nowDate.date();
        const birthYear = curDate.year();
        const birthMonth = curDate.month();
        const birthDay = curDate.date();
        // 现在年-出生日期年
        let age = nowYear - birthYear;
        if (nowMonth === birthMonth) {
            // 若月份相等判断，若当前天小于出生日期天则未到出生日期，则减一
            if (nowDay < birthDay) {
                --age;
            }
        } else if (nowMonth < birthMonth) {
            // 若月份小于出生日期月份，未到出生日期，则减一
            --age;
        }
        return age;
    }

    /**
     * 获取月天数
     */
    getMonthDayNumber() {
        return this.endOfMonth().dayjs.date()
    }

    /**
     * 判断指定时间是否与当前时间相等
     * @param date 指定时间
     */
    equals(date: dayjs.ConfigType | DateTime): boolean {
        return this.getTime() === new DateTime(date).getTime();
    }

    /**
     * 判断当前时间是否在指定时间之前
     * @param date 指定时间
     */
    isBefore(date: dayjs.ConfigType | DateTime) {
        return this.dayjs.isBefore(date instanceof DateTime ? date.dayjs : date)
    }

    /**
     * 判断当前时间是否在指定时间之前或等于
     * @param date 指定时间
     */
    isBeforeOrEquals(date: dayjs.ConfigType | DateTime) {
        return this.dayjs.isSameOrBefore(date instanceof DateTime ? date.dayjs : date)
    }

    /**
     * 判断当前时间是否在指定时间之后
     * @param date 指定时间
     */
    isAfter(date: dayjs.ConfigType | DateTime) {
        return this.dayjs.isAfter(date instanceof DateTime ? date.dayjs : date)
    }

    /**
     * 判断当前时间是否在指定时间之后或等于
     * @param date 指定时间
     */
    isAfterOrEquals(date: dayjs.ConfigType | DateTime) {
        return this.dayjs.isSameOrAfter(date instanceof DateTime ? date.dayjs : date)
    }
}

export default DateTime;
