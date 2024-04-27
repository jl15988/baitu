/**
 * 对象工具
 */
export declare class ObjectUtil {
    /**
     * 判断任意一种类型数据是否为空：字符串、null、undefined、数组、对象等
     * @param value 数据
     */
    isEmpty(value: any): boolean;
    /**
     * 深拷贝
     * @param obj 对象
     */
    deepCopy(obj: any): any;
    /**
     * 当对象不为空时追加对应的值
     * @param obj 对象
     * @param appends 追加的值
     */
    appendIfNotEmpty(obj: any, appends: any): string;
}
declare const _default: ObjectUtil;
export default _default;
