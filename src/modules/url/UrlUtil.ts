import {JSONType} from "../json/JSONUtil";
import StrUtil from "../string/StrUtil";

/**
 * Url工具
 */
export class UrlUtil {

    /**
     * json 转 url 参数
     * @param json json数据
     */
    jsonToParams(json: JSONType): string {
        return Object.keys(json).map(function (key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
    }

    /**
     * 获取 url 中的参数并转为 JSON 格式
     * @param url url 地址
     */
    getParams(url: string): JSONType {
        if (StrUtil.isBlank(url)) return {};
        // 使用正则表达式匹配参数部分
        const params = url.match(/[?&]([^=#]+)=([^&#]*)/g);
        const paramObj = {};
        if (params) {
            for (let i = 0; i < params.length; i++) {
                let param = params[i].substring(1).split('=');
                paramObj[param[0]] = decodeURIComponent(param[1]);
            }
        }
        return paramObj;
    }

    /**
     * 获取 url 中某个参数
     * @param url url 地址
     * @param name 参数名
     */
    getParam(url: string, name: string): string {
        if (StrUtil.isAnyBlank(url, name)) return undefined;
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    /**
     * 直接从当前 url 中获取参数，并转为 JSON
     */
    getParamsFast(): JSONType {
        const url = window.location.href;
        return this.getParams(url);
    }

    /**
     * 直接从当前 url 中获取某个参数
     * @param name 参数名
     */
    getParamFast(name: string): string {
        const url = window.location.href;
        return this.getParam(url, name);
    }
}

export default new UrlUtil();
