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
     * “或”位运算
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
     * “并”位运算
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
    isEmpty(number: number | undefined | null): number is (undefined | null) {
        // 不能使用!，0 不算空
        return typeof number !== 'number' || Number.isNaN(number);
    }

    /**
     * 判断数字不为空
     * @param number 数字
     */
    isNotEmpty(number: number | undefined | null): number is number {
        return !this.isEmpty(number);
    }

    /**
     * 如果数字为空返回默认值，否则直接返回
     * @param number 数字
     * @param defaultNumber 默认数字
     */
    defaultIfEmpty(number: number | undefined | null, defaultNumber: number): number {
        return this.isEmpty(number) ? defaultNumber : number!;
    }

    /**
     * 随机生成 min 到 max 的随机数
     * @param min 最小值
     * @param max 最大值
     */
    random(min: number, max: number): number;
    /**
     * 随机生成 0 到 max 的随机数
     * @param max 最大值
     */
    random(max: number): number;

    /**
     * 随机生成 min 到 max 的随机数
     * @param minOrMax 最小值或最大值
     * @param max 最大值
     */
    random(minOrMax: number, max?: number): number {
        let min = minOrMax
        if (!max) {
            max = min;
            min = 0;
        }
        if (min > max) {
            let hold = max;
            max = min;
            min = hold;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * 调整数字到 a 和 b 之间
     *
     * 当数字大于或小于 a/b 时返回 a/b
     * @param num 数字
     * @param a 数字 a
     * @param b 数字 b
     */
    turnBetween(num: number, a: number, b: number): number {
        if (b < a) {
            let hold = b;
            b = a
            a = hold
        }
        if (num < a) {
            return a;
        } else if (num > b) {
            return b;
        }
        return num;
    }

    /**
     * 调整数字到 0 和 maxNum 之间，但是当数字 小于 0 时，取 maxNum-num 值，若此时仍为负数，则直接返回 0，大于 maxNum 时返回 maxNum
     *
     * @param num 数字
     * @param maxNum 最大值
     */
    turnOverZeroBetweenMax(num: number, maxNum: number): number {
        if (num < 0) {
            num = num + maxNum
            if (num < 0) {
                return 0;
            }
            return num;
        } else if (num > maxNum) {
            return maxNum;
        }
        return num;
    }
}

export default new NumberUtil();
