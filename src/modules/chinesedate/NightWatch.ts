export interface WatchInfo {
	name: string;
	timeDesc: string;
	startHour: number;
	endHour: number;
}

/**
 * 更天 - 中国古代夜间时间计量单位
 * 一般分为五更，每更约为现代计时的两个小时
 */
class NightWatch {
	/**
	 * 更数数组，包含五更
	 */
	static readonly WATCH_NAMES: string[] = [
		"一更", "二更", "三更", "四更", "五更",
	];

	/**
	 * 每更对应的时辰
	 */
	static readonly WATCH_TIME_DESC: string[] = [
		"戌时至亥时（19:00-23:00）", "子时（23:00-01:00）", "丑时（01:00-03:00）", "寅时（03:00-05:00）", "卯时（05:00-07:00）",
	];

	/**
	 * 每更的开始小时（24小时制）
	 */
	static readonly WATCH_HOUR_STARTS: number[] = [
		19, 23, 1, 3, 5,
	];

	/**
	 * 每更的结束小时（24小时制）
	 */
	static readonly WATCH_HOUR_ENDS: number[] = [
		23, 1, 3, 5, 7,
	];

	/**
	 * 根据小时获取对应的更数（0-4，对应一更到五更）
	 * @param hour 小时（24小时制）
	 * @returns 更数索引（0-4），若不在更点范围内，返回-1
	 */
	static getWatchIndex(hour: number): number {
		// 一更
		if (hour >= 19 && hour < 23) return 0;
		// 二更（跨天）
		if (hour >= 23 || hour < 1) return 1;
		// 三更
		if (hour >= 1 && hour < 3) return 2;
		// 四更
		if (hour >= 3 && hour < 5) return 3;
		// 五更
		if (hour >= 5 && hour < 7) return 4;
		// 不在更点范围内
		return -1;
	}

	/**
	 * 根据小时获取对应的更名称
	 * @param hour 小时（24小时制）
	 * @returns 更名称，若不在更点范围内，返回空字符串
	 */
	static getWatchName(hour: number): string {
		const index = this.getWatchIndex(hour);
		return index >= 0 ? this.WATCH_NAMES[index] : "";
	}

	/**
	 * 根据小时获取对应的更描述
	 * @param hour 小时（24小时制）
	 * @returns 更描述，若不在更点范围内，返回空字符串
	 */
	static getWatchTimeDesc(hour: number): string {
		const index = this.getWatchIndex(hour);
		return index >= 0 ? this.WATCH_TIME_DESC[index] : "";
	}

	/**
	 * 判断给定小时是否在更点范围内
	 * @param hour 小时（24小时制）
	 * @returns 是否在更点范围内
	 */
	static isInWatchTime(hour: number): boolean {
		return this.getWatchIndex(hour) >= 0;
	}

	/**
	 * 获取所有更数信息
	 * @returns 更数信息数组
	 */
	static getAllWatchInfo(): WatchInfo[] {
		return this.WATCH_NAMES.map((name, index) => ({
			name,
			timeDesc: this.WATCH_TIME_DESC[index],
			startHour: this.WATCH_HOUR_STARTS[index],
			endHour: this.WATCH_HOUR_ENDS[index],
		}));
	}
}

export default NightWatch;
