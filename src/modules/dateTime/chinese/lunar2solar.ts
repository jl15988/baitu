/**
 * 农历1900-2100的润大小信息表
 * @return Hex
 */
const lunarInfo = [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900-1909
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910-1919
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920-1929
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930-1939
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940-1949
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049
    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059
    0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069
    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079
    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089
    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, // 2090-2099
    0x0d520] // 2100

/**
 * 返回农历年一整年的总天数
 * @param chineseYear 农历年
 */
function lYearDays(chineseYear: number): number {
    let sum = 348
    for (let i = 0x8000; i > 0x8; i >>= 1) {
        sum += (lunarInfo[chineseYear - 1900] & i) ? 1 : 0
    }
    return (sum + leapDays(chineseYear))
}

/**
 * 返回农历年闰月是哪个月；若没有则返回0
 * @param chineseYear 农历年
 */
function leapMonth(chineseYear: number): number {
    return (lunarInfo[chineseYear - 1900] & 0xf)
}


/**
 * 返回农历年闰月的天数 若该年没有闰月则返回0
 * @param chineseYear 农历年
 */
function leapDays(chineseYear: number): 30 | 29 | 0 {
    if (leapMonth(chineseYear)) {
        return ((lunarInfo[chineseYear - 1900] & 0x10000) ? 30 : 29)
    }
    return (0)
}

/**
 * 返回农历年月（非闰月）的总天数
 * @param chineseYear 农历年
 * @param chineseMonth 农历月
 */
function monthDays(chineseYear: number, chineseMonth: number): 30 | 29 {
    return ((lunarInfo[chineseYear - 1900] & (0x10000 >> chineseMonth)) ? 30 : 29)
}

/**
 * 农历转公历，适用于1900.1.31~2100.12.1
 * @param chineseYear 农历年
 * @param chineseMonth 农历月
 * @param chineseDay 农历天
 */
export default function lunar2solar(chineseYear: number, chineseMonth: number, chineseDay: number): Date {
    let isLeapMonth = chineseMonth === leapMonth(chineseYear);
    if (chineseMonth !== leapMonth(chineseYear)) {
        isLeapMonth = false;
    }
    chineseMonth = isLeapMonth ? chineseMonth + 1 : chineseMonth;
    if (chineseYear === 2100 && chineseMonth === 12 && chineseDay > 1 || chineseYear === 1900 && chineseMonth === 1 && chineseDay < 31) {
        // 超出了最大极限值
        return null;
    } else {
        let day = monthDays(chineseYear, chineseMonth);
        let _day: number = day;
        if (isLeapMonth) {
            _day = leapDays(chineseYear);
        }

        // 参数合法性效验
        if (chineseYear < 1900 || chineseYear > 2100 || chineseDay > _day) {
            return null;
        }
        // 计算农历的时间差
        let offset = 0;
        for (let i = 1900; i < chineseYear; i++) {
            offset += lYearDays(i);
        }

        let leap = 0
        let isAdd = false
        for (let i = 1; i < chineseMonth; i++) {
            leap = leapMonth(chineseYear);
            if (!isAdd) { // 处理闰月
                if (leap <= i && leap > 0) {
                    offset += leapDays(chineseYear);
                    isAdd = true;
                }
            }
            offset += monthDays(chineseYear, i)
        }

        // 转换闰月农历 需补充该年闰月的前一个月的时差
        if (isLeapMonth) {
            offset += day
        }
        // 1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
        const stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
        return new Date((offset + chineseDay - 31) * 86400000 + stmap);
    }
}
