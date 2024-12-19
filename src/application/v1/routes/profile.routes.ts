import { Router } from 'express';
import ProfileControllerFactory from '@infra/factories/controllers/profile.controller.factory';
import { ProfileIdParamValidator } from '@application/middleware/validators/profiles/profile-id-param-validator';
import { CreateProfileValidator } from '@application/middleware/validators/profiles/create-profile-validator';
import { UpdateProfileValidator } from '@application/middleware/validators/profiles/update-profile-validator';

const profileRoutes = Router();

(async () => {
  profileRoutes.get('/', (await ProfileControllerFactory.make()).list);
  profileRoutes.post('/', CreateProfileValidator, (await ProfileControllerFactory.make()).createProfile);
  profileRoutes.get('/:profileId', ProfileIdParamValidator, (await ProfileControllerFactory.make()).show);
  profileRoutes.put(
    '/:profileId',
    ProfileIdParamValidator,
    UpdateProfileValidator,
    (await ProfileControllerFactory.make()).updateProfile,
  );
  profileRoutes.delete('/:profileId', ProfileIdParamValidator, (await ProfileControllerFactory.make()).delete);
})();

export default profileRoutes;
