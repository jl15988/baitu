import { JSONType } from "../json/JSONUtil";
/**
 * Url工具
 */
export declare class UrlUtil {
    /**
     * json 转 url 参数
     * @param json json数据
     */
    jsonToParams(json: JSONType): string;
    /**
     * 获取 url 中的参数并转为 JSON 格式
     * @param url url 地址
     */
    getParams(url: string): JSONType;
    /**
     * 获取 url 中某个参数
     * @param url url 地址
     * @param name 参数名
     */
    getParam(url: string, name: string): string;
    /**
     * 直接从当前 url 中获取参数，并转为 JSON
     */
    getParamsFast(): JSONType;
    /**
     * 直接从当前 url 中获取某个参数
     * @param name 参数名
     */
    getParamFast(name: string): string;
}
declare const _default: UrlUtil;
export default _default;
