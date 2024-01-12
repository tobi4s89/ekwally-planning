export function isObject(item: any) {
    return item !== null && typeof item === 'object' && item.constructor === Object;
}

export function mergeDeep(target: any, source: any) {
    if (isObject(source) && Object.keys(source).length === 0) {
        return cloneDeep({ ...target, ...source });
    }
    const output = { ...target, ...source };
    if (isObject(source) && isObject(target)) {
        for (const key in source) {
            if (isObject(source[key]) && key in target && isObject(target[key])) {
                output[key] = mergeDeep(target[key], source[key]);
            }
            else {
                output[key] = isObject(source[key]) ? cloneDeep(source[key]) : source[key];
            }
        }
    }
    return output;
}

export function cloneDeep(source: any) {
    if (!isObject(source)) {
        return source;
    }
    const output: any = {};
    for (const key in source) {
        output[key] = cloneDeep(source[key]);
    }
    return output;
}
