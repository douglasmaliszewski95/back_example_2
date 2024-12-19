import { RequestHandler } from 'express';
import { CREATED, OK } from 'http-status';
import { AbstractReimbursementService } from '@application/services/reimbursement/abstract-reimbursement.service';
import { SortDir } from '@application/types/SortDir';
import { PaginationDto } from '@domain/dto/shared/paginationDto';
import { ListReimbursementByUserDto } from '@domain/dto/reimbursement/list-reimbursement-dto';
import { CreateReimbursementDTO } from '@domain/dto/reimbursement/create-reimbursement-dto';
import { ApproveReimbursementDto } from '@domain/dto/reimbursement/approve-reimbursement-dto';

export default class ReimbursementController {
  constructor(private reimbursementService: AbstractReimbursementService) {}

  /**
   * @openapi
   * /reimbursement:
   *   get:
   *     tags:
   *       - Reimbursements
   *     summary: Get a list of reimbursements
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
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
   *       - in: query
   *         name: sortDir
   *         schema:
   *           type: string
   *           enum: [asc, desc]
   *           default: asc
   *       - in: query
   *         name: startDate
   *         schema:
   *           type: string
   *           format: date-time
   *       - in: query
   *         name: endDate
   *         schema:
   *           type: string
   *           format: date-time
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
   *                     $ref: '#/components/schemas/Reimbursement'
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
    const { page, pageSize, status = '', sortDir = 'asc', startDate, endDate } = request.query;

    const reimbursements = await this.reimbursementService.list(
      parseInt(page as string),
      parseInt(pageSize as string),
      startDate as string,
      endDate as string,
      sortDir as SortDir,
      status as string,
    );
    return response.status(OK).json(reimbursements);
  };

  /**
   * @openapi
   * /reimbursement/user/{userId}:
   *   get:
   *     tags:
   *       - Reimbursements
   *     summary: Get a list of reimbursements by userId
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
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
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
   *       - in: query
   *         name: sortDir
   *         schema:
   *           type: string
   *           enum: [asc, desc]
   *           default: asc
   *       - in: query
   *         name: startDate
   *         schema:
   *           type: string
   *           format: date-time
   *       - in: query
   *         name: endDate
   *         schema:
   *           type: string
   *           format: date-time
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
   *                     $ref: '#/components/schemas/Reimbursement'
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
  public listByUser: RequestHandler = async (request, response) => {
    const { status = '', sortDir = 'asc', startDate, endDate } = request.query as unknown as ListReimbursementByUserDto;
    const { page, pageSize } = request.query as unknown as PaginationDto;
    const { userId } = request.params;

    const reimbursements = await this.reimbursementService.listByUser(
      { userId, startDate, endDate, sortDir, status },
      { page, pageSize },
    );
    return response.status(OK).json(reimbursements);
  };

  /**
   * @openapi
   * /reimbursement/{reimbursementId}:
   *   get:
   *     tags:
   *       - Reimbursements
   *     summary: Get a reimbursement by id
   *     parameters:
   *       - in: path
   *         name: reimbursementId
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
   *               $ref: '#/components/schemas/Reimbursement'
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
  public show: RequestHandler = async (request, response) => {
    const { reimbursementId } = request.params;
    const reimbursement = await this.reimbursementService.show(reimbursementId);
    return response.status(OK).json(reimbursement);
  };

  /**
   * @openapi
   * /reimbursement:
   *   post:
   *     tags:
   *       - Reimbursements
   *     summary: Create a reimbursement
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateReimbursementDTO'
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Reimbursement'
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
  public createReimbursement: RequestHandler = async (request, response) => {
    const reimbursementDto: CreateReimbursementDTO = request.body;
    const createdReimbursement = await this.reimbursementService.createReimbursement(reimbursementDto);
    return response.status(CREATED).json(createdReimbursement);
  };

  /**
   * @openapi
   * /reimbursement/approve:
   *   post:
   *     tags:
   *       - Reimbursements
   *     summary: Approve a reimbursement
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ApproveReimbursementDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Reimbursement'
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
  public approve: RequestHandler = async (request, response) => {
    const approveReimbursementDto: ApproveReimbursementDto = request.body;
    const approvedReimbursement = await this.reimbursementService.approve(approveReimbursementDto);
    return response.status(OK).json(approvedReimbursement);
  };

  /**
   * @openapi
   * /reimbursement/addEvidences/{reimbursementId}:
   *   post:
   *     tags:
   *       - Reimbursements
   *     summary: Add evidences to a reimbursement
   *     parameters:
   *       - in: path
   *         name: reimbursementId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               files:
   *                 type: array
   *                 items:
   *                   type: string
   *                   format: binary
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Reimbursement'
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
  public addReimbursementEvidences: RequestHandler = async (request, response) => {
    if (!request.files) {
      throw new Error('File not provided in the request.');
    }

    const { reimbursementId } = request.params;

    const files = request.files as Express.Multer.File[];

    const filesMapped = files.map((file) => ({
      file: file.buffer,
      fileName: file.originalname,
    }));

    const reimbursement = await this.reimbursementService.addEvidences(reimbursementId, filesMapped);
    return response.status(OK).json(reimbursement);
  };
}
