import { Request, Response } from 'express';

import { adaptRequest } from '@adapters/http/express';
import { getAttendances } from '@use-cases/attendances';

/**
 * @openapi
 * /attendances/{eventId}:
 *   get:
 *    summary: Creates a event
 *    tags: [attendances]
 *    security:
 *      - cookieAuth: []
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: eventId
 *        schema:
 *          type: string
 *          format: uuid
 *        required: true
 *        description: Event Id
 *    responses:
 *      200:
 *        description: Returns the list of attendances in the event
 *      401:
 *        description: User is not authenticated
 *      500:
 *        description: Server Error
 */
const endpoint = async (req: Request, res: Response) => {
  const areq = adaptRequest(req);
  const ares = await getAttendances(areq);
  return res.status(ares.getStatus())
    .send(ares.getBody());
};


export default endpoint;
