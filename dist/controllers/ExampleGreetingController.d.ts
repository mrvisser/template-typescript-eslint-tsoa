import { Request as Req } from 'express';
import { ExampleResponse } from '../domain/ExampleResponse';
export declare class ExampleGreetingController {
    private readonly logger;
    private readonly exampleGreetingService;
    greeting(req: Req, who: string): Promise<ExampleResponse>;
}
