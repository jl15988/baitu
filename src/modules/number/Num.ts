class Num extends Number {

    /**
     * 保留两位小数，四舍五入
     * @param fractionDigits 小数位
     */
    toFixed(fractionDigits?: number): string {
        return super.toFixed(fractionDigits);
    }

    /**
     * 截取保留小数位，没有四舍五入，直接截取
     * @param fractionDigits 小数位
     */
    toFixedCut(fractionDigits: number): string {
        return this.valueOf().toString().match(/^\d+(?:\.\d{0,2})?/).toString();
    }

    /**
     * 向下取整
     */
    floor(): number {
        return Math.floor(this.valueOf());
    }

    /**
     * 向上取整
     */
    ceil(): number {
        return Math.ceil(this.valueOf());
    }
}

export default Num;
