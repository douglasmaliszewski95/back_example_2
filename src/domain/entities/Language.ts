export type LanguageProps = {
  languageId: string;
  name: string;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Language:
 *       type: object
 *       properties:
 *         languageId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 */
export class Language {
  languageId!: string;
  name!: string;

  constructor(props: LanguageProps) {
    Object.assign(this, props);
  }
}
