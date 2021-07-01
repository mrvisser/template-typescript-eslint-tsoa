"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const util_1 = __importDefault(require("util"));
const config_1 = __importDefault(require("config"));
const express_1 = __importStar(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const tsoa_1 = require("tsoa");
const typescript_ioc_1 = require("typescript-ioc");
const uuid_1 = require("uuid");
const AuthenticationError_1 = require("./domain/errors/AuthenticationError");
const routes_1 = require("./routes");
const Logger_1 = require("./service/Logger");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const expressBunyanLogger = require('@chaudhryjunaid/express-bunyan-logger');
// Bind config to the injection container so we can do @InjectValue(config.Logger.name)
typescript_ioc_1.Container.bindName('config').to(config_1.default.util.loadFileConfigs());
exports.app = express_1.default();
// Read sent json payloads
exports.app.use(express_1.urlencoded({ extended: true }));
exports.app.use(express_1.json());
// Request ID tracking
exports.app.use((req, res, next) => {
    const uuid = uuid_1.v4();
    req.id = uuid;
    res.setHeader('x-request-id', uuid);
    next();
});
const webLoggerConfig = Logger_1.Logger.resolveBunyanConfig(config_1.default.get('logger.web'));
exports.app.use(expressBunyanLogger({
    ...webLoggerConfig,
    genReqId(req) {
        return req.id;
    },
}));
exports.app.use(expressBunyanLogger.errorLogger(webLoggerConfig));
exports.app.use('/docs', swagger_ui_express_1.default.serve, async (_req, res) => {
    return res.send(swagger_ui_express_1.default.generateHTML(await Promise.resolve().then(() => __importStar(require('./swagger.json')))));
});
routes_1.RegisterRoutes(exports.app);
/** Error handling. */
exports.app.use(function errorHandler(err, _, res, next) {
    if (err instanceof AuthenticationError_1.AuthenticationError) {
        return send(401, { message: err.message });
    }
    else if (err instanceof tsoa_1.ValidateError) {
        return send(400, { details: err.fields, message: 'Validation Failed' });
    }
    else if (err instanceof Error) {
        return send(500, { message: 'Internal Server Error' });
    }
    function send(code, body) {
        const finalBody = { ...body };
        if (process.env.NODE_ENV !== 'production') {
            if (err instanceof Error) {
                finalBody._debug = {
                    message: err.message,
                    stack: err.stack,
                };
            }
            else {
                finalBody._debug = {
                    inspect: util_1.default.inspect(err),
                };
            }
        }
        res.status(code).json(finalBody);
    }
    next();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQXdCO0FBRXhCLG9EQUE0QjtBQUM1QixtREFNaUI7QUFDakIsNEVBQTJDO0FBQzNDLCtCQUFxQztBQUNyQyxtREFBMkM7QUFDM0MsK0JBQW9DO0FBRXBDLDZFQUEwRTtBQUMxRSxxQ0FBMEM7QUFDMUMsNkNBQTBDO0FBRTFDLDhEQUE4RDtBQUM5RCxNQUFNLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0FBRTdFLHVGQUF1RjtBQUN2RiwwQkFBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztBQUVsRCxRQUFBLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFFN0IsMEJBQTBCO0FBQzFCLFdBQUcsQ0FBQyxHQUFHLENBQUMsb0JBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEMsV0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRWhCLHNCQUFzQjtBQUN0QixXQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDMUQsTUFBTSxJQUFJLEdBQUcsU0FBTSxFQUFFLENBQUM7SUFDckIsR0FBa0MsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQzlDLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BDLElBQUksRUFBRSxDQUFDO0FBQ1QsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLGVBQWUsR0FBRyxlQUFNLENBQUMsbUJBQW1CLENBQUMsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztBQUM3RSxXQUFHLENBQUMsR0FBRyxDQUNMLG1CQUFtQixDQUFDO0lBQ2xCLEdBQUcsZUFBZTtJQUNsQixRQUFRLENBQUMsR0FBWTtRQUNuQixPQUFRLEdBQWlDLENBQUMsRUFBRSxDQUFDO0lBQy9DLENBQUM7Q0FDRixDQUFDLENBQ0gsQ0FBQztBQUNGLFdBQUcsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7QUFFMUQsV0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsNEJBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQWEsRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUN2RSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsNEJBQVMsQ0FBQyxZQUFZLENBQUMsd0RBQWEsZ0JBQWdCLEdBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUUsQ0FBQyxDQUFDLENBQUM7QUFFSCx1QkFBYyxDQUFDLFdBQUcsQ0FBQyxDQUFDO0FBRXBCLHNCQUFzQjtBQUN0QixXQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsWUFBWSxDQUMzQixHQUFZLEVBQ1osQ0FBVSxFQUNWLEdBQWEsRUFDYixJQUFrQjtJQUVsQixJQUFJLEdBQUcsWUFBWSx5Q0FBbUIsRUFBRTtRQUN0QyxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7S0FDNUM7U0FBTSxJQUFJLEdBQUcsWUFBWSxvQkFBYSxFQUFFO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUM7S0FDekU7U0FBTSxJQUFJLEdBQUcsWUFBWSxLQUFLLEVBQUU7UUFDL0IsT0FBTyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQztLQUN4RDtJQUVELFNBQVMsSUFBSSxDQUFvQyxJQUFZLEVBQUUsSUFBTztRQUNwRSxNQUFNLFNBQVMsR0FBNkMsRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDO1FBQ3hFLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUFFO1lBQ3pDLElBQUksR0FBRyxZQUFZLEtBQUssRUFBRTtnQkFDeEIsU0FBUyxDQUFDLE1BQU0sR0FBRztvQkFDakIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO29CQUNwQixLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7aUJBQ2pCLENBQUM7YUFDSDtpQkFBTTtnQkFDTCxTQUFTLENBQUMsTUFBTSxHQUFHO29CQUNqQixPQUFPLEVBQUUsY0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7aUJBQzNCLENBQUM7YUFDSDtTQUNGO1FBQ0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQUksRUFBRSxDQUFDO0FBQ1QsQ0FBQyxDQUFDLENBQUMifQ==