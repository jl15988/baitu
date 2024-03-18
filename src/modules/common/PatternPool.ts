/**
 * 正则池
 */
export class PatternPool {
    /**
     * 数字
     */
    readonly NUMBERS = new RegExp("\\d+");
    /**
     * 英文
     */
    readonly WORD = new RegExp("[a-zA-Z]+");
    /**
     * 中文
     */
    readonly CHINESE = new RegExp("^[\u4e00-\u9fa5]{0,}$");
    /**
     * IPV4
     */
    readonly IPV4 = new RegExp("\\b((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\.((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\.((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\.((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\b");
    /**
     * IPV6
     */
    readonly IPV6 = new RegExp("(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))");
    /**
     * 钱
     */
    readonly MONEY = new RegExp("^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$");
    /**
     * 邮箱
     */
    readonly EMAIL = new RegExp("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
    /**
     * 域名
     */
    readonly DOMAIN_NAME = new RegExp("[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\\.?");
    /**
     * 手机号
     */
    readonly MOBILE = new RegExp("^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\d{8}$");
    /**
     * 固定电话
     */
    readonly LANDLINE = new RegExp("^((\\d{3,4}-)|\\d{3.4}-)?\\d{7,8}$");
    /**
     * 身份证号
     */
    readonly ID_CARD = new RegExp("(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)");
    /**
     * http网址
     */
    readonly URL_HTTP = new RegExp("(https://|http://)?([\\w-]+\\.)+[\\w-]+(:\\d+)*(/[\\w- ./?%&=]*)?");
    /**
     * 车牌号
     */
    readonly PLATE_NUMBER = new RegExp("^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$");
    /**
     * 日期
     */
    readonly DATE = new RegExp("^\\d{4}-\\d{1,2}-\\d{1,2}");
    /**
     * 时间
     */
    readonly TIME = new RegExp("\\d{1,2}:\\d{1,2}(:\\d{1,2})?");
    /**
     * 空白行
     */
    readonly BLANK_LINE = new RegExp("\\n\\s*\\r");

    /**
     * 转为正则对象
     * @param str 字符串
     */
    toReg(str) {
        return new RegExp(str);
    }

    /**
     * 添加正则
     * @param map 正则对象
     */
    add(map: { [key: string]: string | RegExp }) {
        for (let key in map) {
            this[key] = map[key]
        }
    }
}

const patternPoolInstance = new PatternPool();
export default patternPoolInstance;
