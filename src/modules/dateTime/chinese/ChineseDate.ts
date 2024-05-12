import JulianDay from "./JulianDay";
import JN from "./data/JN";
import JR from "./data/JR";
import SSQ from "./SSQ";
import {JRW} from "./data/JRW";

function int2(v) {
    return Math.floor(v);
}

interface DayInfo {
    // 儒略日
    julian?: number,
    // 月名称
    month?: string,
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

interface MonthDayInfo {
    // 儒略日
    julian?: number,
    // 公历下标
    index?: number,
    // 年名称
    year?: number,
    // 月名称
    month?: string,
    // 月大小
    monthNum?: number,
    // 是否闰月
    leapMonth?: boolean,
    // 下个月名
    nextMonth?: string,
    // 日下标
    dayIndex?: number,
    // 日名称
    day?: string,
    //距冬至的天数
    curDz?: number,
    //距夏至的天数
    curXz?: number,
    //距立秋的天数
    curLq?: number,
    //距芒种的天数
    curMz?: number,
    //距小暑的天数
    curXs?: number
}

interface MonthInfos {
    // 日信息
    days?: MonthDayInfo[]
}

interface MonthInfo {
    // 月下标
    index?: number,
    // 月名
    name?: string,
    // 下个月名
    nextName?: string,
    // 是否闰月
    isLeap?: boolean,
    // 月大小
    size?: number,
    // 首日儒略日
    julian?: number,
    // 天干，相对于1998年12月7
    gan?: string,
    // 地支，相对于1998年12月7
    zhi?: string
}

interface YearInfo {
    // 朝代
    dynasty?: string,
    // 朝代名称
    name?: string,
    // 统治者
    ruler?: string,
    // 年号
    eraName?: string,
    // 年次
    year?: number,
    // 天干
    gan?: string,
    // 地支
    zhi?: string,
    // 生肖
    shx?: string,
    Lyear?: number
}

class ChineseDate {

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

    constructor() {

    }

    getDay() {

    }

    getDayName(u, r) { //取某日节日,传入日对象
        /****************
         节日名称生成
         传入日物件u
         返回某日节日信息
         r.A 重要喜庆日子名称(可将日子名称置红)
         r.B 重要日子名称
         r.C 各种日子名称(连成一大串)
         r.Fjia 放假日子(可用于日期数字置红)
         *****************/
        var m0 = (u.m < 10 ? '0' : '') + u.m;
        var d0 = (u.d < 10 ? '0' : '') + u.d;
        var i, j, s, s2, type;

        if (u.week == 0 || u.week == 6) r.Fjia = 1; //星期日或星期六放假

        //按公历日期查找
        for (i = 0; i < this.JRB[u.m - 1].length; i++) { //公历节日或纪念日,遍历本月节日表
            s = this.JRB[u.m - 1][i];
            if (s.substr(0, 2) != d0) continue;
            s = s.substr(2, s.length - 2);
            type = s.substr(0, 1);
            if (s.substr(5, 1) == '-') { //有年限的
                if (u.y < (s.substr(1, 4) - 0) || u.y > (s.substr(6, 4) - 0)) continue;
                s = s.substr(10, s.length - 10);
            } else {
                if (u.y < 1850) continue;
                s = s.substr(1, s.length - 1);
            }
            if (type == '#') r.A += s + ' ', r.Fjia = 1; //放假的节日
            if (type == 'I') r.B += s + ' '; //主要
            if (type == '.') r.C += s + ' '; //其它
        }

        //按周查找
        var w = u.weeki;
        if (u.week >= u.week0) w += 1;
        var w2 = w;
        if (u.weeki == u.weekN - 1) w2 = 5;
        w = m0 + w + u.week;  //d日在本月的第几个星期某
        w2 = m0 + w2 + u.week;

        for (i = 0; i < this.JRW.length; i++) {
            s = this.JRW[i];
            s2 = s.substr(0, 4);
            if (s2 != w && s2 != w2) continue;
            type = s.substr(4, 1);
            s = s.substr(5, s.length - 5);
            if (type == '#') r.A += s + ' ', r.Fjia = 1;
            if (type == 'I') r.B += s + ' ';
            if (type == '.') r.C += s + ' ';
        }
    }

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

