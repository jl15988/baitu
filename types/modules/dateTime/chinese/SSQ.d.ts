/************************
 实气实朔计算器
 适用范围 -722年2月22日——1959年12月
 平气平朔计算使用古历参数进行计算
 定朔、定气计算使用开普勒椭圆轨道计算，同时考虑了光行差和力学时与UT1的时间差
 古代历算仅在晚期才使用开普勒方法计算，此前多采用一些修正表并插值得到，精度很低，与本程序中
 的开普勒方法存在误差，造成朔日计算错误1千多个，这些错误使用一个修正表进行订正。同样，定气部分
 也使用了相同的方法时行订正。
 平气朔表的算法(线性拟合)：
 气朔日期计算公式：D = k*n + b  , 式中n=0,1,2,3,...,N-1, N为该式适用的范围
 h表示k不变b允许的误差,如果b不变则k许可误差为h/N
 每行第1个参数为k,第2参数为b
 *************************/
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
