import { Request, Response } from 'express';

import { adaptRequest } from '@adapters/http/express';
import { addStudent } from '@use-cases/students';

/**
 * @openapi
 * /student:
 *   post:
 *    summary: Creates a student
 *    tags: [users]
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
 *              idNumber:
 *                description: Id number of the student (eg. 11800000)
 *                type: number
 *                minimum: 10000000
 *                maximum: 99999999
 *                default: 11800003
 *              idHex:
 *                description: Id hex in the RFC tag, 8 hex converted to int
 *                type: number
 *                minimum: 0x00000000
 *                maximum: 0xffffffff
 *                default: 0xffffffff
 *              fname:
 *                description: First name
 *                type: string
 *                minLength: 1
 *                maxLength: 50
 *                default: First
 *              lname:
 *                description: Last name
 *                type: string
 *                minLength: 1
 *                maxLength: 50
 *                default: Last
 *    responses:
 *      201:
 *        description: Student created and returns the id of the user
 *      401:
 *        description: Student is not authenticated
 *      500:
 *        description: Server Error
 */
const endpoint = async (req: Request, res: Response) => {
  const areq = adaptRequest(req);
  const ares = await addStudent(areq);
  return res.status(ares.getStatus())
    .send(ares.getBody());
};


export default endpoint;
