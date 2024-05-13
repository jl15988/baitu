import JulianDay from "./JulianDay";
import JN from "./data/JN";
import JR from "./data/JR";
import SSQ from "./SSQ";
import {JRW} from "./data/JRW";
import Ephemeris from "./Ephemeris";
import lunar2solar from "./lunar2solar";

function int2(v) {
    return Math.floor(v);
}

export interface DayInfo {
    // 儒略日
    julian?: number,
    // 月
    month?: number,
    // 月名称
    monthName?: string,
    // 下个月名称
    nextMonth?: string,
    // 月大小
    monthSize?: number,
    // 是否闰月
    leapMonth?: boolean,
    // 日下标
    dayIndex?: number,
    // 日名称
    name?: string,
    // 距冬至的天数
    curDz?: number,
    // 距夏至的天数
    curXz?: number,
    // 距立秋的天数
    curLq?: number,
    // 距芒种的天数
    curMz?: number,
    // 距小暑的天数
    curXs?: number,
    // 节气
    solarTerms?: string,
    // 天干，2000年1月7日起算
    gan?: string,
    // 地支，2000年1月7日起算
    zhi?: string
}

export interface DayAllInfo {
    // 儒略日
    julian?: number;
    // 日下标
    dayIndex?: number;
    // 日名称
    name?: string;
    // 距冬至的天数
    curDz?: number;
    // 距夏至的天数
    curXz?: number;
    // 距立秋的天数
    curLq?: number;
    // 距芒种的天数
    curMz?: number;
    // 距小暑的天数
    curXs?: number;
    // 节气
    solarTerms?: SolarTermsInfo;
    // 月相
    lunarPhaseInfo?: LunarPhaseInfo;
    // 天干，2000年1月7日起算
    gan?: string;
    // 地支，2000年1月7日起算
    zhi?: string;
    // 月信息
    month: MonthInfo;
    // 年信息
    year: YearInfo;
    // 节日信息
    festival?: FestivalInfo;
}

export interface MonthInfo {
    // 月序号
    order?: number;
    // 月名
    name?: string;
    // 下个月名
    nextName?: string;
    // 是否闰月
    isLeap?: boolean;
    // 月大小
    size?: number;
    // 首日儒略日
    julian?: number;
    // 天干，相对于1998年12月7
    gan?: string;
    // 地支，相对于1998年12月7
    zhi?: string;
}

export interface YearInfo {
    // 年次
    order?: number;
    // 黄帝年次
    huangdiOrder?: number;
    // 朝代
    dynasty?: string;
    // 朝代名称
    name?: string;
    // 统治者
    ruler?: string;
    // 年号
    eraName?: string;
    // 天干
    gan?: string;
    // 地支
    zhi?: string;
    // 生肖
    shx?: string;
}

export interface DynastyInfo {
    // 朝代
    dynasty?: string;
    // 朝代名称
    name?: string;
    // 统治者
    ruler?: string;
    // 年号
    eraName?: string;
}

export interface FestivalInfo {
    // 重要的
    super: string[];
    // 普通的
    common: string[];
    // 其他
    other: string[];
}

export interface SolarTermsInfo {
    name?: string,
    time?: string,
    jd?: number
}

export interface LunarPhaseInfo {
    name?: string,
    time?: string,
    jd?: number
}

class ChineseDateUtil {

    //某月的第几个星期几,如第2个星期一指从月首开始顺序找到第2个“星期一”
    JRW: string[] = JRW

    // 中文数字
    numCn = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

