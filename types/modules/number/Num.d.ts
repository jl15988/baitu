declare class Num extends Number {
    /**
     * 保留两位小数，四舍五入
     * @param fractionDigits 小数位
     */
    toFixed(fractionDigits?: number): string;
    /**
     * 截取保留小数位，没有四舍五入，直接截取
     * @param fractionDigits 小数位
     */
    toFixedCut(fractionDigits: number): string;
    /**
     * 向下取整
     */
    floor(): number;
    /**
     * 向上取整
     */
    ceil(): number;
}
export default Num;
