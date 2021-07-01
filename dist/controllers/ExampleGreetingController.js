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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleGreetingController = void 0;
const tsoa_1 = require("tsoa");
const typescript_ioc_1 = require("typescript-ioc");
const Authenticator_1 = require("../authn/Authenticator");
const ExampleGreetingService_1 = require("../service/ExampleGreetingService");
const Logger_1 = require("../service/Logger");
let ExampleGreetingController = class ExampleGreetingController {
    logger;
    exampleGreetingService;
    constructor(logger, exampleGreetingService) {
        this.logger = logger;
        this.exampleGreetingService = exampleGreetingService;
    }
    async greeting(req, who) {
        const user = await Authenticator_1.ensureAuthenticated(req);
        const result = this.exampleGreetingService.greet(user, who);
        this.logger.info('Greeted a person', { from: user, who });
        return { result };
    }
};
__decorate([
    tsoa_1.Get(),
    tsoa_1.Security('example'),
    tsoa_1.SuccessResponse('200'),
    __param(0, tsoa_1.Request()),
    __param(1, tsoa_1.Query('who')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ExampleGreetingController.prototype, "greeting", null);
ExampleGreetingController = __decorate([
    tsoa_1.Route('greeting'),
    __param(0, typescript_ioc_1.Inject),
    __param(1, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [Logger_1.Logger,
        ExampleGreetingService_1.ExampleGreetingService])
], ExampleGreetingController);
exports.ExampleGreetingController = ExampleGreetingController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhhbXBsZUdyZWV0aW5nQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9FeGFtcGxlR3JlZXRpbmdDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLCtCQUE2RTtBQUM3RSxtREFBd0M7QUFFeEMsMERBQTZEO0FBRTdELDhFQUEyRTtBQUMzRSw4Q0FBMkM7QUFHM0MsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBeUI7SUFHakI7SUFFQTtJQUpuQixZQUVtQixNQUFjLEVBRWQsc0JBQThDO1FBRjlDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFFZCwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO0lBQzlELENBQUM7SUFLRyxLQUFLLENBQUMsUUFBUSxDQUNSLEdBQVEsRUFDTCxHQUFXO1FBRXpCLE1BQU0sSUFBSSxHQUFHLE1BQU0sbUNBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ3BCLENBQUM7Q0FDRixDQUFBO0FBVEM7SUFIQyxVQUFHLEVBQUU7SUFDTCxlQUFRLENBQUMsU0FBUyxDQUFDO0lBQ25CLHNCQUFlLENBQUMsS0FBSyxDQUFDO0lBRXBCLFdBQUEsY0FBTyxFQUFFLENBQUE7SUFDVCxXQUFBLFlBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTs7Ozt5REFNZDtBQW5CVSx5QkFBeUI7SUFEckMsWUFBSyxDQUFDLFVBQVUsQ0FBQztJQUdiLFdBQUEsdUJBQU0sQ0FBQTtJQUVOLFdBQUEsdUJBQU0sQ0FBQTtxQ0FEa0IsZUFBTTtRQUVVLCtDQUFzQjtHQUx0RCx5QkFBeUIsQ0FvQnJDO0FBcEJZLDhEQUF5QiJ9