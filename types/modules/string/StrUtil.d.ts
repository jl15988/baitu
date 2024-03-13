declare class StrUtil {
    /**
     * 判断字符串是否为：null、undefined、空字符串或者只包含空白字符（如空格、制表符、换行符等）
     * @param str 字符串
     */
    isBlank(str: string): boolean;
    /**
     * 判断字符串为非：null、undefined、空字符串或者只包含空白字符（如空格、制表符、换行符等）
     * @param str 字符串
     */
    isNotBlank(str: string): boolean;
    /**
     * 判断字符串为空字符串
     * @param str 字符串
     */
    isEmpty(str: string): boolean;
    /**
     * 判断字符串非空字符串
     * @param str 字符串
     */
    isNotEmpty(str: string): boolean;
}
declare const _default: StrUtil;
export default _default;
