/**
 * 数组工具
 */
export declare class ArrayUtil {
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
    /**
     * 判断数组是否为空数组
     * @param array 数组
     */
    isEmpty(array: any[]): boolean;
    /**
     * 判断数组为非空数组
     * @param array 数组
     */
    isNotEmpty(array: any[]): boolean;
    /**
     * 如果数组为空则替换，否则直接返回
     * @param array 判空的数组
     * @param defaultArray 替换的数组
     */
    defaultIfEmpty(array: any[], defaultArray: any[]): any[];
}
declare const _default: ArrayUtil;
export default _default;
