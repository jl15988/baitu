import DateTime from "./DateTime";
import NumberUtil from "../number/NumberUtil";

class DateZodiac {

    // 星座天
    ZODIACS_DAY = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 23, 22]
    // 星座
    ZODIACS = ["摩羯座", "水瓶座", "双鱼座", "白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座", "天蝎座", "射手座", "摩羯座"]
    // 生肖
    CHINESE_ZODIACS = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"]

    /**
     * 获取星座
     * @param date 日期
     */
    getZodiac(date: Date | DateTime): string;
    /**
     * 获取星座
     * @param month 月份
     * @param day 天
     */
    getZodiac(month: number, day: number): string;

    /**
     * 获取星座
     * @param monthOrDate 月份或日期
     * @param day 天
     */
    getZodiac(monthOrDate: number | Date | DateTime, day?: number): string {
        let month: number;
        if (monthOrDate instanceof Date || monthOrDate instanceof DateTime) {
            month = monthOrDate.getMonth() + 1;
            day = monthOrDate.getDay();
        } else {
            if (NumberUtil.isEmpty(day)) {
                throw new Error("Day must has.")
            }
            month = monthOrDate;
        }
        return day! < this.ZODIACS_DAY[month] ? this.ZODIACS[month] : this.ZODIACS[month + 1];
    }

    /**
     * 获取农历生肖
     * @param year 年份
     */
    getChineseZodiac(year: number): string {
        return this.CHINESE_ZODIACS[(year - 1900 + this.CHINESE_ZODIACS.length * 2000) % this.CHINESE_ZODIACS.length];
    }
}

export default new DateZodiac();
