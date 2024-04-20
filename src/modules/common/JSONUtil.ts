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
     * json转url参数
     * @param json json
     */
    toParams(json: JSONType): string {
        return Object.keys(json).map(function (key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
    }
}

export default new JSONUtil()
