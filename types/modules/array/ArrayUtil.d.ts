declare class ArrayUtil {
    /**
     * 将数组循环拼接
     * @param arr 数组
     * @param count 循环次数
     */
    repeat(arr: (string | number)[], count: number): string;
    /**
     * 获取数组的最后一个元素
     * @param arr 数组
     * @param defaultItem 如果为空时，返回的默认值，非必传
     */
    finalItem(arr: any[], defaultItem?: any): any;
    /**
     * 向数组中添加新的元素并返回，如果数组为空，则返回包含新元素的数组
     * @param arr 数组
     * @param item 新元素
     */
    push(arr: any[] | null, item: any): any[];
}
declare const _default: ArrayUtil;
export default _default;
