import BigNumber from "bignumber.js";
import NumberUtil from "./NumberUtil";

export default class LongNumber extends BigNumber {
    [key: string]: any;

    constructor(n: BigNumber.Value, base?: number) {
        super(n, base);
    }

    /**
     * 位运算或
     * @param number 数字
     */
    bitwiseOr(number: number | LongNumber): LongNumber {
        return NumberUtil.bitwiseOr(this, number);
    }

    /**
     * 位运算左移
     * @param digit 位数
     */
    leftShift(digit: number): LongNumber {
        return NumberUtil.leftShift(this, digit);
    }

    /**
     * 位运算右移
     * @param digit 位数
     */
    rightShift(digit: number): LongNumber {
        return NumberUtil.rightShift(this, digit);
    }
}
