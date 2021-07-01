"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleGreetingService = void 0;
const typescript_ioc_1 = require("typescript-ioc");
let ExampleGreetingService = class ExampleGreetingService {
    greet(from, to) {
        return `${from} says hello to ${to}!`;
    }
};
ExampleGreetingService = __decorate([
    typescript_ioc_1.Singleton
], ExampleGreetingService);
exports.ExampleGreetingService = ExampleGreetingService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhhbXBsZUdyZWV0aW5nU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL0V4YW1wbGVHcmVldGluZ1NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbURBQTJDO0FBRzNDLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXNCO0lBQzFCLEtBQUssQ0FBQyxJQUFZLEVBQUUsRUFBVTtRQUNuQyxPQUFPLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxHQUFHLENBQUM7SUFDeEMsQ0FBQztDQUNGLENBQUE7QUFKWSxzQkFBc0I7SUFEbEMsMEJBQVM7R0FDRyxzQkFBc0IsQ0FJbEM7QUFKWSx3REFBc0IifQ==