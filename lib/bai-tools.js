(() => {
    "use strict";
    const t = new class {
        toDate(t) {
            let e;
            return e = t ? /^\d{10}$/.test(null == t ? void 0 : t.toString().trim()) ? new Date(1e3 * t) : "string" == typeof t && /^\d+$/.test(t.trim()) ? new Date(Number(t)) : "string" == typeof t && t.includes("-") && !t.includes("T") ? new Date(t.replace(/-/g, "/")) : new Date(t) : new Date, e
        }

        format(t, e) {
            e || (e = "yyyy-MM-dd HH:mm:ss");
            const s = this.toDate(t), n = {
                y: s.getFullYear().toString(),
                M: (s.getMonth() + 1).toString().padStart(2, "0"),
                d: s.getDate().toString().padStart(2, "0"),
                H: s.getHours().toString().padStart(2, "0"),
                m: s.getMinutes().toString().padStart(2, "0"),
                s: s.getSeconds().toString().padStart(2, "0")
            };
            for (const t in n) {
                const [s] = new RegExp(`${t}+`).exec(e) || [];
                if (s) {
                    const r = "y" === t && 2 === s.length ? 2 : 0;
                    e = e.replace(s, n[t].slice(r))
                }
            }
            return e
        }
    };

    class e {
    }

    const s = {SUN: 0, MON: 1, TUE: 2, WED: 3, THUR: 4, FRI: 5, SAT: 6};

    class n extends Date {
        constructor() {
            super(...arguments), this.firstWeek = 0
        }

        objectValues() {
            return {
                year: this.getFullYear(),
                month: this.getMonth(),
                day: this.getDate(),
                week: this.getDay(),
                hours: this.getHours(),
                minutes: this.getMinutes(),
                seconds: this.getSeconds()
            }
        }

        toDate() {
            const t = this.objectValues();
            return new n(t.year, t.month, t.day)
        }

        formatDate() {
            return t.format(this, "yyyy-MM-dd")
        }

        formatDateTime() {
            return t.format(this, "yyyy-MM-dd HH:mm:ss")
        }

        beginOfDay() {
            const t = this.objectValues();
            return new n(t.year, t.month, t.day, 0, 0, 0)
        }

        endOfDay() {
            const t = this.objectValues();
            return new n(t.year, t.month, t.day, 23, 59, 59)
        }

        beginOfWeek() {
            const t = this.objectValues(), e = this.firstWeek || 0;
            return new n(t.year, t.month, t.day - t.week + e, 0, 0, 0)
        }

        endOfWeek() {
            const t = this.objectValues(), e = this.firstWeek || 0;
            return new n(t.year, t.month, t.day + (6 - t.week + e), 23, 59, 59)
        }

        beginOfMonth() {
            const t = this.getFullYear(), e = this.getMonth();
            return new n(t, e, 1, 0, 0, 0)
        }

        endOfMonth() {
            const t = this.getFullYear(), e = this.getMonth() + 1;
            return new n(t, e, 0, 23, 59, 59)
        }

        beginOfYear() {
            const t = this.getFullYear();
            return new n(t, 0, 1, 0, 0, 0)
        }

        endOfYear() {
            const t = this.getFullYear();
            return new n(t + 1, 0, 0, 23, 59, 59)
        }

        setFirstWeek(t) {
            Object.values(s).includes(t) && (this.firstWeek = t)
        }

        offset(t, s) {
            if (!t) return this;
            const r = new n(this), o = r.objectValues();
            if (s = s || 0, e.YEAR === t) r.setFullYear(o.year + Number(s)); else if (e.MONTH === t) {
                const t = new n(r);
                t.setMonth(o.month + Number(s)), t.getMonth() !== r.getMonth() - 1 ? r.setDate(0) : r.setMonth(o.month + Number(s))
            } else e.DAY === t ? r.setDate(o.day + Number(s)) : e.WEEK === t ? r.setDate(o.day + 7 * s) : e.HOURS === t ? r.setHours(o.hours = Number(s)) : e.MINUTES === t ? r.setMinutes(o.minutes = Number(s)) : r.setSeconds(o.seconds = Number(s));
            return r
        }
    }

    const r = n;
    window && (window.DateTime = r)
})();