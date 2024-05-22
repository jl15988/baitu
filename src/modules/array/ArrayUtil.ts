import ObjectUtil from "../object/ObjectUtil";

/**
 * 数组工具
 */
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

    /**
     * 判断数组是否为空数组
     * @param array 数组
     */
    isEmpty(array: any[]): boolean {
        return !array || array.length === 0;
    }

    /**
     * 判断数组为非空数组
     * @param array 数组
     */
    isNotEmpty(array: any[]): boolean {
        return !this.isEmpty(array);
    }

    /**
     * 如果数组为空则替换，否则直接返回
     * @param array 判空的数组
     * @param defaultArray 替换的数组
     */
    defaultIfEmpty(array: any[], defaultArray: any[]): any[] {
        return this.isEmpty(array) ? defaultArray : array;
    }

    /**
     * 固定长度首部添加元素，返回删除的元素（向数组开头添加元素，如果长度超出指定长度，则删除尾部元素）
     * @param array 数组
     * @param len 固定的长度
     * @param items 要添加的元素
     */
    fixedUnshift(array: any[], len: number, ...items: any[]) {
        array.unshift(...items.reverse());
        let deleteArr = [];
        if (array.length > len) {
            deleteArr = array.splice(len, array.length - len);
        }
        return deleteArr;
    }

    /**
     * 固定长度尾部添加元素，返回删除的元素（向数组最后添加元素，如果长度超出指定长度，则删除首部元素）
     * @param array 数组
     * @param len 固定的长度
     * @param items 要添加的元素
     */
    fixedPush(array: any[], len: number, ...items: any[]) {
        array.push(...items);
        let deleteArr = [];
        if (array.length > len) {
            deleteArr = array.splice(0, array.length - len);
        }
        return deleteArr;
    }

    /**
     * 深拷贝
     * @param array 数组
     */
    deepCopy(array: any[]): any[] {
        if (!Array.isArray(array)) {
            return [];
        }
        return array.map(item => {
            if (Array.isArray(item)) {
                return this.deepCopy(item);
            } else if (typeof item === 'object' && item !== null) {
                return ObjectUtil.deepCopy(item);
            }
            return item;
        });
    }

    /**
     * 去重
     * @param arr 要去重的数组
     */
    unique(arr: any[]): any[] {
        return arr.reduce((acc, cur) => {
            if (!acc.includes(cur)) {
                acc.push(cur);
            }
            return acc;
        }, []);
    }

    /**
     * 取交集
     * @param arrs 要取交集的数组集
     */
    intersection(...arrs: any[]): any[] {
        const [first, ...rest] = arrs;
        return first.filter(item => rest.every(array => array.includes(item)));
    }

    /**
     * 取并集
     * @param arrs 要取并集的数组集
     */
    union(...arrs: any[]): any[] {
        return this.unique([].concat(...arrs));
    }

    /**
     * 取差集
     * @param arrs 要取差集的数组集
     */
    difference(...arrs: any): any[] {
        const arrf = this.intersection(arrs);
        return [...arrs].reduce((acc, curr) => {
            if (!acc.includes(curr) && !arrf.includes(curr)) {
                acc.push(curr);
            }
            return acc;
        }, []);
    }

    // todo 待完善

    groupBy() {

    }

    orderBy() {

    }

    /**
     * 指定值与数组中数值比较大小，找出应该存放的位置
     * @param arr
     * @param val
     */
    findInsertIndex(arr: number[], val: number) {
        let i = 0;
        while (i < arr.length && arr[i] < val) {
            i++;
        }
        return i;
    }
}

export default new ArrayUtil();