    getFestival(year: number, month: number, day: number) { //取某日节日,传入日对象
        const result = {
            A: '',
            B: '',
            C: ''
        }
        const dayInfo = this.getDayInfo(year, month, day);
        //按农历日期查找重量点节假日
        const d = dayInfo.month + (dayInfo.month.length < 2 ? '月' : '') + dayInfo.name;
        if (!dayInfo.leapMonth) {
            if (d == '正月初一') result.A += '春节 '; //Fjia(放假)
            if (d == '正月初二') result.B += '大年初二 ';
            if (d == '五月初五') result.A += '端午节 ';
            if (d == '八月十五') result.A += '中秋节 ';
            if (d == '正月十五') result.A += '元宵节 ', result.B += '上元节 ', result.C += '壮族歌墟节 苗族踩山节 达斡尔族卡钦 ';
            if (d == '正月十六') result.C += '侗族芦笙节(至正月二十) ';
            if (d == '正月廿五') result.C += '填仓节 ';
            if (d == '正月廿九') result.C += '送穷日 ';
            if (d == '二月初一') result.C += '瑶族忌鸟节 ';
            if (d == '二月初二') result.B += '春龙节(龙抬头) ', result.C += '畲族会亲节 ';
            if (d == '二月初八') result.C += '傈傈族刀杆节 ';
            if (d == '三月初三') result.B += '北帝诞 ', result.C += '苗族黎族歌墟节 ';
            if (d == '三月十五') result.C += '白族三月街(至三月二十) ';
            if (d == '三月廿三') result.B += '天后诞 妈祖诞 ';
            if (d == '四月初八') result.B += '牛王诞 ';
            if (d == '四月十八') result.C += '锡伯族西迁节 ';
            if (d == '五月十三') result.B += '关帝诞 ', result.C += '阿昌族泼水节 ';
            if (d == '五月廿二') result.C += '鄂温克族米阔鲁节 ';
            if (d == '五月廿九') result.C += '瑶族达努节 ';
            if (d == '六月初六') result.B += '姑姑节 天贶节 ', result.C += '壮族祭田节 瑶族尝新节 ';
            if (d == '六月廿四') result.C += '火把节、星回节(彝、白、佤、阿昌、纳西、基诺族 ) ';
            if (d == '七月初七') result.B += '七夕(中国情人节,乞巧节,女儿节 ) ';
            if (d == '七月十三') result.C += '侗族吃新节 ';
            if (d == '七月十五') result.B += '中元节 鬼节';
            if (d == '九月初九') result.B += '重阳节 ';
            if (d == '十月初一') result.B += '祭祖节(十月朝) ';
            if (d == '十月十五') result.B += '下元节 ';
            if (d == '十月十六') result.C += '瑶族盘王节 ';
            if (d == '十二初八') result.B += '腊八节 ';
        }
        //最后一月
        if (dayInfo.nextMonth == '正') {
            if (d == '十二三十' && dayInfo.monthSize == 30) result.A += '除夕 ';
            if (d == '十二廿九' && dayInfo.monthSize == 29) result.A += '除夕 ';
            if (d == '十二廿三') result.B += '小年 ';
        }
        if (dayInfo.solarTerms) {
            if (dayInfo.solarTerms == "清明") result.A += dayInfo.solarTerms + ' ';
            else result.B += dayInfo.solarTerms + ' ';
        }

        //农历杂节
        let w;
        if (dayInfo.curDz >= 0 && dayInfo.curDz < 81) { //数九
            w = this.numCn[Math.floor(dayInfo.curDz / 9) + 1];
            if (dayInfo.curDz % 9 == 0) result.B += '『' + w + '九』 ';
            else result.C += w + '九第' + (dayInfo.curDz % 9 + 1) + '天 ';
        }

        if (dayInfo.curXz >= 20 && dayInfo.curXz < 30 && dayInfo.gan == '庚') result.B += '初伏 ';
        if (dayInfo.curXz >= 30 && dayInfo.curXz < 40 && dayInfo.gan == '庚') result.B += '中伏 ';
        if (dayInfo.curLq >= 0 && dayInfo.curLq < 10 && dayInfo.gan == '庚') result.B += '末伏 ';
        if (dayInfo.curMz >= 0 && dayInfo.curMz < 10 && dayInfo.gan == '丙') result.B += '入梅 ';
        if (dayInfo.curXs >= 0 && dayInfo.curXs < 12 && dayInfo.zhi == '未') result.B += '出梅 ';
        return result;
    }

