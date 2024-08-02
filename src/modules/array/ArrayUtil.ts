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
    repeat(arr: any[], count: number): string {
        return arr.join('').repeat(count);
    }

    /**
     * 获取数组后面的元素
     * <p>默认获取数组最后一项，可通过 count 指定获取数量，如果只获取一项，则直接返回**该项**，如果获取的大于一项，则返回**数组**</p>
     * @param arr 数组
     * @param count 获取的项数
     */
    finals<D>(arr: D[], count: number = 1): D | D[] | undefined {
        if (count === 0) return undefined;
        if (this.isEmpty(arr)) {
            return undefined;
        }
        let finals = []
        if (count > 0) {
            finals = arr.slice(-count);
        } else {
            finals = arr.slice(0, -count);
        }
        if (count === 1) {
            return finals[0] || undefined
        }
        return finals;
    }

    /**
     * 判断数组是否为空数组
     * @param array 数组
     */
    isEmpty(array?: any[] | null): boolean {
        return !array || array.length === 0;
    }

    /**
     * 判断数组为非空数组
     * @param array 数组
     */
    isNotEmpty(array?: any[] | null): boolean {
        return !this.isEmpty(array);
    }

    /**
     * 如果数组为空则替换，否则直接返回
     * @param array 判空的数组
     * @param defaultArray 替换的数组
     */
    defaultIfEmpty<T>(array: T[] | undefined | null, defaultArray: T[]): T[] {
        // @ts-ignore
        return this.isEmpty(array) ? defaultArray : array;
    }

    /**
     * 固长首部追加
     * <p>
     *     指定数组长度，如果数组不满足长度，则向数组首部追加指定元素
     *      <li>如果追加元素后超出指定长度，则从数组**尾部开始删除**超出数量，并返回删除的元素</li>
     *      <li>如果追加元素后不满足长度，则将继续追加最后一项元素，直到满足长度</li>
     * </p>
     * @param array 数组
     * @param len 固定的长度
     * @param items 要添加的元素
     */
    fixedUnshift(array: any[], len: number, ...items: any[]) {
        array.unshift(...items.reverse());
        let deleteArr = [];
        if (array.length > len) {
            deleteArr = array.splice(len, array.length - len);
        } else if (array.length < len) {
            for (let i = 0; i < len - array.length; i++) {
                array.unshift(items.reverse()[0])
            }
        }
        return deleteArr;
    }

    /**
     * 固长追加
     * <p>
     *     指定数组长度，如果数组长度不满足长度，则在数组尾部追加指定元素
     *     <li>如果追加元素后，超出指定长度，则从数组**首部开始删除**超出数量，并返回删除的元素</li>
     *     <li>如果追加元素后，未满足长度，则继续追加指定最后一项元素，直到满足长度</li>
     * </p>
     *
     * @param array 数组
     * @param len 固定的长度
     * @param items 要添加的元素
     */
    fixedPush(array: any[], len: number, ...items: any[]) {
        array.push(...items);
        let deleteArr = [];
        if (array.length > len) {
            deleteArr = array.splice(0, array.length - len);
        } else if (array.length < len) {
            for (let i = 0; i < len - array.length; i++) {
                array.push(items.reverse()[0]);
            }
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
     * 深合并
     * @param targets 目标数组
     * @param sources 源数组
     */
    deepAssign(targets: (object | object[])[], sources: (object | object[])[]): any[] {
        if (!sources || !Array.isArray(sources)) {
            return targets
        }
        return sources.map((item, index) => {
            if (item === undefined || item === null) {
                return targets[index]
            }
            if (Array.isArray(item)) {
                if (!!targets[index] && !Array.isArray(targets[index])) {
                    return this.deepAssign([], item)
                }
                // @ts-ignore
                return this.deepAssign(targets[index] || [], item);
            } else if (typeof item === 'object') {
                if (!!targets[index] && Array.isArray(targets[index])) {
                    return ObjectUtil.deepAssign({}, item)
                }
                return ObjectUtil.deepAssign(targets[index] || {}, item);
            }
            return item;
        });
    }

    /**
     * 去重
     * @param arr 要去重的数组
     * @param uniMapper 去重处理器，默认按当前元素去重，或者自定义，如：(cur: any) => cur.id
     */
    unique<T>(arr: T[], uniMapper?: (cur: T) => any): T[] {
        const uniArr: any[] = [];
        return arr.reduce((acc: T[], cur: T) => {
            const uniK = uniMapper ? uniMapper(cur) : cur;
            if (!uniArr.includes(uniK)) {
                acc.push(cur);
                uniArr.push(uniK);
            }
            return acc;
        }, []);
    }

    /**
     * 取交集
     * @param arrs 要取交集的数组集
     */
    intersection<T>(...arrs: T[][]): T[] {
        const [first, ...rest] = arrs;
        return this.unique(first.filter(item => rest.every(array => array.includes(item))));
    }

    /**
     * 取并集
     * @param arrs 要取并集的数组集
     */
    union<T>(...arrs: T[][]): T[] {
        return this.unique(([] as T[]).concat(...arrs));
    }

    /**
     * 取差集
     * @param arrs 要取差集的数组集
     */
    difference<T>(...arrs: T[][]): T[] {
        const intersection = this.intersection(...arrs);
        return ([] as T[]).concat(...arrs).reduce((acc: T[], curr) => {
            if (!acc.includes(curr) && !intersection.includes(curr)) {
                acc.push(curr);
            }
            return acc;
        }, []);
    }

    /**
     * 分组
     * @param arr 数组
     * @param keyMapper 分组关键字处理器
     */
    groupBy<T, K extends string | number>(arr: T[], keyMapper: (cur: T) => K): Record<K, T[]> {
        return arr.reduce((res, item: T) => {
            const key = keyMapper(item);
            if (!res[key]) {
                res[key] = [] as T[];
            }
            res[key].push(item);
            return res;
        }, {} as Record<K, T[]>);
    }

    /**
     * 多字段排序，排序的字段可指定排序规则，如 ["age desc", "height asc"]
     * @param arr 数组
     * @param orderKeys 排序的字段
     */
    orderBy<T>(arr: T[], orderKeys: string[]): T[] {
        for (let orderKey of orderKeys) {
            if (orderKey.endsWith(" desc")) {
                // @ts-ignore
                arr = this.orderByDesc(arr, orderKey.replace(" desc", ""));
            } else {
                // @ts-ignore
                arr = this.orderByAsc(arr, orderKey.replace(" asc", ""));
            }
        }
        return arr;
    }

    /**
     * 按字段正序排序，如果没有字段，则默认按数组项排序
     * @param arr 数组
     * @param orderKey 排序的字段
     */
    orderByAsc<T>(arr: T[], orderKey?: keyof T): T[] {
        return arr.sort((a, b) => {
            let v1: T | any = a, v2: T | any = b;
            if (orderKey) {
                v1 = a[orderKey];
                v2 = b[orderKey];
            }
            return ObjectUtil.compare(v1, v2);
        });
    }

    /**
     * 按字段倒序排序，如果没有字段，则默认按数组项排序
     * @param arr 数组
     * @param orderKey 排序的字段
     */
    orderByDesc<T>(arr: T[], orderKey?: keyof T): T[] {
        arr = this.deepCopy(arr);
        return arr.sort((a, b) => {
            let v1: T | any = a, v2: T | any = b;
            if (orderKey) {
                v1 = a[orderKey];
                v2 = b[orderKey];
            }
            return ObjectUtil.compare(v2, v1);
        })
    }

    /**
     * 指定值与数组中数值比较大小，找出应该存放的位置
     * @param arr 数组
     * @param val 值
     * @param keyMapper 字段处理器，为空时默认取当前元素
     */
    findIndex<T>(arr: T[], val: number | string, keyMapper?: (cur: T) => any) {
        let i = 0;
        while (i < arr.length && ObjectUtil.compare(keyMapper ? keyMapper(arr[i]) : arr[i], val) < 0) {
            i++;
        }
        return i;
    }
}

export default new ArrayUtil();
