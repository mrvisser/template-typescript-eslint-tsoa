import { Request } from 'express';

import { AuthenticationError } from '../domain/errors/AuthenticationError';

export async function expressAuthentication(
  request: Request,
  securityName: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _scopes?: string[],
): Promise<string> {
  if (securityName === 'example') {
    const username = request.headers['x-sample-username'] as string | undefined;
    if (username === undefined) {
      throw new AuthenticationError('Must specify username');
    } else {
      return username;
    }
  } else {
    throw new AuthenticationError('Unsupported authentication scheme');
  }
}

export async function ensureAuthenticated(
  req: Request & { user?: string },
): Promise<string> {
  const { user } = req;
  if (typeof user !== 'string' || user.trim() === '') {
    throw new AuthenticationError();
  } else {
    return user;
  }
}
