import { DateTime, WeekDay, WeekDayType } from "./DateTime";
import dayjs, { Dayjs, OpUnitType, QUnitType } from "dayjs";

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
	 * 获取当前DateTime日期
	 */
	static dateTime(): DateTime {
		return new DateTime();
	}

	/**
	 * 获取当前时间戳
	 */
	static now(): number {
		return Date.now();
	}

	/**
	 * 格式化为 dayjs 对象
	 * @param date 日期
	 * @param format 格式
	 * @param strict 是否严格
	 */
	static parseDayjs(
		date?: dayjs.ConfigType | DateTime,
		format?: dayjs.OptionType | string,
		strict?: boolean
	): Dayjs {
		return DateTime.parseDayjs(date, format, strict);
	}

	/**
	 * 日期内容转 DateTime
	 * @param date 日期
	 * @param format 格式
	 * @param strict 是否严格
	 */
	static parse(
		date?: dayjs.ConfigType | DateTime,
		format?: dayjs.OptionType | string,
		strict?: boolean
	): DateTime {
		return DateTime.parse(date, format, strict);
	}

	/**
	 * 格式化日期，默认格式：YYYY-MM-DD HH:mm:ss
	 *
	 * 遵循 [dayjs]{@link https://day.js.org/docs/en/display/format} 格式化规则
	 * @param date 日期
	 * @param format 格式
	 */
	static format(
		date?: dayjs.ConfigType | DateTime,
		format: string = "YYYY-MM-DD HH:mm:ss"
	): string {
		return new DateTime(date).format(format);
	}

	/**
	 * 格式化为 YYYY-MM-DD HH:mm:ss 格式，默认当前时间
	 * @param date 日期
	 */
	static formatDateTime(date?: dayjs.ConfigType | DateTime): string {
		return this.format(date);
	}

	/**
	 * 格式化为 YYYY-MM-DD，默认当前时间
	 * @param date 日期
	 */
	static formatDate(date?: dayjs.ConfigType | DateTime): string {
		return this.format(date, "YYYY-MM-DD");
	}

	/**
	 * 格式化为 HH:mm:ss，默认当前时间
	 * @param date 日期
	 */
	static formatTime(date?: dayjs.ConfigType | DateTime): string {
		return this.format(date, "HH:mm:ss");
	}

	/**
	 * 获取日期 1 减日期 2 的差值
	 * @param date1 被减日期
	 * @param date2 减日期
	 * @param unit 日期单位，默认毫秒
	 * @param float 是否包含小数
	 */
	static compare(
		date1: dayjs.ConfigType | DateTime,
		date2: dayjs.ConfigType | DateTime,
		unit?: QUnitType | OpUnitType,
		float?: boolean
	): number {
		return new DateTime(date1).compare(date2, unit, float);
	}

	/**
	 * 获取当月天数
	 * @param date 日期
	 */
	static daysOfMonth(date: dayjs.ConfigType | DateTime): number {
		return new DateTime(date).daysOfMonth();
	}

	/**
	 * 获取当年天数
	 * @param date 日期
	 */
	static daysOfYear(date: dayjs.ConfigType | DateTime): number {
		return new DateTime(date).daysOfYear();
	}

	/**
	 * 是否闰年
	 * @param date 日期
	 */
	static isLeapYear(date: dayjs.ConfigType | DateTime): boolean {
		return new DateTime(date).isLeapYear();
	}

	/**
	 * 根据日期获取年龄（周岁）
	 * @param date 日期
	 */
	static age(date: dayjs.ConfigType | DateTime): number {
		return new DateTime(date).age();
	}

	/**
	 * 获取日期为当月第几个星期几
	 * @param date 日期
	 */
	static getWeekdayWhichOfMonth(date?: Date | DateTime) {
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
	static getAllWeekend(year: number): string[] {
		const weekEndList: string[] = [];
		for (let i = 0; i <= 11; i++) {
			const monthDateTime = new DateTime(year, i);
			for (let j = 1; j <= monthDateTime.getMonthDayNumber(); j++) {
				const dayDateTime = new DateTime(year, i, j);
				if (WeekDay.SUN === dayDateTime.getDay() || WeekDay.SAT === dayDateTime.getDay()) {
					weekEndList.push(dayDateTime.formatDate());
				}
			}
		}
		return weekEndList;
	}

	/**
	 * 获取当前日期当天开始时间
	 * @param date 日期
	 */
	static beginOfDay(date: dayjs.ConfigType | DateTime): DateTime {
		const dateTime = new DateTime(date);
		return dateTime.beginOfDay();
	}

	/**
	 * 获取当前日期当天结束时间
	 * @param date 日期
	 */
	static endOfDay(date: dayjs.ConfigType | DateTime): DateTime {
		const dateTime = new DateTime(date);
		return dateTime.endOfDay();
	}

	/**
	 * 获取当前日期当周开始时间
	 * @param date 日期
	 * @param firstWeek 设置周起始星期，0 为周日，6 为周六
	 */
	static beginOfWeek(date: Date | DateTime, firstWeek: WeekDayType): DateTime {
		const dateTime = new DateTime(date);
		dateTime.setFirstWeek(firstWeek);
		return dateTime.beginOfWeek();
	}

	/**
	 * 获取当前日期当周结束时间
	 * @param date 日期
	 * @param firstWeek 设置周起始星期，0 为周日，6 为周六
	 */
	static endOfWeek(date: Date | DateTime, firstWeek: WeekDayType): DateTime {
		const dateTime = new DateTime(date);
		dateTime.setFirstWeek(firstWeek);
		return dateTime.endOfWeek();
	}

	/**
	 * 获取当前日期当月第一天时间
	 * @param date 日期
	 */
	static beginOfMonth(date: Date | DateTime): DateTime {
		const dateTime = new DateTime(date);
		return dateTime.beginOfMonth();
	}

	/**
	 * 获取当前日期当月最后一天时间
	 * @param date 日期
	 */
	static endOfMonth(date: Date | DateTime): DateTime {
		const dateTime = new DateTime(date);
		return dateTime.endOfMonth();
	}

	/**
	 * 获取当前时间当年开始时间
	 * @param date 日期
	 */
	static beginOfYear(date: Date | DateTime): DateTime {
		const dateTime = new DateTime(date);
		return dateTime.beginOfYear();
	}

	/**
	 * 获取当前日期当年结束时间
	 * @param date 日期
	 */
	static endOfYear(date: Date | DateTime): DateTime {
		const dateTime = new DateTime(date);
		return dateTime.endOfYear();
	}

	/**
	 * 获取纪元日
	 * @param date 日期
	 */
	static getEpochDay(date: dayjs.ConfigType | DateTime): number {
		// Unix纪元是1970年1月1日UTC
		const epochStart = new Date(1970, 0, 1); // 注意月份是从0开始的，所以0代表1月
		// 计算时间差（毫秒）
		const diff = new DateTime(date).dayjs.valueOf() - epochStart.getTime();
		// 将毫秒转换为天
		return Math.floor(diff / (1000 * 60 * 60 * 24));
	}
}
