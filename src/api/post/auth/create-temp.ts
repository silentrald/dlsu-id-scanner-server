import { Request, Response } from 'express';

import adaptRequest from '@adapters/http/express';
import { createTempAuth } from 'use-cases/auth';

/**
 * @openapi
 * /auth/create-temp:
 *  post:
 *    summary: Creates a temporary user
 *    tags: [auth]
 *    security:
 *      - security: ['admin']
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
 *              eventId:
 *                description: Event id that is the user is assigned to
 *                type: string
 *                format: uuid
 *                default: 00000000-0000-0000-0000-000000000000
 *    responses:
 *      201:
 *        description: Temp user is created
 *      400:
 *        description: User already exists / Event does not exist
 *      401:
 *        description: User not authenticated
 *      403:
 *        description: User is not admin
 *      500:
 *        description: Server Error
 */
const endpoint = async (req: Request, res: Response) => {
  const areq = adaptRequest(req);
  const ares = await createTempAuth(areq);
  return res.status(ares.getStatus())
    .send(ares.getBody());
};

export default endpoint;

