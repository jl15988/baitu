declare class Ternary {
    pool: (Ternary | boolean | (() => boolean))[];
    condition: boolean | (() => boolean);
    conditionRes: boolean;
    result: any;
    orResult: any;
    currentResult: any;
    effectCondition: boolean | (() => boolean);
    effectConditionRes: boolean;
    previous: Ternary;
    /**
     * 判断是否函数，如果是则执行并返回结果，如果不是则直接返回
     * @param fn 函数
     */
    static isFunAndExe(fn: any): any;
    private constructor();
    static if(fn: boolean | (() => boolean), res: any | (() => any)): Ternary;
    if(fn: boolean | (() => boolean), res: any | (() => any)): Ternary;
    else(fn: any | (() => any)): this;
    get(): any;
}
export default Ternary;
