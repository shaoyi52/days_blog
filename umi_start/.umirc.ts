import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
	{
      path: '/layout',
      component: '@/layouts/index',
      routes: [{ path: '/layout/user', component: '@/pages/user' },]
    }
  ],
  fastRefresh: {},
  dynamicImport: {},
  dva: {
    immer: true,
  },
});
