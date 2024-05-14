/**
 * 正则池
 */
declare const PatternPool: {
    /**
     * 数字
     */
    NUMBERS: RegExp;
    /**
     * 英文
     */
    WORD: RegExp;
    /**
     * 中文
     */
    CHINESE: RegExp;
    /**
     * IPV4
     */
    IPV4: RegExp;
    /**
     * IPV6
     */
    IPV6: RegExp;
    /**
     * 钱
     */
    MONEY: RegExp;
    /**
     * 邮箱
     */
    EMAIL: RegExp;
    /**
     * 域名
     */
    DOMAIN_NAME: RegExp;
    /**
     * 手机号
     */
    MOBILE: RegExp;
    /**
     * 固定电话
     */
    LANDLINE: RegExp;
    /**
     * 身份证号
     */
    ID_CARD: RegExp;
    /**
     * http网址
     */
    URL_HTTP: RegExp;
    /**
     * 车牌号
     */
    PLATE_NUMBER: RegExp;
    /**
     * 日期
     */
    DATE: RegExp;
    /**
     * 时间
     */
    TIME: RegExp;
    /**
     * 空白行
     */
    BLANK_LINE: RegExp;
    /**
     * 添加正则
     * @param map 正则对象
     */
    add(map: {
        [key: string]: RegExp;
    }): void;
};
export default PatternPool;
