import Long from "long";
/**
 * 数字工具
 */
export declare class NumberUtil {
    /**
     * 保留两位小数，四舍五入
     * @param number 数字
     * @param fractionDigits 小数位，默认两位
     */
    fixed(number: number, fractionDigits?: number): number;
    /**
     * 截取保留小数位，没有四舍五入，直接截取
     * @param number 数字
     * @param fractionDigits 小数位，默认两位
     */
    fixedCut(number: number, fractionDigits?: number): number;
    /**
     * 向下取整
     * @param number 数字
     */
    floor(number: number): number;
    /**
     * 向上取整
     * @param number 数字
     */
    ceil(number: number): number;
    /**
     * 位运算或
     * @param numbers 数字
     */
    bitwiseOr(...numbers: (Long | string | number)[]): Long;
    /**
     * 位运算并
     * @param numbers 数字
     */
    bitwiseAnd(...numbers: (Long | string | number)[]): Long;
    /**
     * 将数字转换为二进制字符串
     * @param number 数字
     */
    toBinaryString(number: (Long | string | number)): string;
    /**
     * 位运算左移
     * @param number 数字
     * @param digit 位数
     */
    leftShift(number: (Long | string | number), digit: (Long | number)): Long;
    /**
     * 位运算右移
     * @param number 数字
     * @param digit 位数
     */
    rightShift(number: (Long | string | number), digit: (Long | number)): Long;
    /**
     * 判断数字是否为空
     * @param number 数字
     */
    isEmpty(number: number): boolean;
    /**
     * 如果数字为空返回默认值，否则直接返回
     * @param number 数字
     * @param defaultNumber 默认数字
     */
    defaultIfEmpty(number: number, defaultNumber: number): number;
}
declare const _default: NumberUtil;
export default _default;
