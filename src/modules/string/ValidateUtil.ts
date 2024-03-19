import patternPoolInstance from "../common/PatternPool";

/**
 * 验证工具
 */
export class ValidateUtil {

    /**
     * 校验字符串是否符合正则表达式
     * @param str 字符串
     * @param pattern 正则表达式
     */
    validate(str: string, pattern: RegExp | string): boolean {
        return new RegExp(pattern).test(str);
    }

    /**
     * 是否数字
     * @param str 字符串
     */
    isNumber(str: string): boolean {
        return patternPoolInstance.NUMBERS.test(str);
    }

    isChinese(str: string): boolean {
        return patternPoolInstance.CHINESE.test(str);
    }

    isIPV4(str: string): boolean {
        return patternPoolInstance.IPV4.test(str);
    }

    isIPV6(str: string): boolean {
        return patternPoolInstance.IPV6.test(str);
    }

    isMoney(str: string): boolean {
        return patternPoolInstance.MONEY.test(str);
    }

    isEmail(str: string): boolean {
        return patternPoolInstance.EMAIL.test(str);
    }

    isDomainName(str: string): boolean {
        return patternPoolInstance.DOMAIN_NAME.test(str);
    }

    isMobile(str: string): boolean {
        return patternPoolInstance.MOBILE.test(str);
    }

    isLandline(str: string): boolean {
        return patternPoolInstance.LANDLINE.test(str);
    }

    isIdCard(str: string): boolean {
        return patternPoolInstance.ID_CARD.test(str);
    }

    isUrlHttp(str: string): boolean {
        return patternPoolInstance.URL_HTTP.test(str);
    }

    isPlateNumber(str: string): boolean {
        return patternPoolInstance.PLATE_NUMBER.test(str);
    }

    isDate(str: string): boolean {
        return patternPoolInstance.DATE.test(str);
    }

    isTime(str: string): boolean {
        return patternPoolInstance.TIME.test(str);
    }

    isBlankLine(str: string): boolean {
        return patternPoolInstance.BLANK_LINE.test(str);
    }
}

export default new ValidateUtil();
