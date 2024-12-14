import SolarTerms from "./SolarTerms";
import DateTime from "../DateTime";
import LunarInfo from "./LunarInfo";
import DateUtil from "../DateUtil";

/**
 * 干支工具
 */
class GanZhi {

    // 天干
    GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]

    // 地支
    ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

    /**
     * 获取农历年干支索引
     * @param year 农历年
     */
    getYearIndex(year: number) {
        // 1984 年为甲子年，12000 为 100 个甲子（120年），200个花甲（60年），12000 是为了能够追溯 1984 年之前的 12000 年，通过取余获取干支索引
        return year - 1984 + (120 * 100);
    }

    /**
     * 获取天干
     * @param index 干支索引
     */
    getGan(index: number): string {
        return this.GAN[index % 10];
    }

    /**
     * 获取地支
     * @param index 地支索引
     */
    getZhi(index: number): string {
        return this.ZHI[index % 12];
    }

    /**
     * 获取年干支
     * @param year 年份
     */
    getYearGan(year: number): string {
        return this.getGan(this.getYearIndex(year));
    }

    /**
     * 获取年地支
     * @param year 年份
     */
    getYearZhi(year: number): string {
        return this.getZhi(this.getYearIndex(year));
    }

    /**
     * 获取年干支
     * @param year 农历年
     */
    getYearGanZhi(year: number): string {
        return this.getYearGan(year) + this.getYearZhi(year);
    }

    /**
     * 获取月干支索引
     * @param year 年份
     * @param month 公历月份
     * @param day 公历天
     */
    getMonthIndex(year: number, month: number, day: number): number {
        // 获取所在节气的公历第一天
        const firstDay = SolarTerms.getTermDay(year, month * 2 - 1);
        // 1903 年 12 月 8 日为甲子月，按 1900 年起的公式
        let monthIndex = (year - 1900) * 12 + month + 11;
        // 如果当前天大与节气开始天，则月份加一
        if (day >= firstDay) {
            ++monthIndex;
        }
        return monthIndex;
    }

    /**
     * 获取月份干支
     * @param year 年份
     * @param month 公历月份
     * @param day 公历天
     */
    getMonthGan(year: number, month: number, day: number): string {
        return this.getGan(this.getMonthIndex(year, month, day));
    }

    /**
     * 获取月份地支
     * @param year 年份
     * @param month 公历月份
     * @param day 公历天
     */
    getMonthZhi(year: number, month: number, day: number): string {
        return this.getZhi(this.getMonthIndex(year, month, day));
    }

    /**
     * 获取月份干支
     * @param year 年份
     * @param month 公历月份
     * @param day 公历天
     */
    getMonthGanZhi(year: number, month: number, day: number): string {
        const monthIndex = this.getMonthIndex(year, month, day);
        return this.getGan(monthIndex) + this.getZhi(monthIndex);
    }

    /**
     * 获取天的干支索引
     * @param year 年份
     * @param month 公历月份
     * @param day 公历天
     */
    getDayIndex(year: number, month: number, day: number): number {
        // 1900 年 2 月 20 日为甲子日，1900 年 1 月 31 日与之相差 19 天，故加 41 补全
        const days = DateUtil.getEpochDay(new DateTime(year, month - 1, day)) - 1
        return days - DateUtil.getEpochDay(LunarInfo.BASE_DATE) + 41
    }

    /**
     * 获取天干支
     * @param year 年份
     * @param month 公历月份
     * @param day 公历天
     */
    getDayGan(year: number, month: number, day: number): string {
        return this.getGan(this.getDayIndex(year, month, day));
    }

    /**
     * 获取天地址
     * @param year 年份
     * @param month 公历月份
     * @param day 公历天
     */
    getDayZhi(year: number, month: number, day: number): string {
        return this.getZhi(this.getDayIndex(year, month, day));
    }

    /**
     * 获取天干支
     * @param year 年份
     * @param month 公历月份
     * @param day 公历天
     */
    getDayGanZhi(year: number, month: number, day: number): string {
        const dayIndex = this.getDayIndex(year, month, day);
        return this.getGan(dayIndex) + this.getZhi(dayIndex);
    }

    /**
     * 获取干支纪日
     * @param year 年份
     * @param month 公历月份
     * @param day 公历天
     */
    fullGanZhi(year: number, month: number, day: number): string {
        return this.getYearGanZhi(year).concat('年', ' ', this.getMonthGanZhi(year, month, day), '月', ' ', this.getDayGanZhi(year, month, day), '日');
    }
}

export default new GanZhi()
