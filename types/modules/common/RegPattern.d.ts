declare class RegPattern {
    readonly pattern: any;
    readonly length: any;
    readonly reg: any;
    toString(): any;
    constructor(str: string);
    test(str: string): any;
}
export default RegPattern;
