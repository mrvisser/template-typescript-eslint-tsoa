import { Request as Req } from 'express';
import { Get, Query, Request, Route, Security, SuccessResponse } from 'tsoa';
import { Inject } from 'typescript-ioc';

import { ensureAuthenticated } from '../authn/Authenticator';
import { ExampleResponse } from '../domain/ExampleResponse';
import { ExampleGreetingService } from '../service/ExampleGreetingService';
import { Logger } from '../service/Logger';

@Route('greeting')
export class ExampleGreetingController {
  constructor(
    @Inject
    private readonly logger: Logger,
    @Inject
    private readonly exampleGreetingService: ExampleGreetingService,
  ) {}

  @Get()
  @Security('example')
  @SuccessResponse('200')
  public async greeting(
    @Request() req: Req,
    @Query('who') who: string,
  ): Promise<ExampleResponse> {
    const user = await ensureAuthenticated(req);
    const result = this.exampleGreetingService.greet(user, who);
    this.logger.info('Greeted a person', { from: user, who });
    return { result };
  }
}
