import { Request, Response } from 'express';

import { adaptRequest } from '@adapters/http/express';
import { addEvent } from '@use-cases/events';

/**
 * @openapi
 * /event:
 *   post:
 *    summary: Creates a event
 *    tags: [events]
 *    security:
 *      - cookieAuth: []
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    requestBody:
 *      description: Student info
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                description: Name of the event
 *                type: string
 *                minLength: 1
 *                maxLength: 100
 *              max:
 *                description: Id hex in the RFC tag, 8 hex converted to int
 *                type: number
 *                minimum: 0
 *              timeStart:
 *                description: Starting time of the event
 *                type: string
 *                format: date-time
 *              timeEnd:
 *                description: Ending time of the event
 *                type: string
 *                format: date-time
 *    responses:
 *      201:
 *        description: User created and returns the id of the user
 *      401:
 *        description: User is not authenticated
 *      500:
 *        description: Server Error
 */
const endpoint = async (req: Request, res: Response) => {
  const areq = adaptRequest(req);
  const ares = await addEvent(areq);
  return res.status(ares.getStatus())
    .send(ares.getBody());
};


export default endpoint;
