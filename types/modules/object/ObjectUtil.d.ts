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
}
declare const _default: ObjectUtil;
export default _default;
