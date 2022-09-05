import { Request, Response } from 'express';

import { adaptRequest } from '@adapters/http/express';
import { addAttendance } from '@use-cases/attendances';

/**
 * @openapi
 * /attendance/tap-in:
 *   post:
 *    summary: Creates an attendance
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
 *      201:
 *        description: Attendance Created
 *      401:
 *        description: User is not authenticated
 *      403:
 *        description: User is not a temporary
 *      500:
 *        description: Server Error
 */
const endpoint = async (req: Request, res: Response) => {
  const areq = adaptRequest(req);
  const ares = await addAttendance(areq);
  return res.status(ares.getStatus())
    .send(ares.getBody());
};


export default endpoint;
