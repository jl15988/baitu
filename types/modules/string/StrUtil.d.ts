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
    /**
     * 获取需要额外填充的字符串
     * @param str 字符串
     * @param len 目标长度
     * @param pad 要填充的字符串
     */
    getPadStr(str: string, len: number, pad?: string): string;
    /**
     * 在字符串开始填充额外的字符串
     * @param str 字符串
     * @param len 目标长度
     * @param pad 要填充的字符串
     */
    padStart(str: string, len: number, pad?: string): string;
    /**
     * 在字符串结束填充额外的字符串
     * @param str 字符串
     * @param len 目标长度
     * @param pad 要填充的字符串
     */
    padEnd(str: string, len: number, pad?: string): string;
    /**
     * 按长度分割字符串转为数组
     * @param str 字符串
     * @param chunkSize 分割长度
     */
    chunk(str: string, chunkSize: number): RegExpMatchArray | [];
    /**
     * 分割字符串为固定长度数组
     * @param str 字符串
     * @param count 数组长度
     */
    chunkCount(str: string, count: number): any[];
}
declare const _default: StrUtil;
export default _default;
