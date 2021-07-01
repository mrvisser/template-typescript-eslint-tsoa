"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Logger_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const bunyan_1 = __importDefault(require("bunyan"));
const bunyan_prettystream_1 = __importDefault(require("bunyan-prettystream"));
const typescript_ioc_1 = require("typescript-ioc");
let Logger = Logger_1 = class Logger {
    constructor(options) {
        this.options = options;
        this.root = bunyan_1.default.createLogger(Logger_1.resolveBunyanConfig(options));
    }
    static resolveBunyanConfig(options) {
        return {
            level: options.level,
            name: options.name,
            serializers: {
                err: bunyan_1.default.stdSerializers.err,
                req: bunyan_1.default.stdSerializers.req,
                res: bunyan_1.default.stdSerializers.res,
            },
            src: options.src,
            streams: [
                {
                    level: options.level,
                    ...(options.format === 'pretty'
                        ? { stream: new bunyan_prettystream_1.default().pipe(process.stdout), type: 'raw' }
                        : { stream: process.stdout }),
                },
            ],
        };
    }
    scoped(name) {
        return new Logger_1({
            ...this.options,
            name: `${this.options.name}/${name}`,
        });
    }
    reopenFileStreams() {
        this.root.reopenFileStreams();
    }
    trace(thing, ...params) {
        if (thing === undefined) {
            return this.root.trace();
        }
        else {
            this.root.trace(thing, ...params);
        }
    }
    debug(thing, ...params) {
        if (thing === undefined) {
            return this.root.debug();
        }
        else {
            this.root.debug(thing, ...params);
        }
    }
    info(thing, ...params) {
        if (thing === undefined) {
            return this.root.info();
        }
        else {
            this.root.info(thing, ...params);
        }
    }
    warn(thing, ...params) {
        if (thing === undefined) {
            return this.root.warn();
        }
        else {
            this.root.warn(thing, ...params);
        }
    }
    error(thing, ...params) {
        if (thing === undefined) {
            return this.root.error();
        }
        else {
            this.root.error(thing, ...params);
        }
    }
    fatal(thing, ...params) {
        if (thing === undefined) {
            return this.root.fatal();
        }
        else {
            this.root.fatal(thing, ...params);
        }
    }
};
Logger = Logger_1 = __decorate([
    typescript_ioc_1.Singleton,
    __param(0, typescript_ioc_1.InjectValue('config.logger.service')),
    __metadata("design:paramtypes", [Object])
], Logger);
exports.Logger = Logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2UvTG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBa0M7QUFDbEMsOEVBQStDO0FBQy9DLG1EQUF3RDtBQWN4RCxJQUFhLE1BQU0sY0FBbkIsTUFBYSxNQUFNO0lBMEJqQixZQUVtQixPQUFxQjtRQUFyQixZQUFPLEdBQVAsT0FBTyxDQUFjO1FBRXRDLElBQUksQ0FBQyxJQUFJLEdBQUcsZ0JBQVksQ0FBQyxZQUFZLENBQUMsUUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQTlCTSxNQUFNLENBQUMsbUJBQW1CLENBQy9CLE9BQXFCO1FBRXJCLE9BQU87WUFDTCxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7WUFDcEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ2xCLFdBQVcsRUFBRTtnQkFDWCxHQUFHLEVBQUUsZ0JBQVksQ0FBQyxjQUFjLENBQUMsR0FBRztnQkFDcEMsR0FBRyxFQUFFLGdCQUFZLENBQUMsY0FBYyxDQUFDLEdBQUc7Z0JBQ3BDLEdBQUcsRUFBRSxnQkFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHO2FBQ3JDO1lBQ0QsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHO1lBQ2hCLE9BQU8sRUFBRTtnQkFDUDtvQkFDRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7b0JBQ3BCLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLFFBQVE7d0JBQzdCLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLDZCQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7d0JBQ2xFLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ2hD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