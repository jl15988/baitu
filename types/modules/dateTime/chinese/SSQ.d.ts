declare class SSQ {
    SB: string;
    QB: string;
    leap: number;
    ym: any[];
    ZQ: any[];
    ZQP1: any;
    ZQP2: any;
    HS: any[];
    dx: any[];
    Yn: any[];
    suoKB: number[];
    qiKB: number[];
    decSQ(val: string): string;
    calcY(jd: any): void;
    calc(jd: number, qs: string): any;
    so_low(W: number): number;
    qi_low(W: any): number;
    qi_high(W: any): number;
    so_high(W: any): number;
}
declare const _default: SSQ;
export default _default;
