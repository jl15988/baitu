/**
 * 正则池
 */
const PatternPool = {
    /**
     * 数字
     */
    NUMBER: /^[+-]?\d+(?:\.\d+)?$/,
    /**
     * 整数
     */
    INTEGER: /^[+-]?\d+$/,
    /**
     * 小数（不包含整数）
     */
    DECIMAL: /^[+-]?(?:0|\d{1,}\.\d+)$/,
    /**
     * 英文
     */
    WORD: new RegExp("[a-zA-Z]+"),
    /**
     * 中文
     */
    CHINESE: new RegExp("^[\u4e00-\u9fa5]{0,}$"),
    /**
     * IPV4
     */
    IPV4: new RegExp("\\b((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\.((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\.((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\.((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\b"),
    /**
     * IPV6
     */
    IPV6: new RegExp("(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))"),
    /**
     * 钱
     */
    MONEY: new RegExp("^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$"),
    /**
     * 邮箱
     */
    EMAIL: new RegExp("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$"),
    /**
     * 域名
     */
    DOMAIN_NAME: new RegExp("[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\\.?"),
    /**
     * 手机号
     */
    MOBILE: new RegExp("^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\d{8}$"),
    /**
     * 固定电话
     */
    LANDLINE: new RegExp("^((\\d{3,4}-)|\\d{3.4}-)?\\d{7,8}$"),
    /**
     * 身份证号
     */
    ID_CARD: new RegExp("(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)"),
    /**
     * http网址
     */
    URL_HTTP: new RegExp("^(https://|http://)?([\\w-]+\\.)+[\\w-]+(:\\d+)*(/[\\w- ./?%&=]*)?"),
    /**
     * 车牌号
     */
    PLATE_NUMBER: new RegExp("^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$"),
    /**
     * 日期
     */
    DATE: new RegExp("^\\d{4}-\\d{1,2}-\\d{1,2}"),
    /**
     * 时间
     */
    TIME: new RegExp("\\d{1,2}:\\d{1,2}(:\\d{1,2})?"),
    /**
     * 空白行
     */
    BLANK_LINE: new RegExp("\\n\\s*\\r"),
}

/**
 * 定义正则池，相同 key 的正则将会覆盖
 * @param options 正则项
 */
export function definePattern<T extends Record<string, RegExp>>(options: T = {} as T) {
    Object.assign(PatternPool, options)

    type PatternPoolKeyType = keyof typeof PatternPool
    type OptionsKeyType = keyof T
    // @ts-ignore
    const patternPool: {
        [key in PatternPoolKeyType]: typeof PatternPool[key]
    } & {
        [key in OptionsKeyType]: T[key]
    } = PatternPool
    return {
        patternPool
    }
}

export default PatternPool;
