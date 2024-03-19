/**
 * 脱敏参数
 */
export type DesensitizedParam = {
    /**
     * 字符串
     */
    str: string,
    /**
     * 脱敏开始下标
     */
    startIndex?: number,
    /**
     * 脱敏长度
     */
    length?: number,
    /**
     * 填充符号，默认*
     */
    pad?: string
}

/**
 * 保留脱敏参数
 */
export type DesensitizedReserveParam = {
    /**
     * 字符串
     */
    str: string,
    /**
     * 首部保留长度
     */
    headLen?: number,
    /**
     * 脱尾部保留长度
     */
    tailLen?: number,
    /**
     * 填充符号，默认*
     */
    pad?: string
}

export class DesensitizedUtil {

    /**
     * 脱敏
     * @param str 字符串
     * @param startIndex 脱敏开始下标
     * @param length 脱敏长度
     * @param pad 填充符号，默认*
     */
    of(str: string, startIndex?: number, length?: number, pad: string = "*"): string {
        if (!startIndex && startIndex !== 0) {
            return str;
        }
        if (!length) {
            length = str.length - startIndex;
        }
        const regex = new RegExp(`(\\S{${startIndex}})\\S{${length}}(\\S{${str.length - startIndex - length}})`, 'g');
        return str.replace(regex, "$1" + pad.repeat(length) + "$2")
    }

    /**
     * 保留脱敏
     * @param str 字符串
     * @param headLen 首部保留长度
     * @param tailLen 脱尾部保留长度
     * @param pad 填充符号，默认*
     */
    reserve(str: string, headLen?: number, tailLen?: number, pad?: string): string {
        return this.of(str, headLen, str.length - headLen - tailLen, pad);
    }

    /**
     * 脱敏，对象参数方式
     * @param params 见{@link DesensitizedParam}
     */
    with(params: DesensitizedParam) {
        return this.of(params.str, params.startIndex, params.length, params.pad || "*");
    }

    /**
     * 手机号脱敏，格式：123****5678
     * @param str 手机号字符串
     * @param startIndex 脱敏开始下标
     * @param length 脱敏长度
     * @param pad 填充符号，默认*
     */
    mobile(str: string, startIndex: number = 3, length: number = 4, pad?: string): string {
        return this.of(str, startIndex, length, pad);
    }

    /**
     * 姓名脱敏，格式：张**、张*
     * @param str 姓名字符串
     * @param startIndex 脱敏开始下标
     * @param length 脱敏长度
     * @param pad 填充符号，默认*
     */
    fullName(str: string, startIndex: number = 1, length?: number, pad?: string): string {
        return this.of(str, startIndex, length, pad);
    }

    /**
     * 姓名脱敏，格式：张*江，张*
     * @param str 姓名字符串
     */
    fullName2(str: string): string {
        return this.reserve(str, 1, 1);
    }

    /**
     * 身份证号脱敏，格式：3****************2
     * @param str 姓名字符串
     * @param headLen 首部保留长度
     * @param tailLen 脱尾部保留长度
     * @param pad 填充符号，默认*
     */
    idCard(str: string, headLen: number = 1, tailLen: number = 1, pad?: string): string {
        return this.reserve(str, headLen, tailLen, pad);
    }

    /**
     * 银行卡号脱敏，格式：***************3387
     * @param str 姓名字符串
     * @param headLen 首部保留长度
     * @param tailLen 脱尾部保留长度
     * @param pad 填充符号，默认*
     */
    bankAccount(str: string, headLen: number = 0, tailLen: number = 4, pad?: string): string {
        return this.reserve(str, headLen, tailLen, pad);
    }

    /**
     * 手机号脱敏，对象传参
     * @param params 见{@link DesensitizedParam}
     */
    mobileWith(params: DesensitizedParam): string {
        return this.mobile(params.str, params.startIndex, params.length, params.pad);
    }

    /**
     * 姓名脱敏，对象传参
     * @param params 见{@link DesensitizedParam}
     */
    fullNameWith(params: DesensitizedParam): string {
        return this.fullName(params.str, params.startIndex, params.length, params.pad);
    }

    /**
     * 身份证号脱敏，对象传参
     * @param params 见{@link DesensitizedReserveParam}
     */
    idCardWith(params: DesensitizedReserveParam): string {
        return this.idCard(params.str, params.headLen, params.tailLen, params.pad);
    }

    /**
     * 银行卡号脱敏，对象传参
     * @param params 见{@link DesensitizedReserveParam}
     */
    bankAccountWith(params: DesensitizedReserveParam): string {
        return this.bankAccount(params.str, params.headLen, params.tailLen, params.pad);
    }
}

export default new DesensitizedUtil();
