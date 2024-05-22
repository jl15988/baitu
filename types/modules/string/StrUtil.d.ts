import { JSONType } from "../common/JSONUtil";
/**
 * 字符串工具
 */
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
     * 如果字符串为null返回默认值，否则返回原字符串
     * @param str 字符串
     * @param defaultStr 默认值
     */
    defaultIfNull(str: string, defaultStr: string): string;
    /**
     * 如果字符串为空白字符串返回默认值，否则返回原字符串
     * @param str 字符串
     * @param defaultStr 默认值
     */
    defaultIfBlank(str: string, defaultStr: string): string;
    /**
     * 如果为空字符串返回默认值，否则返回原字符串
     * @param str 字符串
     * @param defaultStr 默认值
     */
    defaultIfEmpty(str: string, defaultStr: string): string;
    /**
     * 判断多个字符串中是否包含空白字符串
     * @param str 字符串数组
     */
    isAnyBlank(...str: string[]): boolean;
    /**
     * 判断多个字符串中是否“不”包含空白字符串
     * @param str 字符串数组
     */
    isNoneBlank(...str: string[]): boolean;
    /**
     * 判断多个字符串是否全为空白字符串
     * @param str 字符串数组
     */
    isAllBlank(...str: string[]): boolean;
    /**
     * 判断多个字符串中是否包含空字符串
     * @param str 字符串数组
     */
    isAnyEmpty(...str: string[]): boolean;
    /**
     * 判断多个字符串中是否“不”包含空字符串
     * @param str 字符串数组
     */
    isNoneEmpty(...str: string[]): boolean;
    /**
     * 判断多个字符串是否全为空字符串
     * @param str 字符串数组
     */
    isAllEmpty(...str: string[]): boolean;
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
    chunk(str: string, chunkSize: number): string[];
    /**
     * 分割字符串为固定长度数组
     * @param str 字符串
     * @param count 数组长度
     */
    chunkCount(str: string, count: number): string[];
    /**
     * 驼峰转连字符
     * @param str 字符串
     * @param spacer 连接符 默认-
     */
    toKebab(str: string, spacer?: string): string;
    /**
     * 转驼峰
     * @param str 字符串
     * @param spacers 连接符 默认['-', '_']
     */
    toHump(str: string, ...spacers: string[]): string;
    /**
     * 字符串格式化
     * @param str 字符串
     * @param args 格式化项
     */
    format(str: string, ...args: any[]): string;
    /**
     * 字符串 Map 格式化
     * @param str 字符串
     * @param map 参数
     */
    formatMap(str: string, map: JSONType): string;
    /**
     * 当字符串不为空时追加对应的字符串
     * @param str 字符串
     * @param appends 要追加的字符串
     */
    appendIfNotEmpty(str: string, appends: string): string;
    /**
     * 获取字符串的 unicode 总和
     * @param str 字符串
     */
    getUnicodeSum(str: string): number;
    /**
     * 获取字符串的 unicode，默认获取第一个字符
     * @param str 字符串
     * @param index 要获取的字符下标
     */
    getUnicode(str: string, index?: number): number;
    /**
     * 比较两个字符串大小（按 unicode 总和比较），前者小于后者时结果小于 0，相反大于 0，等于时为 0
     * @param str1 字符串 1
     * @param str2 字符串 2
     */
    compare(str1: string, str2: string): number;
    /**
     * 比较两个字符串大小（按第一个字符 unicode 比较），前者小于后者时结果小于 0，相反大于 0，等于时为 0
     * @param str1 字符串 1
     * @param str2 字符串 2
     */
    compareByHead(str1: string, str2: string): number;
}
declare const _default: StrUtil;
export default _default;
