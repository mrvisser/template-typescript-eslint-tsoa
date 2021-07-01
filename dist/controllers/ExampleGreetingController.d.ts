import { Request as Req } from 'express';
import { ExampleResponse } from '../domain/ExampleResponse';
import { ExampleGreetingService } from '../service/ExampleGreetingService';
import { Logger } from '../service/Logger';
export declare class ExampleGreetingController {
    private readonly logger;
    private readonly exampleGreetingService;
    constructor(logger: Logger, exampleGreetingService: ExampleGreetingService);
    greeting(req: Req, who: string): Promise<ExampleResponse>;
}
