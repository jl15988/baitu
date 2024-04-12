/**
 * JSON类型
 */
export type JSONType = {
    [key: string]: any;
};
/**
 * JSON工具
 */
export declare class JSONUtil {
    /**
     * 复制
     * @param json json
     * @param fields 要复制的属性
     */
    copy(json: JSONType, ...fields: string[]): JSONType;
    /**
     * json转url参数
     * @param json json
     */
    toParams(json: JSONType): string;
}
declare const _default: JSONUtil;
export default _default;
