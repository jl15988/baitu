interface DayInfo {
    julian?: number;
    month?: string;
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
interface DayInfos {
    julian?: number;
    index?: number;
    year?: number;
    month?: string;
    monthNum?: number;
    leapMonth?: boolean;
    nextMonth?: string;
    dayIndex?: number;
    day?: string;
    curDz?: number;
    curXz?: number;
    curLq?: number;
    curMz?: number;
    curXs?: number;
}
interface MonthInfos {
    days?: DayInfos[];
}
interface MonthInfo {
    index?: number;
    name?: string;
    nextName?: string;
    isLeap?: boolean;
    size?: number;
    julian?: number;
    gan?: string;
    zhi?: string;
}
interface YearInfo {
    dynasty?: string;
    name?: string;
    ruler?: string;
    eraName?: string;
    year?: number;
    gan?: string;
    zhi?: string;
    shx?: string;
    Lyear?: number;
}
declare class ChineseDate {
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
    constructor();
    getDay(): void;
    getDayName(u: any, r: any): void;
    getFestival(year: number, month: number, day: number): {
        A: string;
        B: string;
        C: string;
    };
    getNH(year: number): string;
    /**
     * 获取年信息
     * @param year 年
     */
    getYearInfo(year: number): YearInfo;
    getMonthInfos(year: number, month: number): MonthInfos;
    /**
     * 获取月信息
     * @param year 年
     * @param month 月
     */
    getMonthInfo(year: number, month: number): MonthInfo;
    /**
     * 获取日信息
     * @param year 年
     * @param month 月
     * @param day 日
     */
    getDayInfo(year: number, month: number, day: number): DayInfo;
}
declare const _default: ChineseDate;
export default _default;