    getNH(year: number) { //取年号
        let j, c, result = '', jnb = this.JNB;
        for (let i = 0; i < jnb.length; i += 7) {
            j = Number(jnb[i]);
            if (year < j || year >= j + jnb[i + 1]) continue;
            c = String(jnb[i + 6]) + (year - j + 1 + Number(jnb[i + 2])) + '年'; //年号及年次
            result += (result ? ';' : '') + '[' + jnb[i + 3] + ']' + jnb[i + 4] + ' ' + jnb[i + 5] + ' ' + c; //i为年号元年,i+3朝代,i+4朝号,i+5皇帝,i+6年号
        }
        return result;
    }

    /**
     * 获取年信息
     * @param year 年
     */
    getYearInfo(year: number): YearInfo {
        const yearInfo: YearInfo = {}
        //所属公历年对应的农历干支纪年
        const yIndex = year - 1984 + 12000;
        yearInfo.gan = this.Gan[yIndex % 10];
        yearInfo.zhi = this.Zhi[yIndex % 12];
        // 生肖
        yearInfo.shx = this.ShX[yIndex % 12];
        let j;
        const jnb = this.JNB;
        for (let i = 0; i < jnb.length; i += 7) {
            j = Number(jnb[i]);
            if (year < j || year >= j + jnb[i + 1]) continue;
            yearInfo.eraName = <string>jnb[i + 6];
            yearInfo.year = (year - j + 1 + Number(jnb[i + 2]));
            yearInfo.dynasty = <string>jnb[i + 3];
            yearInfo.name = <string>jnb[i + 4];
            yearInfo.ruler = <string>jnb[i + 5];
        }

        // const julian = int2(JulianDay.getJulianDay(year, 5, 12, 12, 0, 0.1)) - JulianDay.J2000;
        // SSQ.calcY(julian);
        //干支纪年处理
        //以立春为界定年首
        // let D = SSQ.ZQ[3] + (julian<SSQ.ZQ[3]?-365:0) + 365.25*16-35; //以立春为界定纪年
        // yearInfo.Lyear =  Math.floor(D/365.2422+0.5); //农历纪年(10进制,1984年起算)
        // //以下几行以正月初一定年首
        // D = SSQ.HS[2]; //一般第3个月为春节
        // for(j=0;j<14;j++){ //找春节
        //     if(SSQ.ym[j]!='正'||SSQ.leap==j&&j) continue;
        //     D = SSQ.HS[j];
        //     if(julian<D) { D-=365; break; } //无需再找下一个正月
        // }
        // D = D + 5810;  //计算该年春节与1984年平均春节(立春附近)相差天数估计
        // ob.Lyear0 =  Math.floor(D/365.2422+0.5); //农历纪年(10进制,1984年起算)
        //
        // D = ob.Lyear +12000;  ob.Lyear2 = this.Gan[D%10]+this.Zhi[D%12]; //干支纪年(立春)
        // D = ob.Lyear0+12000;  ob.Lyear3 = this.Gan[D%10]+this.Zhi[D%12]; //干支纪年(正月)
        // ob.Lyear4 = ob.Lyear0+1984+2698; //黄帝纪年

        return yearInfo;
    }

