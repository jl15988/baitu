import DateUtil from "./DateUtil";

/**
 * 日期属性
 */
export const DateField = {
    YEAR: "year",
    MONTH: "month",
    DAY: "day",
    WEEK: "week",
    HOURS: "hours",
    MINUTES: "minutes",
    SECONDS: "seconds"
}

/**
 * 周数
 */
export const WeekDay = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THUR: 4,
    FRI: 5,
    SAT: 6
}

class DateTime extends Date {

    args;
    firstWeek = 0;

    constructor(...args) {
        if (args.length === 1) {
            super(args[0]);
        } else if (args.length > 1) {
            super(...args);
        } else {
            super();
        }
        this.args = args;
    }

    /**
     * 日期年，月，日，周，时，分，秒对象数据，与Date的get获取的一致
     */
    objectValues() {
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
    toDate() {
        const values = this.objectValues();
        return new DateTime(values.year, values.month, values.day);
    }

    /**
     * 格式化当前日期为年-月-日
     * @returns {string}
     */
    formatDate() {
        return DateUtil.formatDateTime(this, "yyyy-MM-dd");
    }

    /**
     * 格式化当前日期为年-月-日 时:分:秒
     * @returns {string}
     */
    formatDateTime() {
        return DateUtil.formatDateTime(this, "yyyy-MM-dd HH:mm:ss");
    }

    /**
     * 获取当前日期当天开始时间
     * @returns {DateTime}
     */
    beginOfDay() {
        const values = this.objectValues();
        return new DateTime(values.year, values.month, values.day, 0, 0, 0);
    }

    /**
     * 获取当前日期当天结束时间
     * @returns {DateTime}
     */
    endOfDay() {
        const values = this.objectValues();
        return new DateTime(values.year, values.month, values.day, 23, 59, 59);
    }

    /**
     * 获取当前日期当周开始时间
     * @returns {DateTime}
     */
    beginOfWeek() {
        const values = this.objectValues();
        const extra = this.firstWeek || 0;
        return new DateTime(values.year, values.month, values.day - values.week + extra, 0, 0, 0);
    }

    /**
     * 获取当前日期当周结束时间
     * @returns {DateTime}
     */
    endOfWeek() {
        const values = this.objectValues();
        const extra = this.firstWeek || 0;
        return new DateTime(values.year, values.month, values.day + (6 - values.week + extra), 23, 59, 59);
    }

    /**
     * 获取当前日期当月第一天时间
     * @returns {Date}
     */
    beginOfMonth() {
        const year = this.getFullYear();
        const month = this.getMonth();
        return new DateTime(year, month, 1, 0, 0, 0)
    }

    /**
     * 获取当前日期当月最后一天时间
     * @returns {Date}
     */
    endOfMonth() {
        const year = this.getFullYear();
        const month = this.getMonth() + 1;
        return new DateTime(year, month, 0, 23, 59, 59);
    }

    /**
     * 获取当前时间当年开始时间
     * @returns {DateTime}
     */
    beginOfYear() {
        const year = this.getFullYear();
        return new DateTime(year, 0, 1, 0, 0, 0);
    }

    /**
     * 获取当前日期当年结束时间
     * @returns {DateTime}
     */
    endOfYear() {
        const year = this.getFullYear();
        return new DateTime(year + 1, 0, 0, 23, 59, 59);
    }

    /**
     * 设置周开始周数
     * @param type 周数，见：{@link WeekDay}
     */
    setFirstWeek(type) {
        if (!Object.values(WeekDay).includes(type)) {
            return;
        }
        this.firstWeek = type;
    }

    /**
     * 日期偏移操作
     * @param type 偏移类型，见：{@link DateField}
     * @param offset 偏移大小
     * @returns {DateTime}
     */
    offset(type, offset) {
        if (!type) return this;
        const newDateTime = new DateTime(this);
        const values = newDateTime.objectValues();
        offset = offset || 0;
        if (DateField.YEAR === type) {
            newDateTime.setFullYear(values.year + Number(offset));
        } else if (DateField.MONTH === type) {
            const tempDateTime = new DateTime(newDateTime);
            tempDateTime.setMonth(values.month + Number(offset));
            if (tempDateTime.getMonth() !== newDateTime.getMonth() - 1) {
                // 如果月份-1后，月份不等于上个月数，则说明上个月天数超出了，去上月最后一天
                newDateTime.setDate(0);
            } else {
                newDateTime.setMonth(values.month + Number(offset));
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
}

export default DateTime;
