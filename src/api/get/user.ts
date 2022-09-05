import { Request, Response } from 'express';

import { adaptRequest } from '@adapters/http/express';
import { getUser } from '@use-cases/auth';

/**
 * @openapi
 * /user:
 *   get:
 *    summary: Gets the current user details
 *    tags: [auth]
 *    security:
 *      - cookieAuth: []
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    responses:
 *      200:
 *        description: Returns the list of attendances in the event
 *      401:
 *        description: User is not authenticated
 */
const endpoint = async (req: Request, res: Response) => {
  const areq = adaptRequest(req);
  const ares = await getUser(areq);
  return res.status(ares.getStatus())
    .send(ares.getBody());
};


export default endpoint;
