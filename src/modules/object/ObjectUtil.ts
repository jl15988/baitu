import { StrUtil } from "../string";
import { cloneDeep, merge } from "lodash-es";

/**
 * 对象工具
 */
class ObjectUtil {

    isNull(obj: any): obj is (undefined | null) {
        return obj === undefined || obj === null;
    }

    isNotNull<T>(obj: T): obj is T {
        return !this.isNull(obj);
    }

    /**
     * 判断任意一种类型数据是否为空：字符串、null、undefined、数组、对象等
     * @param value 数据
     */
    isEmpty(value: any): value is (undefined | null | '' | [] | {}) {
        // 如果值未定义或者为null，返回true
        if (value === undefined || value == null) {
            return true;
        }

        // 如果值是字符串，并且长度为0，返回true
        if (typeof value === 'string' && value.trim() === '') {
            return true;
        }

        // 如果值是数组，并且长度为0，返回true
        if (Array.isArray(value) && value.length === 0) {
            return true;
        }

        // 如果值是对象，并且没有可枚举的属性，返回true
        if (typeof value === 'object' && Object.keys(value).length === 0) {
            return true;
        }

        // 其他情况，返回false
        return false;
    }

    isNotEmpty<T>(value: T): value is T {
        return !this.isEmpty(value);
    }

    /**
     * 深拷贝，深克隆
     * @param obj 对象
     */
    deepClone<T>(obj: T): T {
        return cloneDeep(obj)
    }

    /**
     * 深合并，对于 source 中没有的属性不会覆盖
     * @param target 目标对象
     * @param sources 源对象
     */
    deepAssign(target: any, ...sources: any[]): any {
        return merge(target, ...sources);
    }

    /**
     * 比较数字或字符串大小
     * @param obj1 数字或字符串
     * @param obj2 数字或字符串
     */
    compare(obj1: string | number, obj2: string | number): number {
        if (typeof obj1 === "number" && typeof obj2 === "number") {
            // 数字
            return obj1 - obj2;
        }
        const numberReg = /^\d+(\.\d+)?$/;
        if (typeof obj1 === "string" && typeof obj2 === "string") {
            if (numberReg.test(obj1) && numberReg.test(obj2)) {
                // 字符串数字
                return parseInt(String(parseFloat(obj1) - parseFloat(obj2)));
            }
            // 字符串
            return StrUtil.compareByHead(obj1, obj2);
        }
        // @ts-ignore
        let v1: number = null, v2: number = null;
        if (typeof obj1 === "string") {
            if (numberReg.test(obj1)) {
                v1 = parseFloat(obj1);
            } else {
                // @ts-ignore
                v1 = StrUtil.getUnicode(obj1);
            }
        } else {
            v1 = obj1;
        }
        if (typeof obj2 === "string") {
            if (numberReg.test(obj2)) {
                v2 = parseFloat(obj2);
            } else {
                // @ts-ignore
                v2 = StrUtil.getUnicode(obj2);
            }
        } else {
            v2 = obj2;
        }
        if (v1 === null || v2 === null) {
            throw new Error("value error");
        }
        return v1 - v2;
    }
}

export default new ObjectUtil();
