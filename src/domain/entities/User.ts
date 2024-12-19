import { AutoCompleteOutputDto } from '@domain/dto/user/autocomplete-output-dto';
import { randomUUID } from 'crypto';

/**
 * @openapi
 * components:
 *  schemas:
 *    UserAddress:
 *      type: object
 *      properties:
 *        addressesId:
 *          type: string
 *        city:
 *          type: string
 *        state:
 *          type: string
 *        neighboarhood:
 *          type: string
 *          nullable: true
 *        address:
 *          type: string
 *          nullable: true
 *        number:
 *          type: string
 *          nullable: true
 *        latitude:
 *          type: number
 *          nullable: true
 *        longitude:
 *          type: number
 *          nullable: true
 *        zipCode:
 *          type: string
 *          nullable: true
 *        complement:
 *          type: string
 *          nullable: true
 */
type UserAddress = {
  addressesId: string;
  city: string;
  state: string;
  neighboarhood?: string | null;
  address?: string | null;
  number?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  zipCode?: string | null;
  complement?: string | null;
};

/**
 * @openapi
 * components:
 *  schemas:
 *    UserAreas:
 *      type: object
 *      properties:
 *        userAreaId:
 *          type: string
 *        userId:
 *          type: string
 *        areaId:
 *          type: string
 *        name:
 *          type: string
 */
type UserAreas = {
  userAreaId?: string;
  userId?: string;
  areaId?: string;
  name?: string;
  // areas?: Partial<Area>;
};

/**
 * @openapi
 * components:
 *  schemas:
 *    UserAgencies:
 *      type: object
 *      properties:
 *        userAgencyId:
 *          type: string
 *        userId:
 *          type: string
 *        agencyId:
 *          type: string
 *        name:
 *          type: string
 */
type UserAgencies = {
  userAgencyId?: string;
  userId?: string;
  agencyId?: string;
  name?: string;
  // agencies?: Partial<Agency>;
};

/**
 * @openapi
 * components:
 *  schemas:
 *    Functionalities:
 *      type: object
 *      properties:
 *        functionalityId:
 *          type: string
 *        name:
 *          type: string
 *        system:
 *          type: string
 */
type Functionalities = {
  functionalityId?: string;
  name?: string;
  system?: string;
};

/**
 * @openapi
 * components:
 *  schemas:
 *    RegionOperation:
 *      type: object
 *      properties:
 *        regionOperationId:
 *          type: string
 *        name:
 *          type: string
 */
type RegionOperation = {
  regionOperationId?: string;
  name?: string;
};

/**
 * @openapi
 * components:
 *  schemas:
 *    ProfileFunctionalities:
 *      type: object
 *      properties:
 *        profileFunctionalityId:
 *          type: string
 *        enable:
 *          type: boolean
 *        maintenance:
 *          type: boolean
 *        preview:
 *          type: boolean
 *        functionality:
 *          $ref: '#/components/schemas/Functionalities'
 */
type ProfileFunctionalities = {
  profileFunctionalityId?: string;
  enable?: boolean;
  maintenance?: boolean;
  preview?: boolean;
  functionality?: Functionalities;
};

/**
 * @openapi
 * components:
 *  schemas:
 *    UserProfiles:
 *      type: object
 *      properties:
 *        profileId:
 *          type: string
 *        name:
 *          type: string
 *        regionOperation:
 *          $ref: '#/components/schemas/RegionOperation'
 *        profileFunctionalities:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/ProfileFunctionalities'
 */
type UserProfiles = {
  profileId?: string;
  name?: string;
  regionOperation?: RegionOperation;
  profileFunctionalities?: ProfileFunctionalities[];
};

/**
 * @openapi
 * components:
 *  schemas:
 *    UserPositions:
 *      type: object
 *      properties:
 *        userPositionId:
 *          type: string
 *        userId:
 *          type: string
 *        positionId:
 *          type: string
 *        name:
 *          type: string
 */
type UserPositions = {
  userPositionId?: string;
  userId?: string;
  positionId?: string;
  name?: string;
  // positions?: Partial<Position>;
};

type CorporateData = {
  corporateDataId?: string;
  userId?: string;
  admissionDate?: string | null;
  regionOperation?: string | null;
  temporaryEmployee?: boolean | null;
  registration?: string | null;
  superior?: string;
  resignationDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserProps = {
  userId?: string;
  collaboratorId?: number | null;
  name: string;
  userGroupName?: string | null;
  login?: string;
  nationalIdCard2: string;
  email: string;
  enabled: boolean;
  userUpdatedAt?: string | null;
  userUpdatedAtMillis?: number | null;
  fieldTeam?: boolean | null;
  birthDate: Date;
  password?: string | null;
  updatedPassword?: string | null;
  acceptedTerms?: Date | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  addresses?: UserAddress[];
  userAreas?: UserAreas[];
  userAgencies?: UserAgencies[];
  userProfiles?: UserProfiles[];
  userPositions?: UserPositions[];
  corporateData?: CorporateData;
};

/**
 * @openapi
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *          format: uuid
 *        collaboratorId:
 *          type: number
 *        name:
 *          type: string
 *        userGroupName:
 *          type: string
 *        login:
 *          type: string
 *        nationalIdCard2:
 *          type: string
 *        email:
 *          type: string
 *          format: email
 *        enabled:
 *          type: boolean
 *        userUpdatedAt:
 *          type: string
 *          format: date-time
 *        userUpdatedAtMillis:
 *          type: number
 *        fieldTeam:
 *          type: boolean
 *        excluded:
 *          type: boolean
 *        birthDate:
 *          type: string
 *          format: date-time
 *        updatedPassword:
 *          type: string
 *        acceptedTerms:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *        addresses:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/UserAddress'
 *        userAreas:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/UserAreas'
 *        userAgencies:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/UserAgencies'
 *        userProfiles:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/UserProfiles'
 *        userPositions:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/UserPositions'
 */
export class User {
  userId: string;
  collaboratorId?: number;
  name!: string;
  userGroupName?: string;
  login?: string;
  nationalIdCard2!: string;
  email!: string;
  enabled!: boolean;
  userUpdatedAt?: string;
  userUpdatedAtMillis?: number;
  fieldTeam?: boolean;
  birthDate!: Date;
  password?: string;
  updatedPassword?: string;
  acceptedTerms?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  readonly addresses?: UserAddress[];
  readonly userAreas?: UserAreas[];
  readonly userAgencies?: UserAgencies[];
  readonly userProfiles?: UserProfiles[];
  readonly userPositions?: UserPositions[];
  readonly corporateData?: CorporateData;

  constructor(props: UserProps) {
    Object.assign(this, props);
    this.userId = props.userId || randomUUID();
  }

  getWithoutPassword(): Omit<User, 'password' | 'login'> {
    return Object.assign({}, this, { password: undefined, login: undefined }) as Omit<User, 'password' | 'login'>;
  }

  getNameAndId(): AutoCompleteOutputDto {
    return { id: this.userId, name: this.name };
  }
}
