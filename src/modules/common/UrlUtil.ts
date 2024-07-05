import StrUtil from "../string/StrUtil";
import ValidateUtil from "../string/ValidateUtil";

/**
 * Url工具
 */
class UrlUtil {

    /**
     * 快速获取
     */
    Fast = {
        /**
         * 获取 url 中的参数并转为 JSON 格式
         */
        getParams(): Record<string, string | number | boolean> {
            return urlUtil.getParams(urlUtil.getUrl());
        },
        /**
         * 获取 url 中某个参数
         * @param name 参数名
         */
        getParam(name: string): string | undefined {
            return urlUtil.getParam(urlUtil.getUrl(), name);
        },
        /**
         * 获取 url 中所有的参数名数组
         */
        getParamKeys(): string[] {
            return urlUtil.getParamKeys(urlUtil.getUrl());
        },
        /**
         * 获取 url 中所有参数值数组
         */
        getParamValues(): (string | number | boolean)[] {
            return urlUtil.getParamValues(urlUtil.getUrl());
        },
        /**
         * 获取 url 中的域名
         */
        getDomain(): string | undefined {
            return urlUtil.getDomain(urlUtil.getUrl());
        },
        /**
         * 获取 url 中的 hash 参数
         */
        getHash(): string | undefined {
            return urlUtil.getHash(urlUtil.getUrl());
        }
    }

    /**
     * 判断是否为 url
     * @param str 要判断的字符串
     */
    isUrl(str: string): boolean {
        return ValidateUtil.isUrlHttp(str);
    }

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
    jsonToParams(json: Record<string, string | number | boolean>): string {
        return Object.keys(json).map(function (key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
    }

    /**
     * 获取 url 中的参数并转为 JSON 格式
     * @param url url 地址
     */
    getParams(url: string): Record<string, string | number | boolean> {
        if (StrUtil.isBlank(url)) return {};
        // 使用正则表达式匹配参数部分
        const params = url.match(/[?&]([^=#]+)=([^&#]*)/g);
        const paramObj: Record<string, string | number | boolean> = {};
        if (params) {
            for (let i = 0; i < params.length; i++) {
                let param = params[i].substring(1).split('=');
                const paramVal = decodeURIComponent(param[1])
                const paramKey = param[0]
                if (paramVal === 'true') {
                    paramObj[paramKey] = true;
                } else if (paramVal === 'false') {
                    paramObj[paramKey] = false;
                } else if (ValidateUtil.isInteger(paramVal)) {
                    paramObj[paramKey] = parseInt(paramVal);
                } else if (ValidateUtil.isDecimal(paramVal)) {
                    paramObj[paramKey] = parseFloat(paramVal);
                } else {
                    paramObj[paramKey] = paramVal;
                }
            }
        }
        return paramObj;
    }

    /**
     * 获取 url 中某个参数
     * @param url url 地址
     * @param name 参数名
     */
    getParam(url: string, name: string): string | undefined {
        if (StrUtil.isAnyBlank(url, name)) return undefined;
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(url);
        if (!results) return undefined;
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
    getParamValues(url: string): (string | number | boolean)[] {
        const params = this.getParams(url);
        return Object.values(params);
    }

    /**
     * 获取 url 中的域名
     * @param url url 地址
     */
    getDomain(url: string): string | undefined {
        if (!this.isUrl(url)) {
            return '';
        }
        const match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im);
        return match ? match[1] : undefined;
    }

    /**
     * 获取 url 中的 hash 参数
     * @param url url 地址
     */
    getHash(url: string): string | undefined {
        if (!this.isUrl(url)) {
            return '';
        }
        const match = url.match(/(?:\#)(.*)/);
        return match ? match[1] : undefined;
    }
}

const urlUtil = new UrlUtil();
export default urlUtil;
