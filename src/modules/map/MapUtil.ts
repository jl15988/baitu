class MapUtil {
    setIfAbsent<T extends Record<any, any>>(map: T, key: string | number, value: any): T {
        if (map.hasOwnProperty(key)) {
            return map
        }
        // @ts-ignore
        map[key] = value;
        return map;
    }

    has(map: Record<any, any>, key: string): boolean;
    has(map: Record<any, any>, key: string, value: any): boolean;

    has(map: Record<any, any>, keyOrValue: any, value?: any): boolean {
        if (value) {
            if (!map.hasOwnProperty(keyOrValue)) return false;
            return map[keyOrValue] === value;
        }
        return map.hasOwnProperty(keyOrValue);
    }
}

export default new MapUtil()
