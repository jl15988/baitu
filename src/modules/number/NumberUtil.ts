import Num from './Num'
import LongNumber from "../number/LongNumber";
import StrUtil from "../string/StrUtil";

/**
 * 数字工具
 */
export class NumberUtil {

    /**
     * 保留两位小数，四舍五入
     * @param number 数字
     * @param fractionDigits 小数位，默认两位
     */
    fixed(number: number, fractionDigits: number = 2): number {
        return Number(new Num(number).toFixed(fractionDigits));
    }

    /**
     * 截取保留小数位，没有四舍五入，直接截取
     * @param number 数字
     * @param fractionDigits 小数位，默认两位
     */
    fixedCut(number: number, fractionDigits: number = 2): number {
        return Number(new Num(number).toFixedCut(fractionDigits));
    }

    /**
     * 向下取整
     * @param number 数字
     */
    floor(number: number): number {
        return Number(new Num(number).floor());
    }

    /**
     * 向上取整
     * @param number 数字
     */
    ceil(number: number): number {
        return Number(new Num(number).ceil());
    }

    /**
     * 位运算或
     * @param numbers 数字
     */
    bitwiseOr(...numbers: (number | LongNumber)[]) {
        let binaryString1 = this.toBinaryString(numbers[0]);
        for (let i = 1; i <= numbers.length; i++) {
            const binaryString2 = this.toBinaryString(numbers[i]);
            // 确保两个二进制字符串长度相同，较短的字符串前面补 0
            const maxLength = Math.max(binaryString1.length, binaryString2.length);
            const paddedBinaryString1 = StrUtil.padStart(binaryString1, maxLength, '0');
            const paddedBinaryString2 = StrUtil.padStart(binaryString2, maxLength, '0');
            // 对每个位执行按位或操作
            let resultBinaryString = '';
            for (let i = 0; i < maxLength; i++) {
                const bit1 = paddedBinaryString1[i];
                const bit2 = paddedBinaryString2[i];
                resultBinaryString += (bit1 === '1' || bit2 === '1') ? '1' : '0';
            }
            binaryString1 = resultBinaryString;
        }
        // 将二进制字符串转换回 BigNumber
        return new LongNumber(binaryString1, 2);
    }

    /**
     * 将数字转换为二进制字符串
     * @param number 数字
     */
    toBinaryString(number: number | LongNumber): string {
        let bigNum = new LongNumber(number);
        let binaryString = bigNum.toString(2); // 转换为二进制字符串
        // 去除开头的 '0.'（如果有的话），因为 bigNum.toString(2) 可能会返回 '0.xxxxxx' 的形式
        binaryString = binaryString.replace(/^0\./, '');
        return binaryString.toString();
    }

    /**
     * 位运算左移
     * @param number 数字
     * @param digit 位数
     */
    leftShift(number: number | LongNumber, digit: number): LongNumber {
        const bigNum = new LongNumber(number);
        return new LongNumber(bigNum.times(new LongNumber(2).pow(digit)));
    }

    /**
     * 位运算右移
     * @param number 数字
     * @param digit 位数
     */
    rightShift(number: number | LongNumber, digit: number): LongNumber {
        // 右移操作（除以 2 的 n 次幂，并可能进行四舍五入）
        const bigNum = new LongNumber(number);
        return new LongNumber(bigNum.dividedBy(new LongNumber(2).pow(digit))); // round(0) 表示不进行小数部分的四舍五入
    }
}

export default new NumberUtil();
