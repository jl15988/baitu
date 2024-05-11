declare class JulianDay {
    J2000: number;
    getJulianDay(year: number, month: number, day: number, hour: number, min: number, second: number): number;
    toJulianDay(year: number, month: number, day: number): number;
    dt_T(t: any): number;
    dt_ext(y: any, jsd: any): number;
    dt_calc(y: any): number;
}
declare const _default: JulianDay;
export default _default;
