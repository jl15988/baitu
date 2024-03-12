import Num from './Num'

class NumberUtil {

    /**
     * 保留两位小数，四舍五入
     * @param number 数字
     * @param fractionDigits 小数位
     */
    fixed(number: number, fractionDigits: number): number {
        return Number(new Num(number).toFixed(fractionDigits));
    }

    /**
     * 截取保留小数位，没有四舍五入，直接截取
     * @param number 数字
     * @param fractionDigits 小数位
     */
    fixedCut(number: number, fractionDigits: number): number {
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
}

export default new NumberUtil();
