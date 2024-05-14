/**
 * 验证工具
 */
declare class ValidateUtil {
    /**
     * 校验字符串是否符合正则表达式
     * @param str 字符串
     * @param pattern 正则表达式
     */
    validate(str: string, pattern: RegExp | string): boolean;
    /**
     * 是否数字
     * @param str 字符串
     */
    isNumber(str: string): boolean;
    isChinese(str: string): boolean;
    isIPV4(str: string): boolean;
    isIPV6(str: string): boolean;
    isMoney(str: string): boolean;
    isEmail(str: string): boolean;
    isDomainName(str: string): boolean;
    isMobile(str: string): boolean;
    isLandline(str: string): boolean;
    isIdCard(str: string): boolean;
    isUrlHttp(str: string): boolean;
    isPlateNumber(str: string): boolean;
    isDate(str: string): boolean;
    isTime(str: string): boolean;
    isBlankLine(str: string): boolean;
}
declare const _default: ValidateUtil;
export default _default;