    getMonthInfos(year: number, month: number) {
        const monthInfo: MonthInfos = {}
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

        const days: MonthDayInfo[] = [];
        for (let day = 0; day < monthDayNum; day++) {
            const dayInfo: MonthDayInfo = {}
            days.push(dayInfo);
            dayInfo.julian = monthStart + day;
            dayInfo.index = day;

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
            dayInfo.day = this.Rm[dayInfo.dayIndex];
            dayInfo.curDz = julian - SSQ.ZQ[0];   //距冬至的天数
            dayInfo.curXz = julian - SSQ.ZQ[12];  //距夏至的天数
            dayInfo.curLq = julian - SSQ.ZQ[15];  //距立秋的天数
            dayInfo.curMz = julian - SSQ.ZQ[11];  //距芒种的天数
            dayInfo.curXs = julian - SSQ.ZQ[13];  //距小暑的天数

            if (julian == SSQ.HS[mk] || julian === monthStart) { //月的信息
                dayInfo.month = SSQ.ym[mk]; //月名称
                dayInfo.monthNum = SSQ.dx[mk]; //月大小
                dayInfo.leapMonth = (!!SSQ.leap && SSQ.leap === mk); //闰状况
                dayInfo.nextMonth = mk < 13 ? SSQ.ym[mk + 1] : "未知"; //下个月名称,判断除夕时要用到
            } else {
                const ob2: MonthDayInfo = days[day - 1];
                if (!ob2) continue;
                dayInfo.month = ob2.month;
                dayInfo.monthNum = ob2.monthNum;
                dayInfo.leapMonth = ob2.leapMonth;
                dayInfo.nextMonth = ob2.nextMonth;
            }
        }
        monthInfo.days = days;
        return monthInfo;
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

        const days: MonthDayInfo[] = [];
        for (let day = 0; day < monthDayNum; day++) {
            const dayInfo: MonthDayInfo = {}
            days.push(dayInfo);
            dayInfo.julian = monthStart + day;
            dayInfo.index = day;

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
            dayInfo.day = this.Rm[dayInfo.dayIndex];
            dayInfo.curDz = julian - SSQ.ZQ[0];   //距冬至的天数
            dayInfo.curXz = julian - SSQ.ZQ[12];  //距夏至的天数
            dayInfo.curLq = julian - SSQ.ZQ[15];  //距立秋的天数
            dayInfo.curMz = julian - SSQ.ZQ[11];  //距芒种的天数
            dayInfo.curXs = julian - SSQ.ZQ[13];  //距小暑的天数

            if (julian == SSQ.HS[mk] || julian === monthStart) { //月的信息
                dayInfo.month = SSQ.ym[mk]; //月名称
                dayInfo.monthNum = SSQ.dx[mk]; //月大小
                dayInfo.leapMonth = (!!SSQ.leap && SSQ.leap === mk); //闰状况
                dayInfo.nextMonth = mk < 13 ? SSQ.ym[mk + 1] : "未知"; //下个月名称,判断除夕时要用到
            } else {
                const ob2: MonthDayInfo = days[day - 1];
                if (!ob2) continue;
                dayInfo.month = ob2.month;
                dayInfo.monthNum = ob2.monthNum;
                dayInfo.leapMonth = ob2.leapMonth;
                dayInfo.nextMonth = ob2.nextMonth;
            }
        }
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
     * 获取日信息
     * @param year 年
     * @param month 月
     * @param day 日
     */
    getDayInfo(year: number, month: number, day: number): DayInfo {
        const dayInfo: DayInfo = {
            leapMonth: false
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

        if (julian === SSQ.HS[mk] || monthFirstJulian === julian) {
            //月名称
            dayInfo.month = SSQ.ym[mk];
            //月大小
            dayInfo.monthSize = SSQ.dx[mk];
            //闰状况
            dayInfo.leapMonth = (!!SSQ.leap && SSQ.leap === mk);
            //下个月名称,判断除夕时要用到
            dayInfo.nextMonth = mk < 13 ? SSQ.ym[mk + 1] : "未知";
        } else {
            const ob2: DayInfo = this.getDayInfo(year, month, day - 1);
            if (ob2) {
                dayInfo.month = ob2.month;
                dayInfo.monthSize = ob2.monthSize;
                dayInfo.leapMonth = ob2.leapMonth;
                dayInfo.nextMonth = ob2.nextMonth;
            }
        }

        // 节气
        let qk = int2((julian - SSQ.ZQ[0] - 7) / 15.2184);
        // 节气的取值范围是0-23
        if (qk < 23 && julian >= SSQ.ZQ[qk + 1]) {
            qk++
        }
        if (julian === SSQ.ZQ[qk]) {
            dayInfo.solarTerms = this.Jq[qk];
        }

        //纪日,2000年1月7日起算
        const D = julian - 6 + 9000000;
        dayInfo.gan = this.Gan[D % 10];
        dayInfo.zhi = this.Zhi[D % 12];

        return dayInfo;
    }
}

export default new ChineseDate()
