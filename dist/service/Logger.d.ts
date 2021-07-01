import BunyanLogger from 'bunyan';
/**
 * Strip it down to only those that can be represented in simple config from now. No code or
 * references to streams.
 */
export declare type LoggerConfig = Pick<BunyanLogger.LoggerOptions, 'name' | 'level' | 'src'> & {
    format?: 'json' | 'pretty';
};
export declare class Logger {
    private readonly options;
    static resolveBunyanConfig(options: LoggerConfig): BunyanLogger.LoggerOptions;
    private readonly root;
    constructor(options: LoggerConfig);
    scoped(name: string): Logger;
    reopenFileStreams(): void;
    trace(): boolean;
    trace(error: Error, ...params: unknown[]): void;
    trace(obj: Record<string, unknown>, ...params: unknown[]): void;
    trace(format: unknown, ...params: unknown[]): void;
    debug(): boolean;
    debug(error: Error, ...params: unknown[]): void;
    debug(obj: Record<string, unknown>, ...params: unknown[]): void;
    debug(format: unknown, ...params: unknown[]): void;
    info(): boolean;
    info(error: Error, ...params: unknown[]): void;
    info(obj: Record<string, unknown>, ...params: unknown[]): void;
    info(format: unknown, ...params: unknown[]): void;
    warn(): boolean;
    warn(error: Error, ...params: unknown[]): void;
    warn(obj: Record<string, unknown>, ...params: unknown[]): void;
    warn(format: unknown, ...params: unknown[]): void;
    error(): boolean;
    error(error: Error, ...params: unknown[]): void;
    error(obj: Record<string, unknown>, ...params: unknown[]): void;
    error(format: unknown, ...params: unknown[]): void;
    fatal(): boolean;
    fatal(error: Error, ...params: unknown[]): void;
    fatal(obj: Record<string, unknown>, ...params: unknown[]): void;
    fatal(format: unknown, ...params: unknown[]): void;
}
