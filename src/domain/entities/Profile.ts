import { randomUUID } from 'crypto';

/**
 * @openapi
 * components:
 *   schemas:
 *     RegionOperation:
 *       type: object
 *       properties:
 *         regionOperationId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
type RegionOperation = {
  regionOperationId: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     UserProfiles:
 *       type: object
 *       properties:
 *         userProfileId:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         profileId:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
type UserProfiles = {
  userProfileId: string;
  userId: string;
  profileId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     ProfileFunctionalities:
 *       type: object
 *       properties:
 *         profileFunctionalityId:
 *           type: string
 *           format: uuid
 *         profileId:
 *           type: string
 *           format: uuid
 *         functionalityId:
 *           type: string
 *           format: uuid
 *         enable:
 *           type: boolean
 *         preview:
 *           type: boolean
 *         maintenance:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         functionality:
 *           type: object
 *           properties:
 *             functionalityId:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *             system:
 *               type: string
 */
type ProfileFunctionalities = {
  profileFunctionalityId: string;
  profileId?: string;
  functionalityId?: string;
  enable: boolean;
  preview: boolean;
  maintenance: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  functionality?: {
    functionalityId?: string;
    name?: string;
    system?: string;
  };
};

export type ProfileProps = {
  profileId?: string;
  regionOperationId: string;
  name: string;
  excluded?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  regionOperation?: RegionOperation;
  userProfiles?: UserProfiles[];
  profileFunctionalities?: ProfileFunctionalities[];
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         profileId:
 *           type: string
 *           format: uuid
 *         regionOperationId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         excluded:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         regionOperation:
 *           $ref: '#/components/schemas/RegionOperation'
 *         userProfiles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserProfiles'
 *         profileFunctionalities:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProfileFunctionalities'
 */
export class Profile {
  profileId: string;
  regionOperationId!: string;
  name!: string;
  excluded?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  regionOperation?: RegionOperation;
  userProfiles?: UserProfiles[];
  profileFunctionalities?: ProfileFunctionalities[];

  constructor(props: ProfileProps) {
    Object.assign(this, props);
    this.profileId = props.profileId || randomUUID();
  }
}
