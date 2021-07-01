"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const ExampleGreetingController_1 = require("./../controllers/ExampleGreetingController");
const Authenticator_1 = require("./../authn/Authenticator");
const ioc_1 = require("./ioc");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "ExampleResponse": {
        "dataType": "refObject",
        "properties": {
            "result": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new runtime_1.ValidationService(models);
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.get('/api/v1/greeting', authenticateMiddleware([{ "example": [] }]), function ExampleGreetingController_greeting(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            who: { "in": "query", "name": "who", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
        const controller = container.get(ExampleGreetingController_1.ExampleGreetingController);
        if (typeof controller['setStatus'] === 'function') {
            controller.setStatus(undefined);
        }
        const promise = controller.greeting.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function authenticateMiddleware(security = []) {
        return function runAuthenticationMiddleware(request, _response, next) {
            let responded = 0;
            let success = false;
            const succeed = function (user) {
                if (!success) {
                    success = true;
                    responded++;
                    request['user'] = user;
                    next();
                }
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            const fail = function (error) {
                responded++;
                if (responded == security.length && !success) {
                    error.status = error.status || 401;
                    next(error);
                }
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    let promises = [];
                    for (const name in secMethod) {
                        promises.push(Authenticator_1.expressAuthentication(request, name, secMethod[name]));
                    }
                    Promise.all(promises)
                        .then((users) => { succeed(users[0]); })
                        .catch(fail);
                }
                else {
                    for (const name in secMethod) {
                        Authenticator_1.expressAuthentication(request, name, secMethod[name])
                            .then(succeed)
                            .catch(fail);
                    }
                }
            }
        };
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, response, successStatus, next) {
        return Promise.resolve(promise)
            .then((data) => {
            let statusCode = successStatus;
            let headers;
            if (isController(controllerObj)) {
                headers = controllerObj.getHeaders();
                statusCode = controllerObj.getStatus() || statusCode;
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            returnHandler(response, statusCode, data, headers);
        })
            .catch((error) => next(error));
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function returnHandler(response, statusCode, data, headers = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        }
        else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        }
        else {
            response.status(statusCode || 204).end();
        }
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function responder(response) {
        return function (status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    }
    ;
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function getValidatedArgs(args, request, response) {
        const fieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                case 'res':
                    return responder(response);
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new runtime_1.ValidateError(fieldErrors, '');
        }
        return values;
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
exports.RegisterRoutes = RegisterRoutes;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9CQUFvQjtBQUNwQixvQkFBb0I7QUFDcEIsb0pBQW9KO0FBQ3BKLDJDQUEwSTtBQUMxSSxvSkFBb0o7QUFDcEosMEZBQXVGO0FBQ3ZGLDREQUFpRTtBQUNqRSwrQkFBcUM7QUFJckMsb0pBQW9KO0FBRXBKLE1BQU0sTUFBTSxHQUFxQjtJQUM3QixpQkFBaUIsRUFBRTtRQUNmLFVBQVUsRUFBRSxXQUFXO1FBQ3ZCLFlBQVksRUFBRTtZQUNWLFFBQVEsRUFBRSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQztTQUNsRDtRQUNELHNCQUFzQixFQUFFLEtBQUs7S0FDaEM7SUFDRCxvSkFBb0o7Q0FDdkosQ0FBQztBQUNGLE1BQU0saUJBQWlCLEdBQUcsSUFBSSwyQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUV4RCxvSkFBb0o7QUFFcEosU0FBZ0IsY0FBYyxDQUFDLEdBQW1CO0lBQzlDLDhHQUE4RztJQUM5RyxtSUFBbUk7SUFDbkksMkhBQTJIO0lBQzNILDhHQUE4RztJQUMxRyxHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUN0QixzQkFBc0IsQ0FBQyxDQUFDLEVBQUMsU0FBUyxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsRUFDeEMsU0FBUyxrQ0FBa0MsQ0FBQyxPQUFZLEVBQUUsUUFBYSxFQUFFLElBQVM7UUFDbEYsTUFBTSxJQUFJLEdBQUc7WUFDTCxHQUFHLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDO1lBQ3RFLEdBQUcsRUFBRSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMs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