import * as models from './models';
import createRouter from './router';

export default {
  id: 'education_001',
  name: '教育001',
  router: createRouter(),
  models: Object.values(models),
}