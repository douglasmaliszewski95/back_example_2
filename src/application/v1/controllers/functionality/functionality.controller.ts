import { RequestHandler } from 'express';
import { NO_CONTENT, OK } from 'http-status';
import { AbstractFunctionalityService } from '@application/services/functionality/abstract-functionality.service';
import { CreateFunctionalityDTO } from '@domain/dto/functionality/create-functionality-dto';
import { UpdateFunctionalityDTO } from '@domain/dto/functionality/update-functionality-dto';

export default class FunctionalityController {
  constructor(private functionalityService: AbstractFunctionalityService) {}

  /**
   * @openapi
   * /functionalities:
   *   get:
   *     tags:
   *       - Functionalities
   *     summary: Get a list of functionalities
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Functionality'
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
  public list: RequestHandler = async (_request, response) => {
    const functionalities = await this.functionalityService.list();
    return response.status(OK).json(functionalities);
  };

  /**
   * @openapi
   * /functionalities/{functionalityId}:
   *   get:
   *     tags:
   *       - Functionalities
   *     summary: Get a functionality by id
   *     parameters:
   *       - in: path
   *         name: functionalityId
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
   *               $ref: '#/components/schemas/Functionality'
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
  public findById: RequestHandler = async (request, response) => {
    const { functionalityId } = request.params;
    const functionality = await this.functionalityService.findById(functionalityId);
    return response.status(OK).json(functionality);
  };

  /**
   * @openapi
   * /functionalities:
   *   post:
   *     tags:
   *       - Functionalities
   *     summary: Create a functionality
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateFunctionalityDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Functionality'
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
  public createFunctionality: RequestHandler = async (request, response) => {
    const functionalityDTO: CreateFunctionalityDTO = request.body;
    const createdFunctionality = await this.functionalityService.createFunctionality(functionalityDTO);
    return response.status(OK).json(createdFunctionality);
  };

  /**
   * @openapi
   * /functionalities/{functionalityId}:
   *   put:
   *     tags:
   *       - Functionalities
   *     summary: Update a functionality
   *     parameters:
   *       - in: path
   *         name: functionalityId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateFunctionalityDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Functionality'
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
  public updateFunctionality: RequestHandler = async (request, response) => {
    const functionalityDTO: UpdateFunctionalityDTO = request.body;
    const { functionalityId } = request.params;
    const updatedFunctionality = await this.functionalityService.updateFunctionality(functionalityId, functionalityDTO);
    return response.status(OK).json(updatedFunctionality);
  };

  /**
   * @openapi
   * /functionalities/{functionalityId}:
   *   delete:
   *     tags:
   *       - Functionalities
   *     summary: Delete a functionality
   *     parameters:
   *       - in: path
   *         name: functionalityId
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
  public delete: RequestHandler = async (request, response) => {
    const { functionalityId } = request.params;
    await this.functionalityService.delete(functionalityId);
    return response.status(NO_CONTENT).json();
  };
}
