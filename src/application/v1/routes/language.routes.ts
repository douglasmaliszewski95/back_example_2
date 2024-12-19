import LanguageControllerFactory from '@infra/factories/controllers/language.controller.factory';
import { Router } from 'express';

const languageRoutes = Router();

(async () => {
  languageRoutes.get('/', (await LanguageControllerFactory.make()).list);
})();

export default languageRoutes;
