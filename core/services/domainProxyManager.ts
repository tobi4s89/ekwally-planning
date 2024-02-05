export type ProxyConfigFunction = (...args: any[]) => any
export type ProxyConfigEntry = { [key: string]: ProxyConfigFunction | ProxyConfigFunction[] }
export type ProxyConfig = { [domainMethod: string]: ProxyConfigEntry }
export type CastedProxyConfig = { [domain: string]: { [type: string]: { [originalMethod: string]: ProxyConfigEntry } } }

class DomainProxyManager {
    static castProxyConfig(config: ProxyConfig): CastedProxyConfig {
        const castedConfig: CastedProxyConfig = {}

        for (const [domainMethod, proxyMethod] of Object.entries(config)) {
            const [domain, type, originalMethod] = domainMethod.split('.')

            castedConfig[domain] = castedConfig[domain] || {}
            castedConfig[domain][type] = castedConfig[domain][type] || {}
            castedConfig[domain][type][originalMethod] = proxyMethod
        }

        return castedConfig
    }

    static mergeProxyConfigs(globalConfig: CastedProxyConfig, newConfig: CastedProxyConfig): CastedProxyConfig {
        const mergedConfig = { ...globalConfig }

        for (const [domain, types] of Object.entries(newConfig)) {
            mergedConfig[domain] = mergedConfig[domain] || {}

            for (const [type, methods] of Object.entries(types)) {
                mergedConfig[domain][type] = mergedConfig[domain][type] || {}

                for (const [originalMethod, configEntry] of Object.entries(methods)) {
                    const existingEntry = mergedConfig[domain][type][originalMethod] || {}

                    for (const [key, func] of Object.entries(configEntry)) {
                        if (!existingEntry[key]) {
                            existingEntry[key] = [func] as ProxyConfigFunction[]
                        } else {
                            (existingEntry[key] as ProxyConfigFunction[]).push(func as ProxyConfigFunction)
                        }
                    }

                    mergedConfig[domain][type][originalMethod] = existingEntry
                }
            }
        }

        return mergedConfig;
    }

    static applyProxyToComponent(
        domain: string,
        componentType: string,
        componentMethods: any,
        proxyConfig: CastedProxyConfig
    ): any {
        const domainConfig = proxyConfig[domain];
        if (!domainConfig) return componentMethods;

        const componentConfig = domainConfig[componentType];
        if (!componentConfig) return componentMethods;

        return Object.keys(componentMethods).reduce((proxiedMethods: any, methodName) => {
            const originalMethod = componentMethods[methodName];
            if (componentConfig[methodName] && typeof originalMethod === 'function') {
                const behaviors = componentConfig[methodName];

                // Wrap the method with proxy applying the behaviors
                proxiedMethods[methodName] = new Proxy(originalMethod, {
                    apply(target, thisArg, argumentsList) {
                        // Execute 'before' behavior before the original method
                        if (behaviors.before) {
                            (behaviors.before as ProxyConfigFunction[]).forEach(func => func.apply(null, [argumentsList, originalMethod]));
                        }

                        // Call the original method
                        const result = Reflect.apply(target, thisArg, argumentsList);

                        // Execute 'after' behavior after the original method
                        if (behaviors.after) {
                            (behaviors.after as ProxyConfigFunction[]).forEach(func => func.apply(null, [argumentsList, result]));
                        }

                        return result;
                    }
                });
            } else {
                proxiedMethods[methodName] = originalMethod;
            }
            return proxiedMethods;
        }, {});
    }
}

export { DomainProxyManager };
