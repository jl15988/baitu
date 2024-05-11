import {JSONType} from "./JSONUtil";
import StrUtil from "../string/StrUtil";

type KeysOfType<T, U> = {
    [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];

/**
 * Url工具
 */
export class UrlUtil {

    Fast;

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
}

const urlUtil = new UrlUtil();
/**
 * 快速获取
 */
urlUtil.Fast = {
    getParams(): JSONType {
        return urlUtil.getParams(urlUtil.getUrl());
    },
    getParam(name: string): string {
        return urlUtil.getParam(urlUtil.getUrl(), name);
    },
    getParamKeys(): string[] {
        return urlUtil.getParamKeys(urlUtil.getUrl());
    },
    getParamValues(): any[] {
        return urlUtil.getParamValues(urlUtil.getUrl());
    }
}

export default urlUtil;
