import { randomUUID } from 'crypto';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateAddressDTO:
 *      type: object
 *      properties:
 *        citieId:
 *          type: number
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
interface CreateAddressDTO {
  addressesId: string;
  citieId: number;
  neighboarhood?: string;
  address?: string;
  number?: string;
  latitude?: number;
  longitude?: number;
  zipCode?: string;
  complement?: string;
}

type CorporateData = {
  admissionDate?: string;
  regionOperation?: string;
  temporaryEmployee?: boolean;
  registration?: string;
  superior: string;
  resignationDate: Date;
};

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserDTO:
 *      type: object
 *      properties:
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
 *        fieldTeam:
 *          type: boolean
 *        birthDate:
 *          type: string
 *          format: date
 *        password:
 *          type: string
 *          minLength: 8
 *        acceptedTerms:
 *          type: string
 *          format: date
 *        userProfiles:
 *          type: array
 *          items:
 *            type: string
 *            format: uuid
 *        userAgencies:
 *          type: array
 *          items:
 *            type: string
 *            format: uuid
 *        userPositions:
 *          type: array
 *          items:
 *            type: string
 *            format: uuid
 *        userAreas:
 *          type: array
 *          items:
 *            type: string
 *            format: uuid
 *        userAddresses:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CreateAddressDTO'
 *        userUpdatedAt:
 *          type: string
 *          nullable: true
 *        userUpdatedAtMillis:
 *          type: number
 *          nullable: true
 */
export class CreateUserDTO {
  public readonly userId!: string;
  constructor(
    public readonly collaboratorId: number,
    public readonly name: string,
    public readonly userGroupName: string,
    public readonly login: string,
    public readonly nationalIdCard2: string,
    public readonly email: string,
    public readonly enabled: boolean,
    public readonly fieldTeam: boolean,
    public readonly birthDate: Date,
    public readonly password: string,
    public readonly acceptedTerms: Date,
    public readonly corporateData: CorporateData,
    public readonly userProfiles: string[],
    public readonly userAgencies: string[],
    public readonly userPositions: string[],
    public readonly userAreas: string[],
    public readonly userAddresses: CreateAddressDTO[],
    public readonly userUpdatedAt?: string,
    public readonly userUpdatedAtMillis?: number,
  ) {
    this.userId = randomUUID();
  }
}
