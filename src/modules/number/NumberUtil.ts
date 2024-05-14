import Long from "long";

/**
 * 数字工具
 */
class NumberUtil {

    /**
     * 保留两位小数，四舍五入
     * @param number 数字
     * @param fractionDigits 小数位，默认两位
     */
    fixed(number: number, fractionDigits: number = 2): number {
        return Number(number.toFixed(fractionDigits));
    }

    /**
     * 截取保留小数位，没有四舍五入，直接截取
     * @param number 数字
     * @param fractionDigits 小数位，默认两位
     */
    fixedCut(number: number, fractionDigits: number = 2): number {
        return Number(number.toString().match(new RegExp(`^\\d+(?:\\.\\d{0,${fractionDigits}})?`)));
    }

    /**
     * 向下取整
     * @param number 数字
     */
    floor(number: number): number {
        return Math.floor(number);
    }

    /**
     * 向上取整
     * @param number 数字
     */
    ceil(number: number): number {
        return Math.ceil(number);
    }

    /**
     * 位运算或
     * @param numbers 数字
     */
    bitwiseOr(...numbers: (Long | string | number)[]) {
        let number = Long.fromValue(numbers[0]);
        for (let i = 1; i < numbers.length; i++) {
            number = number.or(Long.fromValue(numbers[i]));
        }
        return number;
    }

    /**
     * 位运算并
     * @param numbers 数字
     */
    bitwiseAnd(...numbers: (Long | string | number)[]) {
        let number = Long.fromValue(numbers[0]);
        for (let i = 1; i < numbers.length; i++) {
            number = number.and(Long.fromValue(numbers[i]));
        }
        return number;
    }

    /**
     * 将数字转换为二进制字符串
     * @param number 数字
     */
    toBinaryString(number: (Long | string | number)): string {
        let bigNum = Long.fromValue(number);
        let binaryString = bigNum.toString(2); // 转换为二进制字符串
        // 去除开头的 '0.'（如果有的话），因为 bigNum.toString(2) 可能会返回 '0.xxxxxx' 的形式
        // binaryString = binaryString.replace(/^0\./, '');
        return binaryString.toString();
    }

    /**
     * 位运算左移
     * @param number 数字
     * @param digit 位数
     */
    leftShift(number: (Long | string | number), digit: (Long | number)): Long {
        const bigNum = Long.fromValue(number);
        return bigNum.shiftLeft(digit);
    }

    /**
     * 位运算右移
     * @param number 数字
     * @param digit 位数
     */
    rightShift(number: (Long | string | number), digit: (Long | number)): Long {
        const bigNum = Long.fromValue(number);
        return bigNum.shiftRight(digit);
    }

    /**
     * 判断数字是否为空
     * @param number 数字
     */
    isEmpty(number: number): boolean {
        return !number;
    }

    /**
     * 如果数字为空返回默认值，否则直接返回
     * @param number 数字
     * @param defaultNumber 默认数字
     */
    defaultIfEmpty(number: number, defaultNumber: number): number {
        return this.isEmpty(number) ? defaultNumber : number;
    }
}

export default new NumberUtil();
