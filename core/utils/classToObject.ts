export const classToObject = (instance: any) => {
    const obj: any = {}
    let currentPrototype = Object.getPrototypeOf(instance)

    while (currentPrototype !== null) {
        const proto = currentPrototype

        for (const key of Object.getOwnPropertyNames(instance)) {
            if (
                key !== 'constructor' &&
                typeof instance[key] !== 'function' &&
                !Object.prototype.hasOwnProperty(key)
            ) {
                obj[key] = instance[key]
            }
        }

        for (const key of Object.getOwnPropertyNames(proto)) {
            if (
                key !== 'constructor' &&
                typeof proto[key] === 'function' &&
                !Object.prototype.hasOwnProperty(key)
            ) {
                obj[key] = proto[key].bind(instance)
            }
        }

        currentPrototype = Object.getPrototypeOf(proto)
    }

    return obj
}