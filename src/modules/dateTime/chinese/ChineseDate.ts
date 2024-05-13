import ChineseDateUtil, {
    DayAllInfo,
    DynastyInfo,
    FestivalInfo,
    MonthInfo,
    SolarTermsInfo,
    YearInfo
} from "./ChineseDateUtil";

class ChineseDate {
    year: number;
    month: number;
    day: number;
    dayAllInfo: DayAllInfo;

    constructor(yearOrDate: number | Date);
    constructor(yearOrDate: number | Date, month: number);
    constructor(yearOrDate: number | Date, month: number, day: number);

    constructor(yearOrDate: number | Date, month?: number, day?: number) {
        if (yearOrDate instanceof Date) {
            this.year = yearOrDate.getFullYear();
            this.month = yearOrDate.getMonth() + 1;
            this.day = yearOrDate.getDate();
        } else {
            this.year = yearOrDate;
            this.month = month || 1;
            this.day = day || 1;
        }
        this._check();
        return this;
    }

    /**
     * 通过农历构建
     * @param chineseYear 农历年
     */
    static fromLunar(chineseYear: number);
    /**
     * 通过农历构建
     * @param chineseYear 农历年
     * @param chineseMonth 农历月
     */
    static fromLunar(chineseYear: number, chineseMonth: number);
    /**
     * 通过农历构建
     * @param chineseYear 农历年
     * @param chineseMonth 农历月
     * @param chineseDay 农历日
     */
    static fromLunar(chineseYear: number, chineseMonth: number, chineseDay: number);

    /**
     * 通过农历构建
     * @param chineseYear 农历年
     * @param chineseMonth 农历月
     * @param chineseDay 农历日
     */
    static fromLunar(chineseYear: number, chineseMonth?: number, chineseDay?: number) {
        const date = ChineseDateUtil.lunar2solar(chineseYear, chineseMonth || 1, chineseDay || 1);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return new ChineseDate(year, month, day);
    }

    _check(): void {
        if (!this.dayAllInfo) {
            this.dayAllInfo = ChineseDateUtil.getDayAllInfo(this.year, this.month, this.day)
        }
    }

    /**
     * 获取日的所有信息
     */
    getAllInfo(): DayAllInfo {
        this._check();
        return this.dayAllInfo;
    }

    /**
     * 获取公历月所有日的农历信息
     */
    getMonthDays(): DayAllInfo[] {
        return ChineseDateUtil.getMonthDays(this.year, this.month);
    }

    /**
     * 获取月信息
     */
    getMonth(): MonthInfo {
        this._check();
        return this.dayAllInfo.month;
    }

    /**
     * 获取年信息
     */
    getYear(): YearInfo {
        this._check();
        return this.dayAllInfo.year;
    }

    /**
     * 获取农历节日
     * 其中 super 为重要节日，如：“春节”
     * common 为普通节日，如：“重阳节”
     * other 为其他节日
     */
    getFestival(): FestivalInfo {
        return ChineseDateUtil.getFestival(this.year, this.month, this.day);
    }

    /**
     * 获取生肖
     */
    getChineseZodiac(): string {
        this._check();
        return ChineseDateUtil.getChineseZodiac(this.dayAllInfo.year.order);
    }

    /**
     * 获取天干
     */
    getGan(): string {
        this._check();
        return ChineseDateUtil.getGan(this.dayAllInfo.year.order);
    }

    /**
     * 获取地支
     */
    getZhi(): string {
        this._check();
        return ChineseDateUtil.getZhi(this.dayAllInfo.year.order);
    }

    /**
     * 获取干支纪年
     */
    getCyclical(): string {
        return this.getGan() + this.getZhi();
    }

    /**
     * 获取黄帝纪年
     */
    getHuangdiYear(): number {
        this._check();
        return ChineseDateUtil.getHuangdiYear(this.dayAllInfo.year.order);
    }

    /**
     * 获取朝代
     */
    getDynasty(): DynastyInfo {
        return ChineseDateUtil.getDynasty(this.year);
    }

    /**
     * 获取节气
     */
    getSolarTerms(): SolarTermsInfo {
        return ChineseDateUtil.getSolarTermsInfo(this.year, this.month, this.day);
    }

    /**
     * 获取干支纪日
     */
    getCyclicalYMD(): string {
        this._check();
        const dayInfo = this.dayAllInfo;
        return dayInfo.year.gan.concat(dayInfo.year.zhi, dayInfo.year.shx, '年', ' ', dayInfo.month.gan, dayInfo.month.zhi, '月', dayInfo.gan, dayInfo.zhi, '日');
    }

    toString() {
        this._check();
        const dayInfo = this.dayAllInfo;
        return dayInfo.year.gan.concat(dayInfo.year.zhi, dayInfo.year.shx, '年', ' ', dayInfo.month.name, '月', dayInfo.name);
    }
}

export default ChineseDate;
