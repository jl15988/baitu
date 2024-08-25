import DateTime from "../DateTime";
import NumberUtil from "../../number/NumberUtil";
import DateUtil from "../DateUtil";
import ChineseDateUtil from "./ChineseDateUtil";

class SolarTerms {
    // 农历节气表，包含农历的节气公历天，一段表示一年的
    SOLAR_TERMS_INFO = ["9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f",
        "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e",
        "97bcf97c359801ec95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f",
        "b027097bd097c36b0b6fc9274c91aa", "9778397bd19801ec9210c965cc920e", "97b6b97bd19801ec95f8c965cc920f",
        "97bd09801d98082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd197c36c9210c9274c91aa",
        "97b6b97bd19801ec95f8c965cc920e", "97bd09801d98082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2",
        "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec95f8c965cc920e", "97bcf97c3598082c95f8e1cfcc920f",
        "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec9210c965cc920e",
        "97bcf97c3598082c95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f",
        "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e",
        "97bcf97c359801ec95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd07f595b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9210c8dc2", "9778397bd19801ec9210c9274c920e", "97b6b97bd19801ec95f8c965cc920f",
        "97bd07f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c920e",
        "97b6b97bd19801ec95f8c965cc920f", "97bd07f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2",
        "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bd07f1487f595b0b0bc920fb0722",
        "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e",
        "97bcf7f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f531b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e",
        "97bcf7f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c9274c920e", "97bcf7f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722",
        "9778397bd097c36b0b6fc9210c91aa", "97b6b97bd197c36c9210c9274c920e", "97bcf7f0e47f531b0b0bb0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c920e",
        "97b6b7f0e47f531b0723b0b6fb0722", "7f0e37f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2",
        "9778397bd097c36b0b70c9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e37f1487f595b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc9210c8dc2", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa",
        "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9274c91aa",
        "97b6b7f0e47f531b0723b0787b0721", "7f0e27f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722",
        "9778397bd097c36b0b6fc9210c91aa", "97b6b7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "977837f0e37f149b0723b0787b0721",
        "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f5307f595b0b0bc920fb0722", "7f0e397bd097c35b0b6fc9210c8dc2",
        "977837f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e37f1487f595b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc9210c8dc2", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "977837f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722",
        "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0787b06bd",
        "7f07e7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722",
        "977837f0e37f14998082b0723b06bd", "7f07e7f0e37f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721",
        "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e37f0e37f14898082b0723b02d5",
        "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f1487f531b0b0bb0b6fb0722",
        "7f0e37f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e37f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b072297c35",
        "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f149b0723b0787b0721",
        "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0723b06bd",
        "7f07e7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e37f0e366aa89801eb072297c35",
        "7ec967f0e37f14998082b0723b06bd", "7f07e7f0e37f14998083b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722",
        "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14898082b0723b02d5", "7f07e7f0e37f14998082b0787b0721",
        "7f07e7f0e47f531b0723b0b6fb0722", "7f0e36665b66aa89801e9808297c35", "665f67f0e37f14898082b0723b02d5",
        "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e36665b66a449801e9808297c35",
        "665f67f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e36665b66a449801e9808297c35", "665f67f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721", "7f0e26665b66a449801e9808297c35", "665f67f0e37f1489801eb072297c35",
        "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722"]
    terms = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"]

    /**
     * 获取农历年的某个节气的公历日期天
     * @param year 年份
     * @param index 节气，从小寒（1）开始
     */
    getTermDay(year: number, index: number) {
        if (year >= 1900 && year <= 2100) {
            if (index >= 1 && index <= 24) {
                const _table = this.SOLAR_TERMS_INFO[year - 1900];
                if (!_table) return -1; // 如果_table是undefined或null，返回-1

                const _info = [];
                for (let i = 0; i < 6; i++) {
                    // 注意：JavaScript中的substring第二个参数是结束索引（不包括），因此需要+1
                    _info[i] = parseInt(_table.substring(i * 5, (i + 1) * 5), 16);
                }

                const _calday = [];
                for (let i = 0; i < 6; i++) {
                    const str = _info[i].toString();
                    _calday[4 * i] = str.substring(0, 1);
                    _calday[4 * i + 1] = str.substring(1, 3);
                    _calday[4 * i + 2] = str.substring(3, 4);
                    _calday[4 * i + 3] = str.substring(4, 6);
                }

                // JavaScript中不需要额外的方法来解析整数，因为字符串已经是数字形式
                // 如果_calday[n-1]是字符串且可能包含前导零，使用parseInt确保其为整数
                return parseInt(_calday[index - 1], 10);
            } else {
                return -1;
            }
        } else {
            return -1;
        }
    }

