export interface DayInfo {
    julian?: number;
    month?: number;
    monthName?: string;
    nextMonth?: string;
    monthSize?: number;
    leapMonth?: boolean;
    dayIndex?: number;
    name?: string;
    curDz?: number;
    curXz?: number;
    curLq?: number;
    curMz?: number;
    curXs?: number;
    solarTerms?: string;
    gan?: string;
    zhi?: string;
}
export interface DayAllInfo {
    julian?: number;
    dayIndex?: number;
    name?: string;
    curDz?: number;
    curXz?: number;
    curLq?: number;
    curMz?: number;
    curXs?: number;
    solarTerms?: SolarTermsInfo;
    lunarPhaseInfo?: LunarPhaseInfo;
    gan?: string;
    zhi?: string;
    month: MonthInfo;
    year: YearInfo;
    festival?: FestivalInfo;
}
export interface MonthInfo {
    order?: number;
    name?: string;
    nextName?: string;
    isLeap?: boolean;
    size?: number;
    julian?: number;
    gan?: string;
    zhi?: string;
}
export interface YearInfo {
    order?: number;
    huangdiOrder?: number;
    dynasty?: string;
    name?: string;
    ruler?: string;
    eraName?: string;
    gan?: string;
    zhi?: string;
    shx?: string;
}
export interface DynastyInfo {
    dynasty?: string;
    name?: string;
    ruler?: string;
    eraName?: string;
}
export interface FestivalInfo {
    super: string[];
    common: string[];
    other: string[];
}
export interface SolarTermsInfo {
    name?: string;
    time?: string;
    jd?: number;
}
export interface LunarPhaseInfo {
    name?: string;
    time?: string;
    jd?: number;
}
declare class ChineseDateUtil {
    JRW: string[];
    numCn: string[];
    Gan: string[];
    Zhi: string[];
    ShX: string[];
    Jq: string[];
    Ym: string[];
    Rm: string[];
    Yxm: string[];
    JRB: string[][];
    JNB: (string | number)[];
    /**
     * 通过公历获取农历节日
     * @param year 年
     * @param month 月
     * @param day 日
     */
    getFestival(year: number, month: number, day: number): FestivalInfo;
    /**
     * 通过日全信息获取农历节日
     * @param dayAllInfo 日全信息
     */
    getFestivalByDayAllInfo(dayAllInfo: DayAllInfo): FestivalInfo;
    /**
     * 获取生肖
     * @param chineseYear 农历年
     */
    getChineseZodiac(chineseYear: number): string;
    /**
     * 获取天干
     * @param chineseYear 农历年
     */
    getGan(chineseYear: number): string;
    /**
     * 获取地支
     * @param chineseYear 农历年
     */
    getZhi(chineseYear: number): string;
    /**
     * 获取干支纪年
     * @param chineseYear 农历年
     */
    getCyclical(chineseYear: number): string;
    /**
     * 获取黄帝纪年
     * @param chineseYear 农历年
     */
    getHuangdiYear(chineseYear: number): number;
    /**
     * 获取朝代
     * @param year 年
     */
    getDynasty(year: number): DynastyInfo;
    getMonthDays(year: number, month: number): DayAllInfo[];
    /**
     * 获取月信息
     * @param year 年
     * @param month 月
     */
    /**
     * 获取农历月信息
     * @param chineseYear 农历年
     * @param chineseMonth 农历月
     */
    getMonthInfo(chineseYear: number, chineseMonth: number): MonthInfo;
    /**
     * 获取日信息
     * @param year 年
     * @param month 月
     * @param day 日
     */
    getDaySimpleInfo(year: number, month: number, day: number): DayAllInfo;
    /**
     * 获取日信息
     * @param year 年
     * @param month 月
     * @param day 日
     */
    getDayAllInfo(year: number, month: number, day: number): DayAllInfo;
    /**
     * 获取节气
     * @param year 年
     * @param month 月
     * @param day 日
     */
    getSolarTermsInfo(year: number, month: number, day: number): SolarTermsInfo;
    qi_accurate(W: any): number;
    so_accurate(W: any): number;
    /**
     * 农历转公历
     * @param chineseYear 农历年
     * @param chineseMonth 农历月
     * @param chineseDay 农历天
     */
    lunar2solar(chineseYear: number, chineseMonth: number, chineseDay: number): Date;
}
declare const _default: ChineseDateUtil;
export default _default;
