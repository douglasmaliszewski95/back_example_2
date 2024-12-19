import AppFactory from '@infra/factories/app.factory';
import routes from '@infra/router/routes';

(async () => {
  const app = await AppFactory.make(routes);
  await app.listen();
})();
