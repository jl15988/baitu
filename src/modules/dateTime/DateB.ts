// import DateUtil from "./DateUtil";
// import StrUtil from "../string/StrUtil";
// import {DateField, DateTimeObjectValues, WeekDay} from "./DateTime";
//
// export class DateB {
//
//     date: Date;
//
//     constructor(value: number | string | DateB | Date);
//     constructor(year?: number, monthIndex?: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number);
//
//     constructor() {
//         if (arguments.length === 1) {
//             if (arguments[0] instanceof DateB) {
//                 this.date = new Date(arguments[0].date);
//             } else {
//                 this.date = new Date(arguments[0]);
//             }
//             return this;
//         }
//         if (arguments.length > 1 && !arguments[0] instanceof Number) {
//             return this;
//         }
//         switch (arguments.length) {
//             case 2:
//                 this.date = new Date(arguments[0], arguments[1]);
//                 break;
//             case 3:
//                 this.date = new Date(arguments[0], arguments[1], arguments[2]);
//                 break;
//             case 4:
//                 this.date = new Date(arguments[0], arguments[1], arguments[2], arguments[3]);
//                 break;
//             case 5:
//                 this.date = new Date(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
//                 break;
//             case 6:
//                 this.date = new Date(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
//                 break;
//             default:
//                 this.date = new Date();
//         }
//         return this;
//     }
//
//     firstWeek = 0;
//
//     static readonly DateField = DateField;
//     static readonly WeekDay = WeekDay;
//
//     static new(): DateB;
//     static new(value: number | string): DateB;
//     static new(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): DateB;
//
//     static new(...args) {
//         let month = null;
//         if (args.length > 1) {
//             month = args[1] - 1;
//         }
//         switch (args.length) {
//             case 1:
//                 return new DateB(args[0]);
//             case 2:
//                 return new DateB(args[0], month);
//             case 3:
//                 return new DateB(args[0], month, args[2]);
//             case 4:
//                 return new DateB(args[0], month, args[2], args[3]);
//             case 5:
//                 return new DateB(args[0], month, args[2], args[3], args[4]);
//             case 6:
//                 return new DateB(args[0], month, args[2], args[3], args[4], args[5]);
//             default:
//                 return new DateB();
//         }
//     }
//
//     static create(): DateB;
//     static create(value: number | string): DateB;
//     static create(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): DateB;
//
//     static create(...args) {
//         switch (args.length) {
//             case 1:
//                 return new DateB(args[0]);
//             case 2:
//                 return new DateB(args[0], args[1]);
//             case 3:
//                 return new DateB(args[0], args[1], args[2]);
//             case 4:
//                 return new DateB(args[0], args[1], args[2], args[3]);
//             case 5:
//                 return new DateB(args[0], args[1], args[2], args[3], args[4]);
//             case 6:
//                 return new DateB(args[0], args[1], args[2], args[3], args[4], args[5]);
//             default:
//                 return new DateB();
//         }
//     }
//
//     getFullYear(): number {
//         return this.date.getFullYear();
//     }
//
//     getMonth(): number {
//         return this.date.getMonth();
//     }
//
//     getDate(): number {
//         return this.date.getDate();
//     }
//
//     getDay(): number {
//         return this.date.getDay();
//     }
//
//     getHours(): number {
//         return this.date.getHours();
//     }
//
//     getMinutes(): number {
//         return this.date.getMinutes();
//     }
//
//     getSeconds(): number {
//         return this.date.getSeconds();
//     }
//
//     getTime(): number {
//         return this.date.getTime();
//     }
//
//     setFullYear(year: number): number {
//         return this.date.setFullYear(year);
//     }
//
//     setMonth(month: number): number {
//         return this.date.setMonth(month);
//     }
//
//     setDate(date: number): number {
//         return this.date.setDate(date);
//     }
//
//     setHours(hours: number): number {
//         return this.date.setHours(hours);
//     }
//
//     setMinutes(min: number): number {
//         return this.date.setMinutes(min);
//     }
//
//     setSeconds(sec: number): number {
//         return this.date.setSeconds(sec);
//     }
//
//     setTime(time: number): number {
//         return this.date.setTime(time);
//     }
//
//     /**
//      * 日期年，月，日，周，时，分，秒对象数据
//      */
//     objectValues(): DateTimeObjectValues {
//         const year = this.getFullYear();
//         const monthIndex = this.getMonth();
//         const day = this.getDate();
//         const week = this.getDay();
//         const hours = this.getHours();
//         const minutes = this.getMinutes();
//         const seconds = this.getSeconds();
//         return {
//             year,
//             monthIndex,
//             month: (monthIndex + 1),
//             day,
//             week,
//             hours,
//             minutes,
//             seconds
//         }
//     }
//
//     /**
//      * 转为年-月-日类型的日期
//      * @returns {DateB}
//      */
//     toDate(): DateB {
//         const values = this.objectValues();
//         return new DateB(values.year, values.monthIndex, values.day);
//     }
//
//     /**
//      * 格式化日期，默认格式：yyyy-MM-dd HH:mm:ss
//      * @param format 格式
//      */
//     format(format?: string) {
//         return DateUtil.format(this, format);
//     }
//
//     /**
//      * 格式化当前日期为年-月-日
//      * @returns {string}
//      */
//     formatDate(): string {
//         return this.format("yyyy-MM-dd");
//     }
//
//     /**
//      * 格式化当前日期为年-月-日 时:分:秒
//      * @returns {string}
//      */
//     formatDateTime(): string {
//         return this.format("yyyy-MM-dd HH:mm:ss");
//     }
//
//     /**
//      * 获取当前日期当天开始时间
//      * @returns {DateB}
//      */
//     beginOfDay(): DateB {
//         const values = this.objectValues();
//         return new DateB(values.year, values.monthIndex, values.day, 0, 0, 0);
//     }
//
//     /**
//      * 获取当前日期当天结束时间
//      * @returns {DateB}
//      */
//     endOfDay(): DateB {
//         const values = this.objectValues();
//         return new DateB(values.year, values.monthIndex, values.day, 23, 59, 59);
//     }
//
//     /**
//      * 获取当前日期当周开始时间
//      * @returns {DateB}
//      */
//     beginOfWeek(): DateB {
//         const values = this.objectValues();
//         const extra = this.firstWeek || 0;
//         return new DateB(values.year, values.monthIndex, values.day - values.week + extra, 0, 0, 0);
//     }
//
//     /**
//      * 获取当前日期当周结束时间
//      * @returns {DateB}
//      */
//     endOfWeek(): DateB {
//         const values = this.objectValues();
//         const extra = this.firstWeek || 0;
//         return new DateB(values.year, values.monthIndex, values.day + (6 - values.week + extra), 23, 59, 59);
//     }
//
//     /**
//      * 获取当前日期当月第一天时间
//      * @returns {Date}
//      */
//     beginOfMonth(): DateB {
//         const year = this.getFullYear();
//         const month = this.getMonth();
//         return new DateB(year, month, 1, 0, 0, 0)
//     }
//
//     /**
//      * 获取当前日期当月最后一天时间
//      * @returns {Date}
//      */
//     endOfMonth(): DateB {
//         const year = this.getFullYear();
//         const month = this.getMonth() + 1;
//         return new DateB(year, month, 0, 23, 59, 59);
//     }
//
//     /**
//      * 获取当前时间当年开始时间
//      * @returns {DateB}
//      */
//     beginOfYear(): DateB {
//         const year = this.getFullYear();
//         return new DateB(year, 0, 1, 0, 0, 0);
//     }
//
//     /**
//      * 获取当前日期当年结束时间
//      * @returns {DateB}
//      */
//     endOfYear(): DateB {
//         const year = this.getFullYear();
//         return new DateB(year + 1, 0, 0, 23, 59, 59);
//     }
//
//     /**
//      * 设置周开始周数
//      * @param type 周数，见：{@link WeekDay}
//      */
//     setFirstWeek(type: WeekDay): void {
//         this.firstWeek = type;
//     }
//
//     /**
//      * 日期偏移操作
//      * @param type 偏移类型，见：{@link DateField}
//      * @param offset 偏移大小
//      * @returns {DateB}
//      */
//     offset(type: DateField, offset: number): DateB {
//         if (!type) return this;
//         const newDateTime = new DateB(this);
//         const values = newDateTime.objectValues();
//         offset = offset || 0;
//         if (DateField.YEAR === type) {
//             const tempDateTime = new DateB(newDateTime);
//             newDateTime.setFullYear(values.year + Number(offset));
//             if (newDateTime.getMonth() !== tempDateTime.getMonth()
//                 && newDateTime.getFullYear() === tempDateTime.getFullYear()) {
//                 // 如果偏移年份后月份不等于原来的月份，则说明月份超出了，取当月最后一天
//                 newDateTime.setDate(0);
//             }
//         } else if (DateField.MONTH === type) {
//             const tempDateTime = new DateB(newDateTime);
//             newDateTime.setMonth(values.monthIndex + Number(offset));
//             if (newDateTime.getMonth() !== tempDateTime.getMonth() + Number(offset)
//                 && newDateTime.getFullYear() === tempDateTime.getFullYear()) {
//                 // 如果月份-1后，月份不等于上个月数，则说明上个月天数超出了，取上月最后一天
//                 newDateTime.setDate(0);
//             }
//         } else if (DateField.DAY === type) {
//             newDateTime.setDate(values.day + Number(offset));
//         } else if (DateField.WEEK === type) {
//             newDateTime.setDate(values.day + 7 * offset);
//         } else if (DateField.HOURS === type) {
//             newDateTime.setHours(values.hours = Number(offset));
//         } else if (DateField.MINUTES === type) {
//             newDateTime.setMinutes(values.minutes = Number(offset));
//         } else {
//             newDateTime.setSeconds(values.seconds = Number(offset));
//         }
//         return newDateTime;
//     }
//
//     /**
//      * 获取当月天数
//      */
//     daysOfMonth(): number {
//         return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
//     }
//
//     /**
//      * 获取当年天数
//      */
//     daysOfYear(): number {
//         return this.isLeapYear() ? 366 : 365;
//     }
//
//     /**
//      * 是否闰年
//      */
//     isLeapYear(): boolean {
//         const year = this.getFullYear();
//         return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
//     }
//
//     /**
//      * 获取当前日期与指定日期之间的差值，当前-参数
//      */
//     compare(date: Date | DateB, dateField: DateField): number {
//         return DateUtil.compare(this, date, dateField);
//     }
//
//     /**
//      * 获取当前日期年龄（周岁）
//      */
//     age(): number {
//         return DateUtil.age(this);
//     }
//
//     /**
//      * 年月数
//      */
//     yearMonthNumber() {
//         return parseInt(this.getFullYear() + StrUtil.padStart(String(this.getMonth() + 1), 2, "0"))
//     }
//
//     /**
//      * 年月日数
//      */
//     yearMonthDayNumber() {
//         const month = StrUtil.padStart(String(this.getMonth() + 1), 2, "0");
//         const day = StrUtil.padStart(String(this.getDate()), 2, "0");
//         return parseInt(this.getFullYear() + month + day);
//     }
// }
//
// export default new DateB();
