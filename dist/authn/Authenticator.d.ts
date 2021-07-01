import { Request } from 'express';
export declare function expressAuthentication(request: Request, securityName: string, _scopes?: string[]): Promise<string>;
export declare function ensureAuthenticated(req: Request & {
    user?: string;
}): Promise<string>;
