import {JSONType} from "../json/JSONUtil";

/**
 * Url工具
 */
export class UrlUtil {
    /**
     * json转url参数
     * @param json json数据
     */
    jsonToParams(json: JSONType): string {
        return Object.keys(json).map(function (key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
    }
}

export default new UrlUtil();
