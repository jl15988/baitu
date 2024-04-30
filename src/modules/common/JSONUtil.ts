/**
 * JSON类型
 */
export type JSONType = {
    [key: string]: any
}

/**
 * JSON工具
 */
export class JSONUtil {

    /**
     * 复制
     * @param json json
     * @param fields 要复制的属性
     */
    copy(json: JSONType, ...fields: string[]) {
        const result: JSONType = {};
        Object.keys(json).forEach((key) => {
            if (fields.includes(key)) {
                result[key] = json[key];
            }
        });
        return result;
    }

    /**
     * json 转 url 参数
     * @param json json
     */
    toParams(json: JSONType): string {
        return Object.keys(json).map(function (key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
    }

    /**
     * 提取字符串中的 JSON
     * @param str 字符串
     */
    getJSONFromString(str: string): JSONType[] {
        const regex = /\{.*?\}/gs;
        const matches = str.match(regex);
        return matches.map(match => {
            try {
                return JSON.parse(match);
            } catch (error) {
                return null;
            }
        }).filter(value => value !== null);
    }
}

export default new JSONUtil()
