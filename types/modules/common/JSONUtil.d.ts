/**
 * JSON类型
 */
export type JSONType = {
    [key: string]: any;
};
/**
 * JSON工具
 */
declare class JSONUtil {
    /**
     * 复制
     * @param json json
     * @param fields 要复制的属性
     */
    copy(json: JSONType, ...fields: string[]): JSONType;
    /**
     * json 转 url 参数
     * @param json json
     */
    toParams(json: JSONType): string;
    /**
     * 提取字符串中的 JSON
     * @param str 字符串
     */
    getJSONFromString(str: string): JSONType[];
}
declare const _default: JSONUtil;
export default _default;
