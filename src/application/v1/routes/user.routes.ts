import { Router } from 'express';

import UserControllerFactory from '@infra/factories/controllers/user.controller.factory';
import { authValidator } from '@application/middleware/validators/user/auth-validator';
import { forgotPasswordValidator } from '@application/middleware/validators/user/forgot-password-validator';
import { resetPasswordValidator } from '@application/middleware/validators/user/reset-password-validator';
import { userIdParamValidator } from '@application/middleware/validators/user/user-id-param-validator';
import { createUserValidator } from '@application/middleware/validators/user/create-user-validator';
import { updatePasswordValidator } from '@application/middleware/validators/user/update-password-validator';
import { searchValidator } from '@application/middleware/validators/user/search-validator';
import { updateUserValidator } from '@application/middleware/validators/user/update-user-validator';
import { autocompleteValidator } from '@application/middleware/validators/user/auto-complete-validator';
import { listUserValidator } from '@application/middleware/validators/user/list-user-validator';

const userRoutes = Router();

(async () => {
  userRoutes.post('/', createUserValidator, (await UserControllerFactory.make()).createUser);
  userRoutes.post('/list', listUserValidator, (await UserControllerFactory.make()).list);
  userRoutes.post('/auth', authValidator, (await UserControllerFactory.make()).createSession);
  userRoutes.post('/search', searchValidator, (await UserControllerFactory.make()).search);
  userRoutes.post('/auto-complete', autocompleteValidator, (await UserControllerFactory.make()).autocomplete);
  userRoutes.post(
    '/forgot_password',
    forgotPasswordValidator,
    (await UserControllerFactory.make()).sendForgotPasswordEmail,
  );
  userRoutes.post('/reset_password', resetPasswordValidator, (await UserControllerFactory.make()).resetPassword);

  userRoutes.patch('/update_password', updatePasswordValidator, (await UserControllerFactory.make()).updatePassword);

  userRoutes.get('/:userId', userIdParamValidator, (await UserControllerFactory.make()).show);
  userRoutes.put(
    '/:userId',
    userIdParamValidator,
    updateUserValidator,
    (await UserControllerFactory.make()).updateUser,
  );
  userRoutes.post('/enable_disable/:userId', userIdParamValidator, (await UserControllerFactory.make()).enableDisable);
})();

export default userRoutes;
