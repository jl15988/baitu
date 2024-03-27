import BigNumber from "bignumber.js";
export default class LongNumber extends BigNumber {
    [key: string]: any;
    constructor(n: BigNumber.Value, base?: number);
    /**
     * 位运算或
     * @param number 数字
     */
    bitwiseOr(number: number | LongNumber): LongNumber;
    /**
     * 位运算左移
     * @param digit 位数
     */
    leftShift(digit: number): LongNumber;
    /**
     * 位运算右移
     * @param digit 位数
     */
    rightShift(digit: number): LongNumber;
}
