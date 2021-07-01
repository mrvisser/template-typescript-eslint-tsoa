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
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "ExampleResponse": {
        "dataType": "refObject",
        "properties": {
            "result": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
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
        const controller = new ExampleGreetingController_1.ExampleGreetingController();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9CQUFvQjtBQUNwQixvQkFBb0I7QUFDcEIsb0pBQW9KO0FBQ3BKLDJDQUEwSTtBQUMxSSxvSkFBb0o7QUFDcEosMEZBQXVGO0FBQ3ZGLDREQUFpRTtBQUdqRSxvSkFBb0o7QUFFcEosTUFBTSxNQUFNLEdBQXFCO0lBQzdCLGlCQUFpQixFQUFFO1FBQ2YsVUFBVSxFQUFFLFdBQVc7UUFDdkIsWUFBWSxFQUFFO1lBQ1YsUUFBUSxFQUFFLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDO1NBQ2xEO1FBQ0Qsc0JBQXNCLEVBQUUsS0FBSztLQUNoQztDQUVKLENBQUM7QUFDRixNQUFNLGlCQUFpQixHQUFHLElBQUksMkJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFeEQsb0pBQW9KO0FBRXBKLFNBQWdCLGNBQWMsQ0FBQyxHQUFtQjtJQUM5Qyw4R0FBOEc7SUFDOUcsbUlBQW1JO0lBQ25JLDJIQUEySDtJQUMzSCw4R0FBOEc7SUFDMUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFDdEIsc0JBQXNCLENBQUMsQ0FBQyxFQUFDLFNBQVMsRUFBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEVBQ3hDLFNBQVMsa0NBQWtDLENBQUMsT0FBWSxFQUFFLFFBQWEsRUFBRSxJQUFTO1FBQ2xGLE1BQU0sSUFBSSxHQUFHO1lBQ0wsR0FBRyxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQztZQUN0RSxHQUFHLEVBQUUsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDO1NBQzNFLENBQUM7UUFFRixvSkFBb0o7UUFFcEosSUFBSSxhQUFhLEdBQVUsRUFBRSxDQUFDO1FBQzlCLElBQUk7WUFDQSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM3RDtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEI7UUFFRCxNQUFNLFVBQVUsR0FBRyxJQUFJLHFEQUF5QixFQUFFLENBQUM7UUFHbkQsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLGFBQW9CLENBQUMsQ0FBQztRQUM1RSxjQUFjLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25FLENBQUMsQ0FBQyxDQUFDO0lBQ0gsb0pBQW9KO0lBRXhKLG9KQUFvSjtJQUVwSixTQUFTLHNCQUFzQixDQUFDLFdBQWlDLEVBQUU7UUFDL0QsT0FBTyxTQUFTLDJCQUEyQixDQUFDLE9BQVksRUFBRSxTQUFjLEVBQUUsSUFBUztZQUMvRSxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDbEIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBRXBCLE1BQU0sT0FBTyxHQUFHLFVBQVMsSUFBUztnQkFDOUIsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDVixPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUNmLFNBQVMsRUFBRSxDQUFDO29CQUNaLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7b0JBQ3ZCLElBQUksRUFBRSxDQUFDO2lCQUNWO1lBQ0wsQ0FBQyxDQUFBO1lBRUQsb0pBQW9KO1lBRXBKLE1BQU0sSUFBSSxHQUFHLFVBQVMsS0FBVTtnQkFDNUIsU0FBUyxFQUFFLENBQUM7Z0JBQ1osSUFBSSxTQUFTLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDMUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2lCQUNkO1lBQ0wsQ0FBQyxDQUFBO1lBRUQsb0pBQW9KO1lBRXBKLEtBQUssTUFBTSxTQUFTLElBQUksUUFBUSxFQUFFO2dCQUM5QixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDbkMsSUFBSSxRQUFRLEdBQW1CLEVBQUUsQ0FBQztvQkFFbEMsS0FBSyxNQUFNLElBQUksSUFBSSxTQUFTLEVBQUU7d0JBQzFCLFFBQVEsQ0FBQyxJQUFJLENBQUMscUNBQXFCLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUN4RTtvQkFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQzt5QkFDaEIsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ3ZDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDcEI7cUJBQU07b0JBQ0gsS0FBSyxNQUFNLElBQUksSUFBSSxTQUFTLEVBQUU7d0JBQzFCLHFDQUFxQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDOzZCQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDOzZCQUNiLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDcEI7aUJBQ0o7YUFDSjtRQUNMLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFFRCxvSkFBb0o7SUFFcEosU0FBUyxZQUFZLENBQUMsTUFBVztRQUM3QixPQUFPLFlBQVksSUFBSSxNQUFNLElBQUksV0FBVyxJQUFJLE1BQU0sSUFBSSxXQUFXLElBQUksTUFBTSxDQUFDO0lBQ3BGLENBQUM7SUFFRCxTQUFTLGNBQWMsQ0FBQyxhQUFrQixFQUFFLE9BQVksRUFBRSxRQUFhLEVBQUUsYUFBa0IsRUFBRSxJQUFTO1FBQ2xHLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7YUFDMUIsSUFBSSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7WUFDaEIsSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUFDO1lBQy9CLElBQUksT0FBTyxDQUFDO1lBQ1osSUFBSSxZQUFZLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQzdCLE9BQU8sR0FBRyxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3JDLFVBQVUsR0FBRyxhQUFhLENBQUMsU0FBUyxFQUFFLElBQUksVUFBVSxDQUFDO2FBQ3hEO1lBRUQsb0pBQW9KO1lBRXBKLGFBQWEsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUN0RCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxvSkFBb0o7SUFFcEosU0FBUyxhQUFhLENBQUMsUUFBYSxFQUFFLFVBQW1CLEVBQUUsSUFBVSxFQUFFLFVBQWUsRUFBRTtRQUNwRixJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDdEIsT0FBTztTQUNWO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRTtZQUMxQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssVUFBVSxFQUFFO1lBQzlGLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkI7YUFBTSxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUM1QyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakQ7YUFBTTtZQUNILFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQzVDO0lBQ0wsQ0FBQztJQUVELG9KQUFvSjtJQUVwSixTQUFTLFNBQVMsQ0FBQyxRQUFhO1FBQzVCLE9BQU8sVUFBUyxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU87WUFDakMsYUFBYSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQztJQUNOLENBQUM7SUFBQSxDQUFDO0lBRUYsb0pBQW9KO0lBRXBKLFNBQVMsZ0JBQWdCLENBQUMsSUFBUyxFQUFFLE9BQVksRUFBRSxRQUFhO1FBQzVELE1BQU0sV0FBVyxHQUFpQixFQUFFLENBQUM7UUFDckMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN6QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzVCLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDbEIsS0FBSyxTQUFTO29CQUNWLE9BQU8sT0FBTyxDQUFDO2dCQUNuQixLQUFLLE9BQU87b0JBQ1IsT0FBTyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsRUFBQyxnQ0FBZ0MsRUFBQyxpQkFBaUIsRUFBQyxDQUFDLENBQUM7Z0JBQy9KLEtBQUssTUFBTTtvQkFDUCxPQUFPLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxFQUFDLGdDQUFnQyxFQUFDLGlCQUFpQixFQUFDLENBQUMsQ0FBQztnQkFDaEssS0FBSyxRQUFRO29CQUNULE9BQU8saUJBQWlCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLEVBQUMsZ0NBQWdDLEVBQUMsaUJBQWlCLEVBQUMsQ0FBQyxDQUFDO2dCQUNoSyxLQUFLLE1BQU07b0JBQ1AsT0FBTyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsRUFBQyxnQ0FBZ0MsRUFBQyxpQkFBaUIsRUFBQyxDQUFDLENBQUM7Z0JBQ3hKLEtBQUssV0FBVztvQkFDWixPQUFPLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxFQUFDLGdDQUFnQyxFQUFDLGlCQUFpQixFQUFDLENBQUMsQ0FBQztnQkFDNUosS0FBSyxVQUFVO29CQUNYLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7d0JBQy9CLE9BQU8saUJBQWlCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLEVBQUMsZ0NBQWdDLEVBQUMsaUJBQWlCLEVBQUMsQ0FBQyxDQUFDO3FCQUN2Sjt5QkFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEtBQUssT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTt3QkFDOUUsT0FBTyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsRUFBQyxnQ0FBZ0MsRUFBQyxpQkFBaUIsRUFBQyxDQUFDLENBQUM7cUJBQ3hKO3lCQUFNO3dCQUNILE9BQU8saUJBQWlCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLEVBQUMsZ0NBQWdDLEVBQUMsaUJBQWlCLEVBQUMsQ0FBQyxDQUFDO3FCQUM3SjtnQkFDTCxLQUFLLEtBQUs7b0JBQ04sT0FBTyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbEM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3JDLE1BQU0sSUFBSSx1QkFBYSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxvSkFBb0o7QUFDeEosQ0FBQztBQXhLRCx3Q0F3S0M7QUFFRCxvSkFBb0oifQ==