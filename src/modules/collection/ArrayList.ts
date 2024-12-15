import ArrayUtil from "../array/ArrayUtil";

class ArrayList<T> {
    array: Array<T> = [];

    add(obj: T) {
        this.array.push(obj);
        return this;
    }

    constructor(array: T[]) {
        this.array = array;
    }

    remove(index: number): T | null;
    remove(obj: T): boolean;

    remove(objOrIndex: T | number): boolean | T | null {
        if (typeof objOrIndex === "number") {
            const removeds = this.array.splice(objOrIndex, 1);
            if (removeds.length > 0) {
                return removeds[0]
            }
            return null;
        }
        const index = this.array.indexOf(objOrIndex);
        if (index >= 0) {
            const removeds = this.array.splice(index, 1);
            return removeds.length > 0;
        } else {
            return false;
        }
    }

    unique(comparator?: (a: T, b: T) => boolean) {
        return new ArrayList(ArrayUtil.unique(this.array, comparator));
    }
}

export default ArrayList;
