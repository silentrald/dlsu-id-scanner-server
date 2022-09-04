import { Request, Response } from 'express';

import adaptRequest from '@adapters/http/express';
import { loginTempAuth } from 'use-cases/auth';

/**
 * @openapi
 * /auth/login-temp:
 *  post:
 *    summary: Temp User login
 *    tags: [auth]
 *    consumes:
 *      - application/json
 *    requestBody:
 *      description: User credentials
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                description: Username
 *                type: string
 *                minimum: 8
 *                maximum: 50
 *                default: username
 *              password:
 *                description: Password
 *                type: string
 *                minimum: 8
 *                maximum: 50
 *                default: password
 *    responses:
 *      200:
 *        description: Tmpe User logged in
 *      401:
 *        description: Auth failed
 *      403:
 *        description: User already logged in
 *      500:
 *        description: Server Error
 */
const endpoint = async (req: Request, res: Response) => {
  const areq = adaptRequest(req);
  const ares = await loginTempAuth(areq);
  return res.status(ares.getStatus())
    .send(ares.getBody());
};

export default endpoint;

