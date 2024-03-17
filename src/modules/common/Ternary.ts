import ArrayUtil from "../array/ArrayUtil";

class Ternary {
    pool: (Ternary | boolean | (() => boolean))[];
    condition: boolean | (() => boolean);
    conditionRes: boolean;
    result: any = null;
    orResult: any = null;
    currentResult: any = null;
    effectCondition: boolean | (() => boolean);
    effectConditionRes: boolean;
    previous: Ternary;

    /**
     * 判断是否函数，如果是则执行并返回结果，如果不是则直接返回
     * @param fn 函数
     */
    static isFunAndExe(fn: any) {
        if (fn instanceof Function) {
            return fn();
        }
        return fn;
    }

    private constructor(condition: any, result: any, previous: Ternary) {
        this.condition = condition;
        this.conditionRes = Ternary.isFunAndExe(this.condition);
        this.previous = previous;
        this.result = result;
        if (previous === null) {
            this.effectCondition = this.condition;
            this.effectConditionRes = this.conditionRes;
            this.currentResult = this.result;
        } else {
            if (this.previous.conditionRes) {
                this.effectCondition = this.previous.condition;
                this.effectConditionRes = this.previous.conditionRes;
                this.currentResult = this.previous.result;
            } else {
                this.effectCondition = this.condition;
                this.effectConditionRes = this.conditionRes;
                this.currentResult = this.result;
            }
        }
        this.pool = ArrayUtil.push(this.pool, this);
    }

    static if(fn: boolean | (() => boolean), res: any | (() => any)) {
        return new Ternary(fn, res, null);
    }

    if(fn: boolean | (() => boolean), res: any | (() => any)) {
        return new Ternary(fn, res, this);
    }

    else(fn: any | (() => any)) {
        this.orResult = fn;
        if (!this.effectConditionRes) {
            this.currentResult = fn;
        }
        return this;
    }

    get() {
        return Ternary.isFunAndExe(this.currentResult);
    }
}

export default Ternary;
