"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = exports.expressAuthentication = void 0;
const AuthenticationError_1 = require("../domain/errors/AuthenticationError");
async function expressAuthentication(request, securityName, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_scopes) {
    if (securityName === 'example') {
        const username = request.headers['x-sample-username'];
        if (username === undefined) {
            throw new AuthenticationError_1.AuthenticationError('Must specify username');
        }
        else {
            return username;
        }
    }
    else {
        throw new AuthenticationError_1.AuthenticationError('Unsupported authentication scheme');
    }
}
exports.expressAuthentication = expressAuthentication;
async function ensureAuthenticated(req) {
    const { user } = req;
    if (typeof user !== 'string' || user.trim() === '') {
        throw new AuthenticationError_1.AuthenticationError();
    }
    else {
        return user;
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRobi9BdXRoZW50aWNhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDhFQUEyRTtBQUVwRSxLQUFLLFVBQVUscUJBQXFCLENBQ3pDLE9BQWdCLEVBQ2hCLFlBQW9CO0FBQ3BCLDZEQUE2RDtBQUM3RCxPQUFrQjtJQUVsQixJQUFJLFlBQVksS0FBSyxTQUFTLEVBQUU7UUFDOUIsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBdUIsQ0FBQztRQUM1RSxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDMUIsTUFBTSxJQUFJLHlDQUFtQixDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDeEQ7YUFBTTtZQUNMLE9BQU8sUUFBUSxDQUFDO1NBQ2pCO0tBQ0Y7U0FBTTtRQUNMLE1BQU0sSUFBSSx5Q0FBbUIsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0tBQ3BFO0FBQ0gsQ0FBQztBQWhCRCxzREFnQkM7QUFFTSxLQUFLLFVBQVUsbUJBQW1CLENBQ3ZDLEdBQWdDO0lBRWhDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDckIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNsRCxNQUFNLElBQUkseUNBQW1CLEVBQUUsQ0FBQztLQUNqQztTQUFNO1FBQ0wsT0FBTyxJQUFJLENBQUM7S0FDYjtBQUNILENBQUM7QUFURCxrREFTQyJ9