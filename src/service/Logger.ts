import BunyanLogger from 'bunyan';
import PrettyStream from 'bunyan-prettystream';
import { InjectValue, Singleton } from 'typescript-ioc';

/**
 * Strip it down to only those that can be represented in simple config from now. No code or
 * references to streams.
 */
export type LoggerConfig = Pick<
  BunyanLogger.LoggerOptions,
  'name' | 'level' | 'src'
> & {
  format?: 'json' | 'pretty';
};

@Singleton
export class Logger {
  public static resolveBunyanConfig(
    options: LoggerConfig,
  ): BunyanLogger.LoggerOptions {
    return {
      level: options.level,
      name: options.name,
      serializers: {
        err: BunyanLogger.stdSerializers.err,
        req: BunyanLogger.stdSerializers.req,
        res: BunyanLogger.stdSerializers.res,
      },
      src: options.src,
      streams: [
        {
          level: options.level,
          ...(options.format === 'pretty'
            ? { stream: new PrettyStream().pipe(process.stdout), type: 'raw' }
            : { stream: process.stdout }),
        },
      ],
    };
  }

  private readonly root: BunyanLogger;

  constructor(
    @InjectValue('config.logger.service')
    private readonly options: LoggerConfig,
  ) {
    this.root = BunyanLogger.createLogger(Logger.resolveBunyanConfig(options));
  }

  public scoped(name: string): Logger {
    return new Logger({
      ...this.options,
      name: `${this.options.name}/${name}`,
    });
  }

  public reopenFileStreams(): void {
    this.root.reopenFileStreams();
  }
  public trace(): boolean;
  public trace(error: Error, ...params: unknown[]): void;
  public trace(obj: Record<string, unknown>, ...params: unknown[]): void;
  public trace(format: unknown, ...params: unknown[]): void;
  public trace(thing?: unknown, ...params: unknown[]): boolean | void {
    if (thing === undefined) {
      return this.root.trace();
    } else {
      this.root.trace(thing, ...params);
    }
  }

  public debug(): boolean;
  public debug(error: Error, ...params: unknown[]): void;
  public debug(obj: Record<string, unknown>, ...params: unknown[]): void;
  public debug(format: unknown, ...params: unknown[]): void;
  public debug(thing?: unknown, ...params: unknown[]): boolean | void {
    if (thing === undefined) {
      return this.root.debug();
    } else {
      this.root.debug(thing, ...params);
    }
  }

  public info(): boolean;
  public info(error: Error, ...params: unknown[]): void;
  public info(obj: Record<string, unknown>, ...params: unknown[]): void;
  public info(format: unknown, ...params: unknown[]): void;
  public info(thing?: unknown, ...params: unknown[]): boolean | void {
    if (thing === undefined) {
      return this.root.info();
    } else {
      this.root.info(thing, ...params);
    }
  }

  public warn(): boolean;
  public warn(error: Error, ...params: unknown[]): void;
  public warn(obj: Record<string, unknown>, ...params: unknown[]): void;
  public warn(format: unknown, ...params: unknown[]): void;
  public warn(thing?: unknown, ...params: unknown[]): boolean | void {
    if (thing === undefined) {
      return this.root.warn();
    } else {
      this.root.warn(thing, ...params);
    }
  }

  public error(): boolean;
  public error(error: Error, ...params: unknown[]): void;
  public error(obj: Record<string, unknown>, ...params: unknown[]): void;
  public error(format: unknown, ...params: unknown[]): void;
  public error(thing?: unknown, ...params: unknown[]): boolean | void {
    if (thing === undefined) {
      return this.root.error();
    } else {
      this.root.error(thing, ...params);
    }
  }

  public fatal(): boolean;
  public fatal(error: Error, ...params: unknown[]): void;
  public fatal(obj: Record<string, unknown>, ...params: unknown[]): void;
  public fatal(format: unknown, ...params: unknown[]): void;
  public fatal(thing?: unknown, ...params: unknown[]): boolean | void {
    if (thing === undefined) {
      return this.root.fatal();
    } else {
      this.root.fatal(thing, ...params);
    }
  }
}
