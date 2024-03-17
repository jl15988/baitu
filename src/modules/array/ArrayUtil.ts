import ObjectUtil from "../object/ObjectUtil";

class ArrayUtil {

    /**
     * 将数组循环拼接
     * @param arr 数组
     * @param count 循环次数
     */
    repeat(arr: (string | number)[], count: number): string {
        return arr.join('').repeat(count);
    }

    /**
     * 获取数组的最后一个元素
     * @param arr 数组
     * @param defaultItem 如果为空时，返回的默认值，非必传
     */
    finalItem(arr: any[], defaultItem?: any) {
        if (ObjectUtil.isEmpty(arr)) {
            return defaultItem;
        }
        return arr[arr.length - 1] || defaultItem;
    }

    /**
     * 向数组中添加新的元素并返回，如果数组为空，则返回包含新元素的数组
     * @param arr 数组
     * @param item 新元素
     */
    push(arr: any[] | null, item: any): any[] {
        if (Array.isArray(arr) && arr.length >= 0) {
            arr.push(item);
            return arr;
        }
        return [item];
    }
}

export default new ArrayUtil();
