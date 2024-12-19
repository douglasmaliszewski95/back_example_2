import { RequestHandler } from 'express';
import { CREATED, NO_CONTENT, OK } from 'http-status';
import { AbstractProfileService } from '@application/services/profile/abstract-profile.service';
import { CreateProfileDTO } from '@domain/dto/profile/create-profile-dto';
import { UpdateProfileDTO } from '@domain/dto/profile/update-profile-dto';

export default class ProfileController {
  constructor(private profileService: AbstractProfileService) {}

  /**
   * @openapi
   * /profiles:
   *   get:
   *     tags:
   *       - Profiles
   *     summary: Get a list of profiles
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
   *                     $ref: '#/components/schemas/Profile'
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
    const profiles = await this.profileService.list(page, pageSize);
    return response.status(OK).json(profiles);
  };

  /**
   * @openapi
   * /profiles/{profileId}:
   *   get:
   *     tags:
   *       - Profiles
   *     summary: Get a profile by id
   *     parameters:
   *       - in: path
   *         name: profileId
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
   *               $ref: '#/components/schemas/Profile'
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
    const { profileId } = request.params;
    const profile = await this.profileService.show(profileId);
    return response.status(OK).json(profile);
  };

  /**
   * @openapi
   * /profiles:
   *   post:
   *     tags:
   *       - Profiles
   *     summary: Create a profile
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateProfileDTO'
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Profile'
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
  public createProfile: RequestHandler = async (request, response) => {
    const profileDTO: CreateProfileDTO = request.body;
    const createdProfile = await this.profileService.createProfile(profileDTO);
    return response.status(CREATED).json(createdProfile);
  };

  /**
   * @openapi
   * /profiles/{profileId}:
   *   put:
   *     tags:
   *       - Profiles
   *     summary: Update a profile
   *     parameters:
   *       - in: path
   *         name: profileId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateProfileDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Profile'
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
  public updateProfile: RequestHandler = async (request, response) => {
    const profileDto: UpdateProfileDTO = request.body;
    const { profileId } = request.params;
    const updatedProfile = await this.profileService.updateProfile(profileId, profileDto);
    return response.status(OK).json(updatedProfile);
  };

  /**
   * @openapi
   * /profiles/{profileId}:
   *   delete:
   *     tags:
   *       - Profiles
   *     summary: Delete a profile
   *     parameters:
   *       - in: path
   *         name: profileId
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
    const { profileId } = request.params;
    await this.profileService.delete(profileId);
    return response.status(NO_CONTENT).json();
  };
}
