import { Request, Response } from 'express';

import adaptRequest from '@adapters/http/express';
import { logoutAuth } from 'use-cases/auth';

/**
 * @openapi
 * /auth/logout:
 *  post:
 *    summary: User logout. User must be authenticated
 *    tags: [auth]
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: User logged in
 *      401:
 *        description: User not authenticated
 *      500:
 *        description: Server Error 
 */
const endpoint = async (req: Request, res: Response) => {
  const areq = adaptRequest(req);
  const ares = await logoutAuth(areq);
  return res.status(ares.getStatus())
    .send(ares.getBody());
};

export default endpoint;
