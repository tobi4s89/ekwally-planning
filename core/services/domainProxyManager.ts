import type {
    ProxyConfigFunction,
    ProxyConfigEntry,
    ProxyConfig,
    CastedProxyConfig
} from '../types'
import { pascalCaseToArray } from '../utils/pascalCaseToArray'

class DomainProxyManager {
    private static _registeredProxies: { [key: string]: any } = {}

    static get registeredProxies() {
        return this._registeredProxies
    }

    static set registeredProxies(value: { [key: string]: any }) {
        this._registeredProxies = { ...this._registeredProxies, ...value }
    }

    static castProxyConfig(config: ProxyConfig, name: string): CastedProxyConfig {
        const castedConfig: CastedProxyConfig = {}

        for (const [domainType, methods] of Object.entries(config)) {
            const [domain, type] = domainType.split('.')

            castedConfig[domain] = castedConfig[domain] || {}
            castedConfig[domain][type] = castedConfig[domain][type] || {}

            for (const [originalMethod, proxyMethod] of Object.entries(methods)) {
                castedConfig[domain][type][originalMethod] = proxyMethod
                DomainProxyManager.registeredProxies = { [name]: castedConfig[domain][type][originalMethod] }
            }
        }

        return castedConfig
    }

    static mergeProxyConfigs(mergedConfig: CastedProxyConfig, newConfig: CastedProxyConfig): CastedProxyConfig {
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

        return mergedConfig
    }

    static applyProxyToComponent(
        domain: string,
        componentType: string,
        componentMethods: any,
        proxyConfig: CastedProxyConfig,
        globalContext: any
    ): any {
        const domainConfig = proxyConfig[domain]
        if (!domainConfig) return componentMethods

        const componentProxyConfig = domainConfig[componentType]
        if (!componentProxyConfig) return componentMethods

        const filterGlobalContext = (filter: string[]) => {
            return filter.reduce((acc: any, name) => {
                if (globalContext[name]) {
                    acc[name] = globalContext[name]
                }
                return acc;
            }, {});
        }

        return Object.keys(componentMethods).reduce((proxiedMethods: any, methodName) => {
            const originalMethod = componentMethods[methodName]
            if (componentProxyConfig[methodName] && typeof originalMethod === 'function') {
                const plugins = componentProxyConfig[methodName] as ProxyConfigFunction[]
                let chainedMethod = originalMethod;

                for (const plugin of plugins) {
                    chainedMethod = ((currentMethod) => {
                        const registeredProxies = this._registeredProxies
                        return new Proxy(currentMethod, {
                            async apply(target, thisArg, argumentsList) {
                                const callback = async (...args: any) => Reflect.apply(target, thisArg, args);
                                let relation: string[] = [];
                                for (const [name, proxy] of Object.entries(registeredProxies)) {
                                    if (proxy === plugin) {
                                        relation = pascalCaseToArray(name)
                                        break
                                    }
                                }

                                return await plugin(argumentsList, callback, filterGlobalContext(relation));
                            }
                        });
                    })(chainedMethod);
                }

                proxiedMethods[methodName] = chainedMethod;
            } else {
                proxiedMethods[methodName] = originalMethod;
            }
            return proxiedMethods;
        }, {});
    }
}

export { DomainProxyManager }