    // 天干
    Gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]

    // 地支
    Zhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

    // 生肖
    ShX = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"]

    // 节气
    Jq = ['冬至', '小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪']

    // 月名
    Ym = ['十一', '十二', '正', '二', '三', '四', '五', '六', '七', '八', '九', '十']

    // 日名
    Rm = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十', '卅一']

    //月相名
    Yxm = ["朔", "上弦", "望", "下弦"]

    // 假日表
    JRB: string[][] = JR

    // 纪年表
    JNB: (string | number)[] = JN

    // getDayName(u, r) { //取某日节日,传入日对象
    //     /****************
    //      节日名称生成
    //      传入日物件u
    //      返回某日节日信息
    //      r.A 重要喜庆日子名称(可将日子名称置红)
    //      r.B 重要日子名称
    //      r.C 各种日子名称(连成一大串)
    //      r.Fjia 放假日子(可用于日期数字置红)
    //      *****************/
    //     var m0 = (u.m < 10 ? '0' : '') + u.m;
    //     var d0 = (u.d < 10 ? '0' : '') + u.d;
    //     var i, j, s, s2, type;
    //
    //     if (u.week == 0 || u.week == 6) r.Fjia = 1; //星期日或星期六放假
    //
    //     //按公历日期查找
    //     for (i = 0; i < this.JRB[u.m - 1].length; i++) { //公历节日或纪念日,遍历本月节日表
    //         s = this.JRB[u.m - 1][i];
    //         if (s.substr(0, 2) != d0) continue;
    //         s = s.substr(2, s.length - 2);
    //         type = s.substr(0, 1);
    //         if (s.substr(5, 1) == '-') { //有年限的
    //             if (u.y < (s.substr(1, 4) - 0) || u.y > (s.substr(6, 4) - 0)) continue;
    //             s = s.substr(10, s.length - 10);
    //         } else {
    //             if (u.y < 1850) continue;
    //             s = s.substr(1, s.length - 1);
    //         }
    //         if (type == '#') r.A += s + ' ', r.Fjia = 1; //放假的节日
    //         if (type == 'I') r.B += s + ' '; //主要
    //         if (type == '.') r.C += s + ' '; //其它
    //     }
    //
    //     //按周查找
    //     var w = u.weeki;
    //     if (u.week >= u.week0) w += 1;
    //     var w2 = w;
    //     if (u.weeki == u.weekN - 1) w2 = 5;
    //     w = m0 + w + u.week;  //d日在本月的第几个星期某
    //     w2 = m0 + w2 + u.week;
    //
    //     for (i = 0; i < this.JRW.length; i++) {
    //         s = this.JRW[i];
    //         s2 = s.substr(0, 4);
    //         if (s2 != w && s2 != w2) continue;
    //         type = s.substr(4, 1);
    //         s = s.substr(5, s.length - 5);
    //         if (type == '#') r.A += s + ' ', r.Fjia = 1;
    //         if (type == 'I') r.B += s + ' ';
    //         if (type == '.') r.C += s + ' ';
    //     }
    // }

    // getFestival(year: number, month: number, day: number) { //取某日节日,传入日对象
    //     /****************
    //      节日名称生成
    //      传入日物件u
    //      返回某日节日信息
    //      r.A 重要喜庆日子名称(可将日子名称置红)
    //      r.B 重要日子名称
    //      r.C 各种日子名称(连成一大串)
    //      r.Fjia 放假日子(可用于日期数字置红)
    //      *****************/
    //     const result = {
    //         A: '',
    //         B: '',
    //         C: ''
    //     }
    //     let m0 = (month < 10 ? '0' : '') + month;
    //     let d0 = (day < 10 ? '0' : '') + day;
    //     var i, j, s, s2, type;
    //
    //     // if (u.week == 0 || u.week == 6) r.Fjia = 1; //星期日或星期六放假
    //
    //     //按公历日期查找
    //     for (i = 0; i < this.JRB[month - 1].length; i++) { //公历节日或纪念日,遍历本月节日表
    //         s = this.JRB[month - 1][i];
    //         if (s.substr(0, 2) != d0) continue;
    //         s = s.substr(2, s.length - 2);
    //         type = s.substr(0, 1);
    //         if (s.substr(5, 1) == '-') { //有年限的
    //             if (year < (s.substr(1, 4) - 0) || year > (s.substr(6, 4) - 0)) continue;
    //             s = s.substr(10, s.length - 10);
    //         } else {
    //             if (year < 1850) continue;
    //             s = s.substr(1, s.length - 1);
    //         }
    //         if (type == '#') result.A += s + ' '; //放假的节日
    //         if (type == 'I') result.B += s + ' '; //主要
    //         if (type == '.') result.C += s + ' '; //其它
    //     }
    //
    //     //按周查找
    //     const date = new Date(year, month, day);
    //     let w = date.getDay();
    //     const firstMonthDay = new Date(year, month, 1);
    //     const endMonthDay = new Date(year, month + 1, -1);
    //     if (w + 1 >= firstMonthDay.getDay() + 1) w += 1;
    //     let w2 = w;
    //     if (w == firstMonthDay.getDay() + endMonthDay.getDate()) w2 = 5;
    //     w = m0 + w + date.getDay() + 1;  //d日在本月的第几个星期某
    //     w2 = m0 + w2 + date.getDay() + 1;
    //
    //     for (i = 0; i < this.JRW.length; i++) {
    //         s = this.JRW[i];
    //         s2 = s.substr(0, 4);
    //         if (s2 != w && s2 != w2) continue;
    //         type = s.substr(4, 1);
    //         s = s.substr(5, s.length - 5);
    //         if (type == '#') result.A += s + ' ';
    //         if (type == 'I') result.B += s + ' ';
    //         if (type == '.') result.C += s + ' ';
    //     }
    //     return result;
    // }

    /**
     * 通过公历获取农历节日
     * @param year 年
     * @param month 月
     * @param day 日
     */
    getFestival(year: number, month: number, day: number): FestivalInfo {
        const dayInfo = this.getDaySimpleInfo(year, month, day);
        return this.getFestivalByDayAllInfo(dayInfo);
    }

    /**
     * 通过日全信息获取农历节日
     * @param dayAllInfo 日全信息
     */
    getFestivalByDayAllInfo(dayAllInfo: DayAllInfo): FestivalInfo {
        const festival: FestivalInfo = {
            super: [],
            common: [],
            other: []
        }
        const dayInfo = dayAllInfo;
        //按农历日期查找重量点节假日
        const d = dayInfo.month.name + (dayInfo.month.name.length < 2 ? '月' : '') + dayInfo.name;
        if (!dayInfo.month.isLeap) {
            if (d == '正月初一') {
                festival.super.push('春节')
            }
            if (d == '正月初二') {
                festival.common.push('大年初二');
            }
            if (d == '五月初五') {
                festival.super.push('端午节');
            }
            if (d == '八月十五') {
                festival.super.push('中秋节');
            }
            if (d == '正月十五') {
                festival.super.push('元宵节');
                festival.common.push('上元节');
                festival.other.push('壮族歌墟节');
                festival.other.push('苗族踩山节');
                festival.other.push('达斡尔族卡钦');
            }
            if (d == '正月十六') {
                festival.other.push('侗族芦笙节(至正月二十)');
            }
            if (d == '正月廿五') {
                festival.other.push('填仓节');
            }
            if (d == '正月廿九') {
                festival.other.push('送穷日');
            }
            if (d == '二月初一') {
                festival.other.push('瑶族忌鸟节');
            }
            if (d == '二月初二') {
                festival.common.push('春龙节(龙抬头)');
                festival.other.push('畲族会亲节');
            }
            if (d == '二月初八') {
                festival.other.push('傈傈族刀杆节');
            }
            if (d == '三月初三') {
                festival.common.push('北帝诞');
                festival.other.push('苗族黎族歌墟节');
            }
            if (d == '三月十五') {
                festival.other.push('白族三月街(至三月二十)');
            }
            if (d == '三月廿三') {
                festival.common.push('天后诞');
                festival.common.push('妈祖诞');
            }
            if (d == '四月初八') {
                festival.common.push('牛王诞');
            }
            if (d == '四月十八') {
                festival.other.push('锡伯族西迁节');
            }
            if (d == '五月十三') {
                festival.common.push('关帝诞');
                festival.other.push('阿昌族泼水节');
            }
            if (d == '五月廿二') {
                festival.other.push('鄂温克族米阔鲁节');
            }
            if (d == '五月廿九') {
                festival.other.push('瑶族达努节');
            }
            if (d == '六月初六') {
                festival.common.push('姑姑节');
                festival.common.push('天贶节');
                festival.other.push('壮族祭田节');
                festival.other.push('瑶族尝新节');
            }
            if (d == '六月廿四') {
                festival.other.push('火把节、星回节(彝、白、佤、阿昌、纳西、基诺族)');
            }
            ;
            if (d == '七月初七') {
                festival.common.push('七夕(中国情人节,乞巧节,女儿节)');
            }
            if (d == '七月十三') {
                festival.other.push('侗族吃新节');
            }
            if (d == '七月十五') {
                festival.common.push('中元节');
                festival.common.push('鬼节');
            }
            if (d == '九月初九') {
                festival.common.push('重阳节');
            }
            if (d == '十月初一') {
                festival.common.push('祭祖节(十月朝)');
            }
            if (d == '十月十五') {
                festival.common.push('下元节');
            }
            if (d == '十月十六') {
                festival.other.push('瑶族盘王节');
            }
            if (d == '十二初八') {
                festival.common.push('腊八节');
            }
        }
        //最后一月
        if (dayInfo.month.nextName == '正') {
            if (d == '十二三十' && dayInfo.month.size == 30) {
                festival.super.push('除夕');
            }
            if (d == '十二廿九' && dayInfo.month.size == 29) {
                festival.super.push('除夕');
            }
            if (d == '十二廿三') {
                festival.common.push('小年');
            }
        }
        if (dayInfo.solarTerms) {
            if (dayInfo.solarTerms.name === "清明") {
                festival.super.push(dayInfo.solarTerms.name);
            } else {
                festival.common.push(dayInfo.solarTerms.name);
            }
        }

        //农历杂节
        let w;
        if (dayInfo.curDz >= 0 && dayInfo.curDz < 81) { //数九
            w = this.numCn[Math.floor(dayInfo.curDz / 9) + 1];
            if (dayInfo.curDz % 9 == 0) {
                festival.common.push('『' + w + '九』');
            } else {
                festival.other.push(w + '九第' + (dayInfo.curDz % 9 + 1) + '天');
            }
        }

        if (dayInfo.curXz >= 20 && dayInfo.curXz < 30 && dayInfo.gan == '庚') {
            festival.common.push('初伏');
        }
        if (dayInfo.curXz >= 30 && dayInfo.curXz < 40 && dayInfo.gan == '庚') {
            festival.common.push('中伏');
        }
        if (dayInfo.curLq >= 0 && dayInfo.curLq < 10 && dayInfo.gan == '庚') {
            festival.common.push('末伏');
        }
        if (dayInfo.curMz >= 0 && dayInfo.curMz < 10 && dayInfo.gan == '丙') {
            festival.common.push('入梅');
        }
        if (dayInfo.curXs >= 0 && dayInfo.curXs < 12 && dayInfo.zhi == '未') {
            festival.common.push('出梅');
        }
        return festival;
    }

    /**
     * 获取生肖
     * @param chineseYear 农历年
     */
    getChineseZodiac(chineseYear: number): string {
        const yIndex = chineseYear - 1984 + 12000;
        return this.ShX[yIndex % 12];
    }

    /**
     * 获取天干
     * @param chineseYear 农历年
     */
    getGan(chineseYear: number): string {
        const yIndex = chineseYear - 1984 + 12000;
        return this.Gan[yIndex % 10];
    }

    /**
     * 获取地支
     * @param chineseYear 农历年
     */
    getZhi(chineseYear: number): string {
        const yIndex = chineseYear - 1984 + 12000;
        return this.Zhi[yIndex % 12];
    }

    /**
     * 获取干支纪年
     * @param chineseYear 农历年
     */
    getCyclical(chineseYear: number): string {
        return this.getGan(chineseYear) + this.getZhi(chineseYear);
    }

    /**
     * 获取黄帝纪年
     * @param chineseYear 农历年
     */
    getHuangdiYear(chineseYear: number): number {
        return chineseYear + 2698;
    }

    /**
     * 获取朝代
     * @param year 年
     */
    getDynasty(year: number): DynastyInfo {
        const dynasty: DynastyInfo = {}
        const jnb = this.JNB;
        let j;
        for (let i = 0; i < jnb.length; i += 7) {
            j = Number(jnb[i]);
            if (year < j || year >= j + jnb[i + 1]) continue;
            dynasty.eraName = <string>jnb[i + 6];
            dynasty.dynasty = <string>jnb[i + 3];
            dynasty.name = <string>jnb[i + 4];
            dynasty.ruler = <string>jnb[i + 5];
        }
        return dynasty;
    }

    getMonthDays(year: number, month: number) {
        //公历月首,中午
        const monthStart = int2(JulianDay.getJulianDay(year, month, 1, 12, 0, 0.1)) - JulianDay.J2000;
        let month2 = month, year2 = year;
        if (++month2 > 12) {
            year2 = year + 1;
            month2 = 1;
        }
        //本月天数(公历)
        const monthDayNum: number = int2(JulianDay.getJulianDay(year2, month2, 1, 12, 0, 0.1)) - JulianDay.J2000 - monthStart;
        //本月第一天的星期
        const monthStartWeek = (monthStart + JulianDay.J2000 + 1 + 7000000) % 7;

        const days: DayAllInfo[] = [];
        for (let day = 0; day < monthDayNum; day++) {
            const dayInfo: DayAllInfo = {
                month: {
                    isLeap: false
                },
                year: {},
                festival: {
                    super: [],
                    common: [],
                    other: []
                }
            }
            days.push(dayInfo);
            dayInfo.julian = monthStart + day;
            dayInfo.dayIndex = day;

            const julian = dayInfo.julian;

            //如果d0已在计算农历范围内则不再计算
            if (!SSQ.ZQ.length || julian < SSQ.ZQ[0] || julian >= SSQ.ZQ[24]) {
                SSQ.calcY(julian);
            }
            //农历所在月的序数
            let mk = int2((julian - SSQ.HS[0]) / 30);
            if (mk < 13 && SSQ.HS[mk + 1] <= julian) {
                mk++
            }
            //距农历月首的编移量,0对应初一
            dayInfo.dayIndex = julian - SSQ.HS[mk];
            //农历日名称
            dayInfo.name = this.Rm[dayInfo.dayIndex];
            dayInfo.curDz = julian - SSQ.ZQ[0];   //距冬至的天数
            dayInfo.curXz = julian - SSQ.ZQ[12];  //距夏至的天数
            dayInfo.curLq = julian - SSQ.ZQ[15];  //距立秋的天数
            dayInfo.curMz = julian - SSQ.ZQ[11];  //距芒种的天数
            dayInfo.curXs = julian - SSQ.ZQ[13];  //距小暑的天数

            if (julian == SSQ.HS[mk] || julian === monthStart) { //月的信息
                dayInfo.month.name = SSQ.ym[mk]; //月名称
                dayInfo.month.size = SSQ.dx[mk]; //月大小
                dayInfo.month.isLeap = (!!SSQ.leap && SSQ.leap === mk); //闰状况
                dayInfo.month.nextName = mk < 13 ? SSQ.ym[mk + 1] : "未知"; //下个月名称,判断除夕时要用到
            } else {
                const ob2: DayAllInfo = days[day - 1];
                if (!ob2) continue;
                dayInfo.month.name = ob2.month.name;
                dayInfo.month.size = ob2.month.size;
                dayInfo.month.isLeap = ob2.month.isLeap;
                dayInfo.month.nextName = ob2.month.nextName;
            }

            // 节气
            let qk = int2((julian - SSQ.ZQ[0] - 7) / 15.2184);
            // 节气的取值范围是0-23
            if (qk < 23 && julian >= SSQ.ZQ[qk + 1]) {
                qk++
            }
            if (julian === SSQ.ZQ[qk]) {
                dayInfo.solarTerms = {};
                dayInfo.solarTerms.name = this.Jq[qk];
            }

            //干支纪年处理
            let D;
            //以立春为界定年首
            // let D = SSQ.ZQ[3] + (julian < SSQ.ZQ[3] ? -365 : 0) + 365.25 * 16 - 35; //以立春为界定纪年
            // dayInfo.year.Lyear = Math.floor(D / 365.2422 + 0.5); //农历纪年(10进制,1984年起算)
            //以下几行以正月初一定年首
            D = SSQ.HS[2]; //一般第3个月为春节
            for (let j = 0; j < 14; j++) { //找春节
                if (SSQ.ym[j] != '正' || SSQ.leap == j && j) continue;
                D = SSQ.HS[j];
                if (julian < D) {
                    D -= 365;
                    break;
                } //无需再找下一个正月
            }
            D = D + 5810;  //计算该年春节与1984年平均春节(立春附近)相差天数估计
            const offset = Math.floor(D / 365.2422 + 0.5); //农历纪年(10进制,1984年起算)
            dayInfo.year.order = 1984 + offset;

            dayInfo.year.gan = this.getGan(dayInfo.year.order);
            dayInfo.year.zhi = this.getZhi(dayInfo.year.order);
            const dynasty = this.getDynasty(dayInfo.year.order);
            Object.assign(dayInfo.year, dynasty);
            //黄帝纪年
            dayInfo.year.huangdiOrder = this.getHuangdiYear(dayInfo.year.order);

            //纪月处理,1998年12月7(大雪)开始连续进行节气计数,0为甲子
            mk = int2((julian - SSQ.ZQ[0]) / 30.43685);
            //相对大雪的月数计算,mk的取值范围0-12
            if (mk < 12 && julian >= SSQ.ZQ[2 * mk + 1]) {
                mk++
            }

            //相对于1998年12月7(大雪)的月数,900000为正数基数
            D = mk + int2((SSQ.ZQ[12] + 390) / 365.2422) * 12 + 900000;
            dayInfo.month.gan = this.Gan[D % 10];
            dayInfo.month.zhi = this.Zhi[D % 12];

            //纪日,2000年1月7日起算
            D = julian - 6 + 9000000;
            dayInfo.gan = this.Gan[D % 10];
            dayInfo.zhi = this.Zhi[D % 12];

            // 节日
            dayInfo.festival = this.getFestivalByDayAllInfo(dayInfo);
        }

        //以下是月相与节气的处理
        let w, d, xn, D, jd2 = monthStart + JulianDay.dt_T(monthStart) - 8 / 24;
        //月相查找
        w = Ephemeris.MS_aLon(jd2 / 36525, 10, 3);
        w = int2((w - 0.78) / Math.PI * 2) * Math.PI / 2;
        do {
            d = this.so_accurate(w);
            D = int2(d + 0.5);
            xn = int2(w / Ephemeris.pi2 * 4 + 4000000.01) % 4;
            w += Ephemeris.pi2 / 4;
            if (D >= monthStart + monthDayNum) break;
            if (D < monthStart) continue;
            const dayInfo = days[D - monthStart];
            const lunarPhaseInfo: LunarPhaseInfo = {}
            lunarPhaseInfo.name = this.Yxm[xn]; //取得月相名称
            lunarPhaseInfo.jd = d;
            lunarPhaseInfo.time = JulianDay.timeStr(d);
            dayInfo.lunarPhaseInfo = lunarPhaseInfo;
        } while (D + 5 < monthStart + monthDayNum);

        //节气查找
        w = Ephemeris.S_aLon(jd2 / 36525, 3);
        w = int2((w - 0.13) / Ephemeris.pi2 * 24) * Ephemeris.pi2 / 24;
        do {
            d = this.qi_accurate(w);
            D = int2(d + 0.5);
            xn = int2(w / Ephemeris.pi2 * 24 + 24000006.01) % 24;
            w += Ephemeris.pi2 / 24;
            if (D >= monthStart + monthDayNum) break;
            if (D < monthStart) continue;
            const dayInfo = days[D - monthStart];
            const solarTermsInfo: SolarTermsInfo = {}
            solarTermsInfo.name = this.Jq[xn]; //取得节气名称
            solarTermsInfo.jd = d;
            solarTermsInfo.time = JulianDay.timeStr(d);
            dayInfo.solarTerms = solarTermsInfo;
        } while (D + 12 < monthStart + monthDayNum);
        return days;
    }

    /**
     * 获取月信息
     * @param year 年
     * @param month 月
     */
    // getMonthInfo(year: number, month: number) {
    //     const monthInfo: MonthInfo = {
    //         isLeap: false
    //     }
    //     //公历月首,中午
    //     const julian = int2(JulianDay.getJulianDay(year, month, 1, 12, 0, 0.1)) - JulianDay.J2000;
    //     monthInfo.julian = julian;
    //
    //     //如果julan已在计算农历范围内则不再计算
    //     if (!SSQ.ZQ.length || julian < SSQ.ZQ[0] || julian >= SSQ.ZQ[24]) {
    //         SSQ.calcY(julian);
    //     }
    //     //农历所在月的序数
    //     let mk = int2((julian - SSQ.HS[0]) / 30);
    //     if (mk < 13 && SSQ.HS[mk + 1] <= julian) {
    //         mk++
    //     }
    //
    //     //月名称
    //     monthInfo.name = SSQ.ym[mk];
    //     //月大小
    //     monthInfo.size = SSQ.dx[mk];
    //     //闰状况
    //     monthInfo.isLeap = (!!SSQ.leap && SSQ.leap === mk);
    //     //下个月名称
    //     monthInfo.nextName = mk < 13 ? SSQ.ym[mk + 1] : "未知";
    //
    //     //纪月处理,1998年12月7(大雪)开始连续进行节气计数,0为甲子
    //     mk = int2((julian - SSQ.ZQ[0]) / 30.43685);
    //     //相对大雪的月数计算,mk的取值范围0-12
    //     if (mk < 12 && julian >= SSQ.ZQ[2 * mk + 1]) {
    //         mk++
    //     }
    //
    //     //相对于1998年12月7(大雪)的月数,900000为正数基数
    //     const D = mk + int2((SSQ.ZQ[12] + 390) / 365.2422) * 12 + 900000;
    //     monthInfo.index = D % 12;
    //     monthInfo.gan = this.Gan[D % 10];
    //     monthInfo.zhi = this.Zhi[D % 12];
    //
    //     return monthInfo;
    // }

    /**
     * 获取农历月信息
     * @param chineseYear 农历年
     * @param chineseMonth 农历月
     */
    getMonthInfo(chineseYear: number, chineseMonth: number): MonthInfo {
        const monthInfo: MonthInfo = {
            isLeap: false
        }
        const julian = int2(JulianDay.getJulianDay(chineseYear, chineseMonth, 1, 12, 0, 0.1)) - JulianDay.J2000;
        //如果d0已在计算农历范围内则不再计算
        if (!SSQ.ZQ.length || julian < SSQ.ZQ[0] || julian >= SSQ.ZQ[24]) {
            SSQ.calcY(julian);
        }
        //农历所在月的序数
        let mk = int2((julian - SSQ.HS[0]) / 30);
        if (mk < 13 && SSQ.HS[mk + 1] <= julian) {
            mk++
        }
        //月名称
        monthInfo.name = SSQ.ym[mk];
        //月大小
        monthInfo.size = SSQ.dx[mk];
        //闰状况
        monthInfo.isLeap = (!!SSQ.leap && SSQ.leap === mk);
        //下个月名称,判断除夕时要用到
        monthInfo.nextName = mk < 13 ? SSQ.ym[mk + 1] : "未知";
        return monthInfo;
    }

    /**
     * 获取日信息
     * @param year 年
     * @param month 月
     * @param day 日
     */
    getDaySimpleInfo(year: number, month: number, day: number): DayAllInfo {
        const dayInfo: DayAllInfo = {
            month: {
                isLeap: false
            },
            year: {}
        }
        const julian = int2(JulianDay.getJulianDay(year, month, day, 12, 0, 0.1)) - JulianDay.J2000;
        const monthFirstJulian = int2(JulianDay.getJulianDay(year, month, 1, 12, 0, 0.1)) - JulianDay.J2000;
        dayInfo.julian = julian;

        //如果d0已在计算农历范围内则不再计算
        if (!SSQ.ZQ.length || julian < SSQ.ZQ[0] || julian >= SSQ.ZQ[24]) {
            SSQ.calcY(julian);
        }
        //农历所在月的序数
        let mk = int2((julian - SSQ.HS[0]) / 30);
        if (mk < 13 && SSQ.HS[mk + 1] <= julian) {
            mk++
        }
        dayInfo.month.order = mk - 1;
        // 距农历月首的编移量,0对应初一
        dayInfo.dayIndex = julian - SSQ.HS[mk];
        // 农历日名称
        dayInfo.name = this.Rm[dayInfo.dayIndex];
        // 距冬至的天数
        dayInfo.curDz = julian - SSQ.ZQ[0];
        // 距夏至的天数
        dayInfo.curXz = julian - SSQ.ZQ[12];
        // 距立秋的天数
        dayInfo.curLq = julian - SSQ.ZQ[15];
        // 距芒种的天数
        dayInfo.curMz = julian - SSQ.ZQ[11];
        // 距小暑的天数
        dayInfo.curXs = julian - SSQ.ZQ[13];

        //月名称
        dayInfo.month.name = SSQ.ym[mk];
        //月大小
        dayInfo.month.size = SSQ.dx[mk];
        //闰状况
        dayInfo.month.isLeap = (!!SSQ.leap && SSQ.leap === mk);
        //下个月名称,判断除夕时要用到
        dayInfo.month.nextName = mk < 13 ? SSQ.ym[mk + 1] : "未知";

        // 节气
        let qk = int2((julian - SSQ.ZQ[0] - 7) / 15.2184);
        // 节气的取值范围是0-23
        if (qk < 23 && julian >= SSQ.ZQ[qk + 1]) {
            qk++
        }
        if (julian === SSQ.ZQ[qk]) {
            dayInfo.solarTerms.name = this.Jq[qk];
        }

        return dayInfo;
    }

    /**
     * 获取日信息
     * @param year 年
     * @param month 月
     * @param day 日
     */
    getDayAllInfo(year: number, month: number, day: number): DayAllInfo {
        const dayInfo: DayAllInfo = {
            month: {
                isLeap: false
            },
            year: {},
            festival: {
                super: [],
                common: [],
                other: []
            }
        }
        const julian = int2(JulianDay.getJulianDay(year, month, day, 12, 0, 0.1)) - JulianDay.J2000;
        dayInfo.julian = julian;

        //如果d0已在计算农历范围内则不再计算
        if (!SSQ.ZQ.length || julian < SSQ.ZQ[0] || julian >= SSQ.ZQ[24]) {
            SSQ.calcY(julian);
        }
        //农历所在月的序数
        let mk = int2((julian - SSQ.HS[0]) / 30);
        if (mk < 13 && SSQ.HS[mk + 1] <= julian) {
            mk++
        }
        dayInfo.month.order = mk - 1;
        // 距农历月首的编移量,0对应初一
        dayInfo.dayIndex = julian - SSQ.HS[mk];
        // 农历日名称
        dayInfo.name = this.Rm[dayInfo.dayIndex];
        // 距冬至的天数
        dayInfo.curDz = julian - SSQ.ZQ[0];
        // 距夏至的天数
        dayInfo.curXz = julian - SSQ.ZQ[12];
        // 距立秋的天数
        dayInfo.curLq = julian - SSQ.ZQ[15];
        // 距芒种的天数
        dayInfo.curMz = julian - SSQ.ZQ[11];
        // 距小暑的天数
        dayInfo.curXs = julian - SSQ.ZQ[13];

        //月名称
        dayInfo.month.name = SSQ.ym[mk];
        //月大小
        dayInfo.month.size = SSQ.dx[mk];
        //闰状况
        dayInfo.month.isLeap = (!!SSQ.leap && SSQ.leap === mk);
        //下个月名称,判断除夕时要用到
        dayInfo.month.nextName = mk < 13 ? SSQ.ym[mk + 1] : "未知";

        // todo 这里暂时不理解为什么要取月首信息，经测试非月首信息也正确，所以暂时注释
        // if (julian === SSQ.HS[mk] || monthFirstJulian === julian) {
        //     //月名称
        //     dayInfo.monthName = SSQ.ym[mk];
        //     //月大小
        //     dayInfo.monthSize = SSQ.dx[mk];
        //     //闰状况
        //     dayInfo.leapMonth = (!!SSQ.leap && SSQ.leap === mk);
        //     //下个月名称,判断除夕时要用到
        //     dayInfo.nextMonth = mk < 13 ? SSQ.ym[mk + 1] : "未知";
        // } else {
        //     const ob2: DayInfo = this.getDayInfo(year, month, day - 1);
        //     if (ob2) {
        //         dayInfo.month = ob2.month;
        //         dayInfo.monthSize = ob2.monthSize;
        //         dayInfo.leapMonth = ob2.leapMonth;
        //         dayInfo.nextMonth = ob2.nextMonth;
        //     }
        // }

        // 节气
        let qk = int2((julian - SSQ.ZQ[0] - 7) / 15.2184);
        // 节气的取值范围是0-23
        if (qk < 23 && julian >= SSQ.ZQ[qk + 1]) {
            qk++
        }
        if (julian === SSQ.ZQ[qk]) {
            dayInfo.solarTerms = {};
            dayInfo.solarTerms.name = this.Jq[qk];
        }

        //干支纪年处理
        let D;
        //以立春为界定年首
        // let D = SSQ.ZQ[3] + (julian < SSQ.ZQ[3] ? -365 : 0) + 365.25 * 16 - 35; //以立春为界定纪年
        // dayInfo.year.Lyear = Math.floor(D / 365.2422 + 0.5); //农历纪年(10进制,1984年起算)
        //以下几行以正月初一定年首
        D = SSQ.HS[2]; //一般第3个月为春节
        for (let j = 0; j < 14; j++) { //找春节
            if (SSQ.ym[j] != '正' || SSQ.leap == j && j) continue;
            D = SSQ.HS[j];
            if (julian < D) {
                D -= 365;
                break;
            } //无需再找下一个正月
        }
        D = D + 5810;  //计算该年春节与1984年平均春节(立春附近)相差天数估计
        const offset = Math.floor(D / 365.2422 + 0.5); //农历纪年(10进制,1984年起算)
        dayInfo.year.order = 1984 + offset;

        dayInfo.year.shx = this.getChineseZodiac(dayInfo.year.order);
        dayInfo.year.gan = this.getGan(dayInfo.year.order);
        dayInfo.year.zhi = this.getZhi(dayInfo.year.order);
        const dynasty = this.getDynasty(dayInfo.year.order);
        Object.assign(dayInfo.year, dynasty);
        //黄帝纪年
        dayInfo.year.huangdiOrder = this.getHuangdiYear(dayInfo.year.order);

        //纪月处理,1998年12月7(大雪)开始连续进行节气计数,0为甲子
        mk = int2((julian - SSQ.ZQ[0]) / 30.43685);
        //相对大雪的月数计算,mk的取值范围0-12
        if (mk < 12 && julian >= SSQ.ZQ[2 * mk + 1]) {
            mk++
        }

        //相对于1998年12月7(大雪)的月数,900000为正数基数
        D = mk + int2((SSQ.ZQ[12] + 390) / 365.2422) * 12 + 900000;
        dayInfo.month.gan = this.Gan[D % 10];
        dayInfo.month.zhi = this.Zhi[D % 12];

        //纪日,2000年1月7日起算
        D = julian - 6 + 9000000;
        dayInfo.gan = this.Gan[D % 10];
        dayInfo.zhi = this.Zhi[D % 12];

        // 节日
        dayInfo.festival = this.getFestivalByDayAllInfo(dayInfo);

        return dayInfo;
    }

    /**
     * 获取节气
     * @param year 年
     * @param month 月
     * @param day 日
     */
    getSolarTermsInfo(year: number, month: number, day: number): SolarTermsInfo {
        let solarTermsInfo: SolarTermsInfo = null;
        const monthFirstJulian = int2(JulianDay.getJulianDay(year, month, 1, 12, 0, 0.1)) - JulianDay.J2000;
        const endOfMonth = new Date(year, month, 0);
        const montSize = endOfMonth.getDate();
        const jd2 = monthFirstJulian + JulianDay.dt_T(monthFirstJulian) - 8 / 24;
        let w, d, xn, D;
        //节气查找
        w = Ephemeris.S_aLon(jd2 / 36525, 3);
        w = int2((w - 0.13) / Ephemeris.pi2 * 24) * Ephemeris.pi2 / 24;
        do {
            d = this.qi_accurate(w);
            D = int2(d + 0.5);
            xn = int2(w / Ephemeris.pi2 * 24 + 24000006.01) % 24;
            w += Ephemeris.pi2 / 24;
            if (D >= monthFirstJulian + montSize) break;
            if (D < monthFirstJulian) continue;
            if (day === D - monthFirstJulian + 1) {
                solarTermsInfo = {};
                solarTermsInfo.name = this.Jq[xn]; //取得节气名称
                solarTermsInfo.jd = d;
                solarTermsInfo.time = JulianDay.timeStr(d);
                break;
            }
        } while (D + 12 < monthFirstJulian + montSize);
        return solarTermsInfo;
    }

    //精气
    qi_accurate(W) {
        let t = Ephemeris.S_aLon_t(W) * 36525;
        return t - JulianDay.dt_T(t) + 8 / 24;
    }

    //精朔
    so_accurate(W) {
        let t = Ephemeris.MS_aLon_t(W) * 36525;
        return t - JulianDay.dt_T(t) + 8 / 24;
    }

    /**
     * 农历转公历
     * @param chineseYear 农历年
     * @param chineseMonth 农历月
     * @param chineseDay 农历天
     */
    lunar2solar(chineseYear: number, chineseMonth: number, chineseDay: number): Date {
        return lunar2solar(chineseYear, chineseMonth, chineseDay);
    }
}

export default new ChineseDateUtil()
