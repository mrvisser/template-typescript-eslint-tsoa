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
    async greeting(req, who) {
        const user = await Authenticator_1.ensureAuthenticated(req);
        const result = this.exampleGreetingService.greet(user, who);
        this.logger.info('Greeted a person', { from: user, who });
        return { result };
    }
};
__decorate([
    typescript_ioc_1.Inject,
    __metadata("design:type", Logger_1.Logger)
], ExampleGreetingController.prototype, "logger", void 0);
__decorate([
    typescript_ioc_1.Inject,
    __metadata("design:type", ExampleGreetingService_1.ExampleGreetingService)
], ExampleGreetingController.prototype, "exampleGreetingService", void 0);
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
    tsoa_1.Route('greeting')
], ExampleGreetingController);
exports.ExampleGreetingController = ExampleGreetingController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhhbXBsZUdyZWV0aW5nQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9FeGFtcGxlR3JlZXRpbmdDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLCtCQUE2RTtBQUM3RSxtREFBd0M7QUFFeEMsMERBQTZEO0FBRTdELDhFQUEyRTtBQUMzRSw4Q0FBMkM7QUFHM0MsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBeUI7SUFTN0IsS0FBSyxDQUFDLFFBQVEsQ0FDUixHQUFRLEVBQ0wsR0FBVztRQUV6QixNQUFNLElBQUksR0FBRyxNQUFNLG1DQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUNwQixDQUFDO0NBQ0YsQ0FBQTtBQWhCQztJQURDLHVCQUFNOzhCQUNtQixlQUFNO3lEQUFDO0FBRWpDO0lBREMsdUJBQU07OEJBQ21DLCtDQUFzQjt5RUFBQztBQUtqRTtJQUhDLFVBQUcsRUFBRTtJQUNMLGVBQVEsQ0FBQyxTQUFTLENBQUM7SUFDbkIsc0JBQWUsQ0FBQyxLQUFLLENBQUM7SUFFcEIsV0FBQSxjQUFPLEVBQUUsQ0FBQTtJQUNULFdBQUEsWUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFBOzs7O3lEQU1kO0FBakJVLHlCQUF5QjtJQURyQyxZQUFLLENBQUMsVUFBVSxDQUFDO0dBQ0wseUJBQXlCLENBa0JyQztBQWxCWSw4REFBeUIifQ==