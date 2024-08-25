import DateTime from "../DateTime";
import LunarInfo from "./LunarInfo";
import GanZhi from "./GanZhi";
import ChineseDateUtil from "./ChineseDateUtil";
import NumberUtil from "../../number/NumberUtil";
import DateZodiac from "../DateZodiac";

class ChineseDate {

    // 农历年
    chineseYear: number

    // 农历月
    chineseMonth: number

    // 农历天
    chineseDay: number

    // 公历日期
    date: DateTime

    // 月名
    MONTH = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']

    // 月名
    MONTH_NAME = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊']

    // 日名
    DAY_NAME = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十', '卅一']

    constructor(date: Date | DateTime);
    constructor(chineseYear: number, chineseMonth: number, chineseDay: number);

    constructor(chineseYearOrDate: number | Date | DateTime, chineseMonth?: number, chineseDay?: number) {
        if (chineseYearOrDate instanceof Date || chineseYearOrDate instanceof DateTime) {
            this.date = new DateTime(chineseYearOrDate);
            const chineseDate = ChineseDateUtil.solarToLunar(chineseYearOrDate.getFullYear(), chineseYearOrDate.getMonth() + 1, chineseYearOrDate.getDate());
            this.chineseYear = chineseDate.chineseYear;
            this.chineseMonth = chineseDate.chineseMonth;
            this.chineseDay = chineseDate.chineseDay;
            return this;
        } else if (NumberUtil.isEmpty(chineseMonth) || NumberUtil.isEmpty(chineseDay)) {
            throw new Error("ChineseMonth and chineseDay must has.");
        }
        this.chineseYear = chineseYearOrDate;
        this.chineseMonth = chineseMonth!;
        this.chineseDay = chineseDay!;
        this.date = ChineseDateUtil.lunarToSolar(chineseYearOrDate, chineseMonth!, chineseDay!);
    }

    toDate() {
        return this.date;
    }

    /**
     * 判断是否闰月
     * @param chineseYear 农历年
     * @param chineseMonth 农历月
     */
    isLeapMonth(chineseYear: number, chineseMonth: number): boolean {
        return LunarInfo.leapMonth(chineseYear) === chineseMonth;
    }

    /**
     * 判断是否闰年
     * @param chineseYear 农历年
     */
    isLeapYear(chineseYear: number): boolean {
        return LunarInfo.leapDays(chineseYear) !== 0;
    }

    /**
     * 获取生肖
     * @param year 年份
     */
    getChineseZodiac(year: number): string {
        return DateZodiac.getChineseZodiac(year);
    }

    /**
     * 获取天干
     * @param chineseYear 农历年
     */
    getGan(chineseYear: number): string {
        return GanZhi.getGan(chineseYear);
    }

    /**
     * 获取地支
     * @param chineseYear 农历年
     */
    getZhi(chineseYear: number): string {
        return GanZhi.getZhi(chineseYear);
    }

    /**
     * 获取干支纪年
     * @param chineseYear 农历年
     */
    getCyclical(chineseYear: number): string {
        return this.getGan(chineseYear) + this.getZhi(chineseYear);
    }

    /**
     * 获取月名
     * @param chineseMonth 农历月
     */
    getMonthName(chineseMonth: number): string {
        return this.MONTH[chineseMonth - 1];
    }

    /**
     * 获取传统月名
     * @param chineseMonth 农历月
     */
    getMonthTraditionalName(chineseMonth: number): string {
        return this.MONTH_NAME[chineseMonth - 1];
    }

    /**
     * 获取农历日
     * @param chineseDay 农历日名
     */
    getDayName(chineseDay: number): string {
        return this.DAY_NAME[chineseDay - 1];
    }

    toString() {
        return GanZhi.getYearGanZhi(this.date.getFullYear()).concat('年', ' ', this.getMonthTraditionalName(this.chineseMonth), '月', this.getDayName(this.chineseDay));
    }
}

export default ChineseDate
