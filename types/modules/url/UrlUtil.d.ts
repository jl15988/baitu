import { JSONType } from "../json/JSONUtil";
/**
 * Url工具
 */
export declare class UrlUtil {
    /**
     * 获取当前的 url 地址
     */
    getUrl(): string;
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
     * 获取 url 中所有的参数名数组
     * @param url url 地址
     */
    getParamKeys(url: string): string[];
    /**
     * 获取 url 中所有参数值数组
     * @param url url 地址
     */
    getParamValues(url: string): any[];
    /**
     * 直接从当前 url 中获取参数，并转为 JSON
     */
    getParamsFast(): JSONType;
    /**
     * 直接从当前 url 中获取某个参数
     * @param name 参数名
     */
    getParamFast(name: string): string;
    /**
     * 获取当前 url 中所有的参数名数组
     */
    getParamKeysFast(): string[];
    /**
     * 获取当前 url 中所有参数值数组
     */
    getParamValuesFast(): any[];
}
declare const _default: UrlUtil;
export default _default;
