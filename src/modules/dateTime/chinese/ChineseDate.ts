import JulianDay from "./JulianDay";
import JN from "./data/JN";
import JR from "./data/JR";
import SSQ from "./SSQ";

function int2(v) {
    return Math.floor(v);
}

interface DayInfo {
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

interface MonthInfo {
    // 天干
    gan?: string,
    // 地址
    zhi?: string,
    // 生肖
    shx?: string,
    // 年号
    nianhao?: string,
    // 日信息
    days?: DayInfo[]
}

class ChineseDate {

    //某月的第几个星期几,如第2个星期一指从月首开始顺序找到第2个“星期一”
    wFtv: string[] = ['0150I世界麻风日', //一月的最后一个星期日（月倒数第一个星期日）
        '0520.国际母亲节',
        '0530I全国助残日',
        '0630.父亲节',
        '0730.被奴役国家周',
        '0932I国际和平日',
        '0940.国际聋人节 世界儿童日',
        '0950I世界海事日',
        '1011.国际住房日',
        '1013I国际减轻自然灾害日(减灾日)',
        '1144I感恩节']

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

        for (i = 0; i < this.wFtv.length; i++) {
            s = this.wFtv[i];
            s2 = s.substr(0, 4);
            if (s2 != w && s2 != w2) continue;
            type = s.substr(4, 1);
            s = s.substr(5, s.length - 5);
            if (type == '#') r.A += s + ' ', r.Fjia = 1;
            if (type == 'I') r.B += s + ' ';
            if (type == '.') r.C += s + ' ';
        }
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

    getMonthInfo(year: number, month: number) {
        const monthInfo: MonthInfo = {}
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

        //所属公历年对应的农历干支纪年
        const yIndex = year - 1984 + 12000;
        const gan = this.Gan[yIndex % 10];
        const zhi = this.Zhi[yIndex % 12];
        const Ly = gan + zhi;

        // 生肖
        const shx = this.ShX[yIndex % 12];
        // 年号
        const nianhao = this.getNH(year);

        monthInfo.gan = gan;
        monthInfo.zhi = zhi;
        monthInfo.shx = shx;
        monthInfo.nianhao = nianhao;

        const days: DayInfo[] = [];
        for (let day = 0; day < monthDayNum; day++) {
            const dayInfo: DayInfo = {}
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
                const ob2: DayInfo = days[day - 1];
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
}

export default new ChineseDate()
