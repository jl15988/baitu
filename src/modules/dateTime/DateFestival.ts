import LunarInfo from "./chinese/LunarInfo";
import SolarTerms from "./chinese/SolarTerms";
import ChineseDateUtil from "./chinese/ChineseDateUtil";
import ChineseNumber from "../number/ChineseNumber";
import GanZhi from "./chinese/GanZhi";

export type FestivalResultType = {
    // 重要的
    super: string[];
    // 普通的
    common: string[];
    // 其他
    other: string[];
}

type FestivalInfoType = {
    [day: number]: string[][]
}[]

class DateFestival {

    // 节日
    LUNAR_FESTIVAL: FestivalInfoType = [
        // 1
        {
            1: [
                ['春节']
            ],
            15: [
                ['元宵节（上元节、灯节）'],
                [],
                ['壮族歌墟节', '苗族踩山节', '达斡尔族卡钦']
            ],
            16: [
                [],
                [],
                ['侗族芦笙节(至正月二十)']
            ],
            25: [
                [],
                [],
                ['填仓节']
            ],
            29: [
                [],
                [],
                ['送穷日']
            ]
        },
        // 2
        {
            1: [
                [],
                [],
                ['瑶族忌鸟节']
            ],
            2: [
                [],
                ['龙抬头（春耕节、农事节、青龙节、春龙节）'],
                ['畲族会亲节']
            ],
            8: [
                [],
                [],
                ['傈傈族刀杆节']
            ]
        },
        // 3
        {
            3: [
                [],
                ['北帝诞'],
                ['苗族黎族歌墟节']
            ],
            15: [
                [],
                [],
                ['白族三月街(至三月二十)']
            ],
            23: [
                [],
                ['天后诞', '妈祖诞']
            ]
        },
        // 4
        {
            8: [
                [],
                ['牛王诞']
            ],
            18: [
                [],
                [],
                ['锡伯族西迁节']
            ]
        },
        // 5
        {
            5: [
                ['端午节']
            ],
            13: [
                [],
                ['关帝诞'],
                ['阿昌族泼水节']
            ],
            22: [
                [],
                [],
                ['鄂温克族米阔鲁节']
            ],
            29: [
                [],
                [],
                ['瑶族达努节']
            ]
        },
        // 6
        {
            6: [
                [],
                ['姑姑节', '天贶节'],
                ['壮族祭田节', '瑶族尝新节']
            ],
            24: [
                [],
                [],
                ['火把节（星回节）']
            ]
        },
        // 7
        {
            7: [
                [],
                ['七夕节（七巧节、七姐节、女儿节、乞巧节、七娘会、七夕祭、牛公牛婆日、巧夕）']
            ],
            13: [
                [],
                [],
                ['侗族吃新节']
            ],
            15: [
                [],
                ['中元节（鬼节、亡人节、七月半）']
            ]
        },
        // 8
        {
            15: [
                ['中秋节']
            ]
        },
        // 9
        {
            9: [
                [],
                ['重阳节']
            ]
        },
        // 10
        {
            1: [
                [],
                ['寒衣节（十月朝、祭祖节、冥阴节、秋祭、十月一）']
            ],
            15: [
                [],
                ['下元节']
            ],
            16: [
                [],
                [],
                ['瑶族盘王节']
            ]
        },
        // 11
        {},
        // 12
        {
            8: [
                [],
                ['腊八节']
            ]
        }
    ]

    /**
     * 获取农历节日
     * @param year 年份
     * @param chineseMonth 农历月
     * @param chineseDay 农历天
     */
    getChineseFestival(year: number, chineseMonth: number, chineseDay: number): FestivalResultType {
        const festival = this.LUNAR_FESTIVAL[chineseMonth - 1][chineseDay]
        const result = {
            super: [] as string[],
            common: [] as string[],
            other: [] as string[],
        }
        if (festival) {
            result.super = festival[0] || []
            result.common = festival[1] || []
            result.other = festival[2] || []
        }
        const festival1 = this.doGetChineseFestival(year, chineseMonth, chineseDay);
        if (festival1) {
            result.super = [...result.super, ...festival1.super];
            result.common = [...result.common, ...festival1.common];
            result.other = [...result.other, ...festival1.other];
        }
        return result;
    }

    /**
     * 获取一些只能通过各种判断来获取的农历节日
     * @param year 年份
     * @param chineseMonth 农历月
     * @param chineseDay 农历天
     * @private
     */
    private doGetChineseFestival(year: number, chineseMonth: number, chineseDay: number): FestivalResultType {
        const festival: FestivalResultType = {
            super: [],
            common: [],
            other: []
        }
        // 最后一月
        if (chineseMonth === 12) {
            const monthDays = LunarInfo.monthDays(year, chineseMonth);
            if (chineseDay === monthDays) {
                festival.super.push('除夕');
            }
            if (chineseDay === 23) {
                festival.common.push('小年');
            }
        }

        const term = SolarTerms.getTerm(year, chineseMonth, chineseDay);
        if (term && term === '清明') {
            festival.super.push('清明节');
        }

        const solarDate = ChineseDateUtil.lunarToSolar(year, chineseMonth, chineseDay);

        // 农历杂节
        let w;
        const dzTermInterval = -SolarTerms.getTermInterval(24, solarDate);
        // 数九
        if (dzTermInterval >= 0 && dzTermInterval < 81) {
            w = ChineseNumber.convertSingle(Math.abs(Math.floor(dzTermInterval / 9) + 1))
            if (dzTermInterval % 9 == 0) {
                festival.common.push(w + '九天');
            } else {
                festival.other.push(w + '九第' + (dzTermInterval % 9 + 1) + '天');
            }
        }

        const dayGan = GanZhi.getDayGan(solarDate.getFullYear(), solarDate.month(), solarDate.getDate());
        const dayZhi = GanZhi.getDayZhi(solarDate.getFullYear(), solarDate.month(), solarDate.getDate());

        // 三伏
        const xzTermInterval = SolarTerms.getTermInterval(12, solarDate);
        if (xzTermInterval <= -20 && xzTermInterval > -30 && dayGan == '庚') {
            festival.common.push('初伏');
        }
        if (xzTermInterval <= -30 && xzTermInterval > -40 && dayGan == '庚') {
            festival.common.push('中伏');
        }

        const lqTermInterval = SolarTerms.getTermInterval(15, solarDate);
        if (lqTermInterval <= 0 && lqTermInterval > -10 && dayGan == '庚') {
            festival.common.push('末伏');
        }

        const lqTermInterval2 = SolarTerms.getTermInterval(15, solarDate.offset("day", -10));
        if (lqTermInterval2 <= 0 && lqTermInterval2 > -10 && dayGan == '庚') {
            festival.common.push('出伏');
        }

        // 梅雨
        const mzTermInterval = SolarTerms.getTermInterval(11, solarDate);
        if (mzTermInterval >= 0 && mzTermInterval < 10 && dayGan == '丙') {
            festival.common.push('入梅');
        }

        const xsTermInterval = SolarTerms.getTermInterval(13, solarDate);
        if (xsTermInterval >= 0 && xsTermInterval < 12 && dayZhi == '未') {
            festival.common.push('出梅');
        }
        return festival;
    }
}

export default new DateFestival();
