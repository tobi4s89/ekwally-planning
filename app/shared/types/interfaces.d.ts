interface DomainComponentInterface {
    init: Function<this>
}

export interface PluginInterface {
    proxies: { [key: string]: { [key: string]: ProxyConfigEntry } }
    [methodName: string]: Function<any>
}