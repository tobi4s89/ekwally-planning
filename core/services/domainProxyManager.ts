import type {
    ProxyConfigFunction,
    ProxyConfigEntry,
    ProxyConfig,
    CastedProxyConfig
} from './index'

class DomainProxyManager {
    static castProxyConfig(config: ProxyConfig): CastedProxyConfig {
        const castedConfig: CastedProxyConfig = {}

        for (const [domainType, methods] of Object.entries(config)) {
            const [domain, type] = domainType.split('.')

            castedConfig[domain] = castedConfig[domain] || {}
            castedConfig[domain][type] = castedConfig[domain][type] || {}

            for (const [originalMethod, proxyMethod] of Object.entries(methods)) {
                castedConfig[domain][type][originalMethod] = proxyMethod
            }
        }

        return castedConfig
    }

    static mergeProxyConfigs(globalConfig: CastedProxyConfig, newConfig: CastedProxyConfig): CastedProxyConfig {
        const mergedConfig = { ...globalConfig }

        for (const [domain, types] of Object.entries(newConfig)) {
            mergedConfig[domain] = mergedConfig[domain] || {}

            for (const [type, methods] of Object.entries(types)) {
                mergedConfig[domain][type] = mergedConfig[domain][type] || {}

                for (const [originalMethod, proxyMethod] of Object.entries(methods)) {
                    let currentProxies = mergedConfig[domain][type][originalMethod]

                    if (currentProxies) {
                        (currentProxies as ProxyConfigEntry[]).push(proxyMethod)

                        continue
                    } else {
                        currentProxies = [proxyMethod as ProxyConfigFunction]
                    }

                    mergedConfig[domain][type][originalMethod] = currentProxies
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
        const domainConfig = proxyConfig[domain]
        if (!domainConfig) return componentMethods

        const componentProxyConfig = domainConfig[componentType]
        if (!componentProxyConfig) return componentMethods

        return Object.keys(componentMethods).reduce((proxiedMethods: any, methodName) => {
            const originalMethod = componentMethods[methodName];
            if (componentProxyConfig[methodName] && typeof originalMethod === 'function') {
                // Get the list of plugins for the method
                const plugins = componentProxyConfig[methodName] as ProxyConfigFunction[];

                // Start with the original method as the base for chaining
                let chainedMethod = originalMethod;

                // Apply each plugin as a layer of proxy around the previous one
                for (const plugin of plugins) {
                    chainedMethod = ((currentMethod) => {
                        return new Proxy(currentMethod, {
                            async apply(target, thisArg, argumentsList) {
                                const callback = async (...args: any) => Reflect.apply(target, thisArg, args);
                                const result = await plugin(argumentsList, callback, { 'vla': 'bloe' });

                                return result;
                            }
                        });
                    })(chainedMethod);
                }

                // Assign the fully chained method as the proxied method
                proxiedMethods[methodName] = chainedMethod;
            } else {
                proxiedMethods[methodName] = originalMethod;
            }
            return proxiedMethods;
        }, {});
    }
}

export { DomainProxyManager }
