import { JSONType } from "./JSONUtil";
/**
 * Url工具
 */
export declare class UrlUtil {
    Fast: any;
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
}
declare const urlUtil: UrlUtil;
export default urlUtil;
