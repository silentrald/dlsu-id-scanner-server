import { Request, Response } from 'express';

import { adaptRequest } from '@adapters/http/express';
import { updateAttendance } from '@use-cases/attendances';

/**
 * @openapi
 * /attendance/tap-out:
 *   post:
 *    summary: Adds a timeout to the attendance
 *    tags: [attendances]
 *    security:
 *      - cookieAuth: ['temporary']
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
 *              studentId:
 *                description: Student's RFID Hex value
 *                type: number
 *                minimum: 0x00000000
 *                maximum: 0xffffffff
 *                default: 0xffffffff
 *    responses:
 *      200:
 *        description: Updated the attendance
 *      401:
 *        description: User is not authenticated
 *      403:
 *        description: User is not a temporary
 *      500:
 *        description: Server Error
 */
const endpoint = async (req: Request, res: Response) => {
  const areq = adaptRequest(req);
  const ares = await updateAttendance(areq);
  return res.status(ares.getStatus())
    .send(ares.getBody());
};


export default endpoint;
