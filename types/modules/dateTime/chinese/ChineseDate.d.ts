interface DayInfo {
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
interface MonthInfo {
    gan?: string;
    zhi?: string;
    shx?: string;
    nianhao?: string;
    days?: DayInfo[];
}
declare class ChineseDate {
    wFtv: string[];
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
    getNH(year: number): string;
    getMonthInfo(year: number, month: number): MonthInfo;
}
declare const _default: ChineseDate;
export default _default;
