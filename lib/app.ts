import packageInfo from '../package.json';
import env from './env';

const app = {
  version: packageInfo.version,
  name: 'Slatebridge Teams',
  logoUrl: '/brand-mark.svg',
  url: env.appUrl,
};

export default app;
