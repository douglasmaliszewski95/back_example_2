import { RequestHandler } from 'express';
import { NO_CONTENT, OK } from 'http-status';
// eslint-disable-next-line max-len
import { AbstractReimbursementRuleService } from '@application/services/reimbursementRule/abstract-reimbursementRule.service';
import { CreateReimbursementRuleDTO } from '@domain/dto/reimbursement/create-reimbursementRules-dto';
import { UpdateReimbursementRuleDTO } from '@domain/dto/reimbursement/update-reimbursementRules-dto';

export default class ReimbursementRuleController {
  constructor(private reimbursementRuleService: AbstractReimbursementRuleService) {}

  /**
   * @openapi
   * /reimbursementRules:
   *   get:
   *     tags:
   *       - ReimbursementRules
   *     summary: Get a list of reimbursement rules
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: number
   *           default: 1
   *       - in: query
   *         name: pageSize
   *         schema:
   *           type: number
   *           default: 15
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/ReimbursementRule'
   *                 totalItems:
   *                   type: number
   *                   default: 1
   *                 totalPages:
   *                   type: number
   *                   default: 1
   *                 currentPage:
   *                   type: number
   *                   default: 1
   *                 pageSize:
   *                   type: number
   *                   default: 15
   *                 maxLimit:
   *                   type: number
   *                   default: 50
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundResponse'
   *       422:
   *         description: Unprocessable Entity
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  public list: RequestHandler = async (request, response) => {
    const page: number = parseInt(request.query.page as string);
    const pageSize: number = parseInt(request.query.pageSize as string);
    const reimbursementRules = await this.reimbursementRuleService.list(page, pageSize);
    return response.status(OK).json(reimbursementRules);
  };

  /**
   * @openapi
   * /reimbursementRules/{reimbursementRuleId}:
   *   get:
   *     tags:
   *       - ReimbursementRules
   *     summary: Get a reimbursement rule by id
   *     parameters:
   *       - in: path
   *         name: reimbursementRuleId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ReimbursementRule'
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundResponse'
   *       422:
   *         description: Unprocessable Entity
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  public listById: RequestHandler = async (request, response) => {
    const { reimbursementRuleId } = request.params;
    const reimbursementRule = await this.reimbursementRuleService.listById(reimbursementRuleId);
    return response.status(OK).json(reimbursementRule);
  };

  /**
   * @openapi
   * /reimbursementRules/byUser:
   *   post:
   *     tags:
   *       - ReimbursementRules
   *     summary: Get a reimbursement rule by userId
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              userId:
   *                type: string
   *                format: uuid
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/ReimbursementRule'
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundResponse'
   *       422:
   *         description: Unprocessable Entity
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  public listRulesByUserId: RequestHandler = async (request, response) => {
    const { userId } = request.body;
    const reimbursementRules = await this.reimbursementRuleService.listRulesByUserId(userId);
    return response.status(OK).json(reimbursementRules);
  };

  /**
   * @openapi
   * /reimbursementRules:
   *   post:
   *     tags:
   *       - ReimbursementRules
   *     summary: Create a reimbursement rule
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateReimbursementRuleDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ReimbursementRule'
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundResponse'
   *       422:
   *         description: Unprocessable Entity
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  public createRule: RequestHandler = async (request, response) => {
    const reimbursementRuleDTO: CreateReimbursementRuleDTO = request.body;
    const { userId } = request.params;
    const createdRule = await this.reimbursementRuleService.createReimbursementRule(userId, reimbursementRuleDTO);
    return response.status(OK).json(createdRule);
  };

  /**
   * @openapi
   * /reimbursementRules/{reimbursementRuleId}:
   *   put:
   *     tags:
   *       - ReimbursementRules
   *     summary: Update a reimbursement rule
   *     parameters:
   *       - in: path
   *         name: reimbursementRuleId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateReimbursementRuleDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ReimbursementRule'
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundResponse'
   *       422:
   *         description: Unprocessable Entity
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  public updateRule: RequestHandler = async (request, response) => {
    const reimbursementRuleDTO: UpdateReimbursementRuleDTO = request.body;
    const { reimbursementRuleId } = request.params;
    const updatedRule = await this.reimbursementRuleService.updateReimbursementRule(
      reimbursementRuleId,
      reimbursementRuleDTO,
    );
    return response.status(OK).json(updatedRule);
  };

  /**
   * @openapi
   * /reimbursementRules/enable_disable/{reimbursementRuleId}:
   *   post:
   *     tags:
   *       - ReimbursementRules
   *     summary: Enable/Disable a reimbursement rule
   *     parameters:
   *       - in: path
   *         name: reimbursementRuleId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       204:
   *         description: No Content
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundResponse'
   *       422:
   *         description: Unprocessable Entity
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  public enableDisable: RequestHandler = async (request, response) => {
    const { reimbursementRuleId } = request.params;
    await this.reimbursementRuleService.enableDisable(reimbursementRuleId);
    return response.status(NO_CONTENT).json();
  };
}
