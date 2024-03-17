import DateUtil from "./DateUtil";

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
    year: number,
    month: number,
    day: number,
    week: number,
    hours: number,
    minutes: number,
    seconds: number
}

class DateTime extends Date {
    firstWeek = 0;

    static readonly DateField = DateField;
    static readonly WeekDay = WeekDay;

    static create(): DateTime;
    static create(value: number | string): DateTime;
    static create(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): DateTime;

    static create(...args) {
        switch (args.length) {
            case 1:
                return new DateTime(args[0]);
            case 2:
                return new DateTime(args[0], args[1]);
            case 3:
                return new DateTime(args[0], args[1], args[2]);
            case 4:
                return new DateTime(args[0], args[1], args[2], args[3]);
            case 5:
                return new DateTime(args[0], args[1], args[2], args[3], args[4]);
            case 6:
                return new DateTime(args[0], args[1], args[2], args[3], args[4], args[5]);
            default:
                return new DateTime();
        }
    }


    /**
     * 日期年，月，日，周，时，分，秒对象数据，与Date的get获取的一致
     */
    objectValues(): DateTimeObjectValues {
        const year = this.getFullYear();
        const month = this.getMonth();
        const day = this.getDate();
        const week = this.getDay();
        const hours = this.getHours();
        const minutes = this.getMinutes();
        const seconds = this.getSeconds();
        return {
            year,
            month,
            day,
            week,
            hours,
            minutes,
            seconds
        }
    }

    /**
     * 转为年-月-日类型的日期
     * @returns {DateTime}
     */
    toDate(): DateTime {
        const values = this.objectValues();
        return new DateTime(values.year, values.month, values.day);
    }

    /**
     * 格式化日期，默认格式：yyyy-MM-dd HH:mm:ss
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
        return new DateTime(values.year, values.month, values.day, 0, 0, 0);
    }

    /**
     * 获取当前日期当天结束时间
     * @returns {DateTime}
     */
    endOfDay(): DateTime {
        const values = this.objectValues();
        return new DateTime(values.year, values.month, values.day, 23, 59, 59);
    }

    /**
     * 获取当前日期当周开始时间
     * @returns {DateTime}
     */
    beginOfWeek(): DateTime {
        const values = this.objectValues();
        const extra = this.firstWeek || 0;
        return new DateTime(values.year, values.month, values.day - values.week + extra, 0, 0, 0);
    }

    /**
     * 获取当前日期当周结束时间
     * @returns {DateTime}
     */
    endOfWeek(): DateTime {
        const values = this.objectValues();
        const extra = this.firstWeek || 0;
        return new DateTime(values.year, values.month, values.day + (6 - values.week + extra), 23, 59, 59);
    }

    /**
     * 获取当前日期当月第一天时间
     * @returns {Date}
     */
    beginOfMonth(): DateTime {
        const year = this.getFullYear();
        const month = this.getMonth();
        return new DateTime(year, month, 1, 0, 0, 0)
    }

    /**
     * 获取当前日期当月最后一天时间
     * @returns {Date}
     */
    endOfMonth(): DateTime {
        const year = this.getFullYear();
        const month = this.getMonth() + 1;
        return new DateTime(year, month, 0, 23, 59, 59);
    }

    /**
     * 获取当前时间当年开始时间
     * @returns {DateTime}
     */
    beginOfYear(): DateTime {
        const year = this.getFullYear();
        return new DateTime(year, 0, 1, 0, 0, 0);
    }

    /**
     * 获取当前日期当年结束时间
     * @returns {DateTime}
     */
    endOfYear(): DateTime {
        const year = this.getFullYear();
        return new DateTime(year + 1, 0, 0, 23, 59, 59);
    }

    /**
     * 设置周开始周数
     * @param type 周数，见：{@link WeekDay}
     */
    setFirstWeek(type: WeekDay): void {
        this.firstWeek = type;
    }

    /**
     * 日期偏移操作
     * @param type 偏移类型，见：{@link DateField}
     * @param offset 偏移大小
     * @returns {DateTime}
     */
    offset(type: DateField, offset: number): DateTime {
        if (!type) return this;
        const newDateTime = new DateTime(this);
        const values = newDateTime.objectValues();
        offset = offset || 0;
        if (DateField.YEAR === type) {
            const tempDateTime = new DateTime(newDateTime);
            newDateTime.setFullYear(values.year + Number(offset));
            if (newDateTime.getMonth() !== tempDateTime.getMonth()
                && newDateTime.getFullYear() === tempDateTime.getFullYear()) {
                // 如果偏移年份后月份不等于原来的月份，则说明月份超出了，取当月最后一天
                newDateTime.setDate(0);
            }
        } else if (DateField.MONTH === type) {
            const tempDateTime = new DateTime(newDateTime);
            newDateTime.setMonth(values.month + Number(offset));
            if (newDateTime.getMonth() !== tempDateTime.getMonth() + Number(offset)
                && newDateTime.getFullYear() === tempDateTime.getFullYear()) {
                // 如果月份-1后，月份不等于上个月数，则说明上个月天数超出了，取上月最后一天
                newDateTime.setDate(0);
            }
        } else if (DateField.DAY === type) {
            newDateTime.setDate(values.day + Number(offset));
        } else if (DateField.WEEK === type) {
            newDateTime.setDate(values.day + 7 * offset);
        } else if (DateField.HOURS === type) {
            newDateTime.setHours(values.hours = Number(offset));
        } else if (DateField.MINUTES === type) {
            newDateTime.setMinutes(values.minutes = Number(offset));
        } else {
            newDateTime.setSeconds(values.seconds = Number(offset));
        }
        return newDateTime;
    }

    /**
     * 获取当月天数
     */
    daysOfMonth(): number {
        return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
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
        const year = this.getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    /**
     * 获取当前日期与指定日期之间的差值，当前-参数
     */
    compare(date: Date | DateTime, dateField: DateField): number {
        return DateUtil.compare(this, date, dateField);
    }

    /**
     * 获取当前日期年龄（周岁）
     */
    age(): number {
        return DateUtil.age(this);
    }
}

export default DateTime;
