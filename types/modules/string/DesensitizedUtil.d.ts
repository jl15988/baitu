/**
 * 脱敏参数
 */
export type DesensitizedParam = {
    /**
     * 字符串
     */
    str: string;
    /**
     * 脱敏开始下标
     */
    startIndex?: number;
    /**
     * 脱敏长度
     */
    length?: number;
    /**
     * 填充符号，默认*
     */
    pad?: string;
};
/**
 * 保留脱敏参数
 */
export type DesensitizedReserveParam = {
    /**
     * 字符串
     */
    str: string;
    /**
     * 首部保留长度
     */
    headLen?: number;
    /**
     * 脱尾部保留长度
     */
    tailLen?: number;
    /**
     * 填充符号，默认*
     */
    pad?: string;
};
export declare class DesensitizedUtil {
    /**
     * 脱敏
     * @param str 字符串
     * @param startIndex 脱敏开始下标
     * @param length 脱敏长度
     * @param pad 填充符号，默认*
     */
    of(str: string, startIndex?: number, length?: number, pad?: string): string;
    /**
     * 保留脱敏
     * @param str 字符串
     * @param headLen 首部保留长度
     * @param tailLen 脱尾部保留长度
     * @param pad 填充符号，默认*
     */
    reserve(str: string, headLen?: number, tailLen?: number, pad?: string): string;
    /**
     * 脱敏，对象参数方式
     * @param params 见{@link DesensitizedParam}
     */
    with(params: DesensitizedParam): string;
    /**
     * 手机号脱敏，格式：123****5678
     * @param str 手机号字符串
     * @param startIndex 脱敏开始下标
     * @param length 脱敏长度
     * @param pad 填充符号，默认*
     */
    mobile(str: string, startIndex?: number, length?: number, pad?: string): string;
    /**
     * 姓名脱敏，格式：张**、张*
     * @param str 姓名字符串
     * @param startIndex 脱敏开始下标
     * @param length 脱敏长度
     * @param pad 填充符号，默认*
     */
    fullName(str: string, startIndex?: number, length?: number, pad?: string): string;
    /**
     * 姓名脱敏，格式：张*江，张*
     * @param str 姓名字符串
     */
    fullName2(str: string): string;
    /**
     * 身份证号脱敏，格式：3****************2
     * @param str 姓名字符串
     * @param headLen 首部保留长度
     * @param tailLen 脱尾部保留长度
     * @param pad 填充符号，默认*
     */
    idCard(str: string, headLen?: number, tailLen?: number, pad?: string): string;
    /**
     * 银行卡号脱敏，格式：***************3387
     * @param str 姓名字符串
     * @param headLen 首部保留长度
     * @param tailLen 脱尾部保留长度
     * @param pad 填充符号，默认*
     */
    bankAccount(str: string, headLen?: number, tailLen?: number, pad?: string): string;
    /**
     * 手机号脱敏，对象传参
     * @param params 见{@link DesensitizedParam}
     */
    mobileWith(params: DesensitizedParam): string;
    /**
     * 姓名脱敏，对象传参
     * @param params 见{@link DesensitizedParam}
     */
    fullNameWith(params: DesensitizedParam): string;
    /**
     * 身份证号脱敏，对象传参
     * @param params 见{@link DesensitizedReserveParam}
     */
    idCardWith(params: DesensitizedReserveParam): string;
    /**
     * 银行卡号脱敏，对象传参
     * @param params 见{@link DesensitizedReserveParam}
     */
    bankAccountWith(params: DesensitizedReserveParam): string;
}
declare const _default: DesensitizedUtil;
export default _default;
