import {JSONType} from "./JSONUtil";
import StrUtil from "../string/StrUtil";

/**
 * Url工具
 */
export class UrlUtil {

    /**
     * 获取当前的 url 地址
     */
    getUrl(): string {
        return window.location.href;
    }

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
     * 获取 url 中所有的参数名数组
     * @param url url 地址
     */
    getParamKeys(url: string): string[] {
        const params = this.getParams(url);
        return Object.keys(params);
    }

    /**
     * 获取 url 中所有参数值数组
     * @param url url 地址
     */
    getParamValues(url: string): any[] {
        const params = this.getParams(url);
        return Object.values(params);
    }

    /**
     * 直接从当前 url 中获取参数，并转为 JSON
     */
    getParamsFast(): JSONType {
        return this.getParams(this.getUrl());
    }

    /**
     * 直接从当前 url 中获取某个参数
     * @param name 参数名
     */
    getParamFast(name: string): string {
        return this.getParam(this.getUrl(), name);
    }

    /**
     * 获取当前 url 中所有的参数名数组
     */
    getParamKeysFast(): string[] {
        return this.getParamKeys(this.getUrl());
    }

    /**
     * 获取当前 url 中所有参数值数组
     */
    getParamValuesFast(): any[] {
        const params = this.getParams(this.getUrl());
        return Object.values(params);
    }
}

export default new UrlUtil();
