/**
 * 正则池
 */
export declare class PatternPool {
    /**
     * 数字
     */
    readonly NUMBERS: RegExp;
    /**
     * 英文
     */
    readonly WORD: RegExp;
    /**
     * 中文
     */
    readonly CHINESE: RegExp;
    /**
     * IPV4
     */
    readonly IPV4: RegExp;
    /**
     * IPV6
     */
    readonly IPV6: RegExp;
    /**
     * 钱
     */
    readonly MONEY: RegExp;
    /**
     * 邮箱
     */
    readonly EMAIL: RegExp;
    /**
     * 域名
     */
    readonly DOMAIN_NAME: RegExp;
    /**
     * 手机号
     */
    readonly MOBILE: RegExp;
    /**
     * 固定电话
     */
    readonly LANDLINE: RegExp;
    /**
     * 身份证号
     */
    readonly ID_CARD: RegExp;
    /**
     * http网址
     */
    readonly URL_HTTP: RegExp;
    /**
     * 车牌号
     */
    readonly PLATE_NUMBER: RegExp;
    /**
     * 日期
     */
    readonly DATE: RegExp;
    /**
     * 时间
     */
    readonly TIME: RegExp;
    /**
     * 空白行
     */
    readonly BLANK_LINE: RegExp;
    /**
     * 转为正则对象
     * @param str 字符串
     */
    toReg(str: any): RegExp;
    /**
     * 添加正则
     * @param map 正则对象
     */
    add(map: {
        [key: string]: string | RegExp;
    }): void;
}
declare const patternPoolInstance: PatternPool;
export default patternPoolInstance;