    /**
     * 根据公历日期获取农历节气
     * @param date 日期
     */
    getTerm(date: Date | DateTime): string;
    /**
     * 根据公历日期获取农历节气
     * @param year 公历年或日期
     * @param month 公历月
     * @param day 公历日
     */
    getTerm(year: number, month?: number, day?: number): string;

    /**
     * 根据公历日期获取农历节气
     * @param yearOrDate 公历年或日期
     * @param month 公历月
     * @param day 公历日
     */
    getTerm(yearOrDate: number | Date | DateTime, month?: number, day?: number) {
        let year: number;
        if (yearOrDate instanceof Date || yearOrDate instanceof DateTime) {
            year = yearOrDate.getFullYear();
            month = yearOrDate.getMonth() + 1;
            day = yearOrDate.getDate();
        } else {
            if (NumberUtil.isEmpty(month) || NumberUtil.isEmpty(day)) {
                throw new Error("Month and day must has.");
            }
            year = yearOrDate;
        }
        if (year >= 1900 && year <= 2100) {
            const termTable = this.SOLAR_TERMS_INFO[year - 1900];
            const segment = (month! + 1) / 2 - 1;
            const termInfo = parseInt(termTable.substring(segment * 5, (segment + 1) * 5), 16);
            const termInfoStr = String(termInfo);
            const segmentTable = [termInfoStr.substring(0, 1), termInfoStr.substring(1, 3), termInfoStr.substring(3, 4), termInfoStr.substring(4, 6)];
            const segmentOffset = (month! & 1) == 1 ? 0 : 2;
            if (day == parseInt(segmentTable[segmentOffset])) {
                return this.terms[segment * 4 + segmentOffset];
            } else {
                return day == parseInt(segmentTable[segmentOffset + 1]) ? this.terms[segment * 4 + segmentOffset + 1] : "";
            }
        } else {
            throw new Error("只支持1900-2100之间的日期获取节气");
        }
    }

    /**
     * 获取同年份的指定日期与指定节气的间隔（节气日期减指定日期）
     * @param termIndex 节气，从小寒（1）开始
     * @param date 日期
     */
    getTermInterval(termIndex: number, date: Date | DateTime): number;
    /**
     * 获取同年份的指定日期与指定节气的间隔（节气日期减指定日期）
     * @param termIndex 节气，从小寒（1）开始
     * @param year 年份
     * @param month 月份
     * @param day 天
     */
    getTermInterval(termIndex: number, year: number, month?: number, day?: number): number;

    /**
     * 获取同农历年份的指定日期与指定节气的间隔（节气日期减指定日期）
     * @param termIndex 节气，从小寒（1）开始
     * @param yearOrDate 年份或日期
     * @param month 月份
     * @param day 天
     */
    getTermInterval(termIndex: number, yearOrDate: number | Date | DateTime, month?: number, day?: number): number {
        let year: number;
        if (yearOrDate instanceof Date || yearOrDate instanceof DateTime) {
            year = yearOrDate.getFullYear();
            month = yearOrDate.getMonth() + 1;
            day = yearOrDate.getDate();
        } else {
            if (NumberUtil.isEmpty(month) || NumberUtil.isEmpty(day)) {
                throw new Error("Month and day must has.");
            }
            year = yearOrDate;
        }
        const chineseDate = ChineseDateUtil.solarToLunar(year, month!, day!);
        const termDay = this.getTermDay(chineseDate.chineseYear, termIndex);
        const termMonth = Number((termIndex / 2).toFixed(0));
        return DateUtil.compare(new Date(chineseDate.chineseYear, termMonth - 1, termDay), new Date(year, month! - 1, day!), 'day');
    }
}

export default new SolarTerms()
