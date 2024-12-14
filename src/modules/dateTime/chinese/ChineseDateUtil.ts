import DateTime from "../DateTime";
import LunarInfo from "./LunarInfo";
import ChineseDate from "./ChineseDate";
import DateUtil from "../DateUtil";

class ChineseDateUtil {

    /**
     * 公历转农历，适用于 1900.1.31~2100.12.1
     * @param year 公历年
     * @param month 公历月
     * @param day 公历天
     */
    solarToLunar(year: number, month: number, day: number): ChineseDate {
        let offset = DateUtil.getEpochDay(new DateTime(year, month, day)) - DateUtil.getEpochDay(LunarInfo.BASE_DATE);


        let iYear = 1900;
        while (iYear <= LunarInfo.MAX_YEAR) {
            const daysOfYear = LunarInfo.yearDays(iYear);
            if (offset < daysOfYear) {
                break;
            }
            offset -= daysOfYear;
            iYear++;
        }

        let leapMonth = LunarInfo.leapMonth(iYear);
        let hasLeapMonth = false;

        let monthNum = 1;
        while (monthNum < 13) {
            let daysOfMonth;
            if (leapMonth > 0 && monthNum === leapMonth + 1) {
                daysOfMonth = LunarInfo.leapDays(iYear);
                hasLeapMonth = true;
            } else {
                daysOfMonth = LunarInfo.monthDays(iYear, hasLeapMonth ? monthNum - 1 : monthNum);
            }

            if (offset < daysOfMonth) {
                break;
            }

            offset -= daysOfMonth;
            monthNum++;
        }

        const isLeapMonth = leapMonth > 0 && monthNum === leapMonth + 1;
        if (hasLeapMonth && !isLeapMonth) {
            monthNum--;
        }

        return new ChineseDate(iYear, monthNum - 1, offset + 1)
    }


    /**
     * 农历转公历，适用于 1900.1.31~2100.12.1
     * @param chineseYear 农历年
     * @param chineseMonth 农历月
     * @param chineseDay 农历天
     */
    lunarToSolar(chineseYear: number, chineseMonth: number, chineseDay: number): DateTime {
        let isLeapMonth = chineseMonth === LunarInfo.leapMonth(chineseYear);
        if (chineseMonth !== LunarInfo.leapMonth(chineseYear)) {
            isLeapMonth = false;
        }
        chineseMonth = isLeapMonth ? chineseMonth + 1 : chineseMonth;
        if (chineseYear === 2100 && chineseMonth === 12 && chineseDay > 1 || chineseYear === 1900 && chineseMonth === 1 && chineseDay < 31) {
            // 超出了最大极限值
            throw new Error("The date is outside the valid range. Please enter a date between 1900.1.31 and 2100.12.1.");
        } else {
            let day = LunarInfo.monthDays(chineseYear, chineseMonth);
            let _day: number = day;
            if (isLeapMonth) {
                _day = LunarInfo.leapDays(chineseYear);
            }

            // 参数合法性效验
            if (chineseYear < 1900 || chineseYear > 2100 || chineseDay > _day) {
                throw new Error("The date is outside the valid range. Please enter a date between 1900.1.31 and 2100.12.1.");
            }
            // 计算农历的时间差
            let offset = 0;
            for (let i = 1900; i < chineseYear; i++) {
                offset += LunarInfo.yearDays(i);
            }

            let leap = 0
            let isAdd = false
            for (let i = 1; i < chineseMonth; i++) {
                leap = LunarInfo.leapMonth(chineseYear);
                if (!isAdd) { // 处理闰月
                    if (leap <= i && leap > 0) {
                        offset += LunarInfo.leapDays(chineseYear);
                        isAdd = true;
                    }
                }
                offset += LunarInfo.monthDays(chineseYear, i)
            }

            // 转换闰月农历 需补充该年闰月的前一个月的时差
            if (isLeapMonth) {
                offset += day
            }
            // 1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
            const timestamp = Date.UTC(1900, 1, 30, 0, 0, 0);
            return new DateTime((offset + chineseDay - 31) * 86400000 + timestamp);
        }
    }
}

export default new ChineseDateUtil()
