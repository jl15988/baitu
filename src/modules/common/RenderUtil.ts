import ArrayUtil from "../array/ArrayUtil";

/**
 * 数据渲染工具
 *
 * 该工具主要用于对数据的匹配渲染，方法几乎允许所有参数为空，旨在减少数据渲染中的各种异常问题，让数据渲染更加简洁、可靠
 */
class RenderUtil {

    renderObj<K extends keyof any, T, R>(obj: Record<K, T> | null | undefined, compareField?: keyof T | null, compareValue?: any, resField?: keyof T | null, defaultRes: R | string = '') {
        if (!obj) return defaultRes;
        Object.entries(obj).forEach(([key, value]) => {
            if (compareField) {
                if (key === compareField) {

                }
            }
        })
        if (!compareField) {
            const values = Object.values(obj);
            values.find(item => item === compareValue)
        }
    }

    /**
     * 匹配数组中的项渲染
     * @param arr 数组
     * @param compareField 要比较的字段，如果不指定则直接通过项来比较
     * @param compareValue 要比较的目标值
     * @param resField 匹配成功后，要返回的字段值，如果为空，则直接返回匹配的项
     * @param defaultRes 匹配失败返回的默认值，默认空字符串
     */
    renderArrFind<T, R>(arr?: T[] | null, compareField?: keyof T | null, compareValue?: any, resField?: keyof T | null, defaultRes: R | string = '') {
        return this.renderArrFindMapper(arr, resField, (item) => (compareField ? item[compareField] : item) === compareValue, defaultRes);
    }

    /**
     * 匹配数组中的项渲染，函数形式
     * @param arr 数组
     * @param resField 匹配成功后，要返回的字段值，如果为空，则直接返回匹配的项
     * @param findMapper 匹配处理函数
     * @param defaultRes 匹配失败返回的默认值，默认空字符串
     */
    renderArrFindMapper<T, R>(arr?: T[] | null,
                              resField?: keyof T | null,
                              findMapper?: (item: T, index: number, obj: T[]) => boolean,
                              defaultRes: R | string = '') {
        if (!ArrayUtil.isEmpty(arr)) return defaultRes;
        if (!findMapper) findMapper = (item, index) => index === 0;
        const item = arr!.find(findMapper);
        if (!item) return defaultRes;
        return (resField ? item[resField] : item) || defaultRes;
    }
}

export default new RenderUtil();
