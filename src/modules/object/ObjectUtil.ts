import ArrayUtil from "../array/ArrayUtil";

/**
 * 对象工具
 */
export class ObjectUtil {

    /**
     * 判断任意一种类型数据是否为空：字符串、null、undefined、数组、对象等
     * @param value 数据
     */
    isEmpty(value: any): boolean {
        // 如果值未定义或者为null，返回true
        if (value == null) {
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

    /**
     * 深拷贝
     * @param obj 对象
     */
    deepCopy(obj: any): any {
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }
        const copy = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                copy[key] = Array.isArray(value) ? ArrayUtil.deepCopy(obj[key]) : this.deepCopy(value);
            }
        }
        return copy;
    }

    /**
     * 当对象不为空时追加对应的值
     * @param obj 对象
     * @param appends 追加的值
     */
    appendIfNotEmpty(obj: any, appends: any): string {
        if (!this.isEmpty(obj)) {
            return obj.toString().concat(appends);
        }
        return '';
    }
}

export default new ObjectUtil();
