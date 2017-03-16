import { registerModel } from '../index';
import Layout from '../containers/Common/Layout';
import Index from '../containers/Home/Index';
import Common from '../models/common';
import Home from '../models/home';
import User from './user';
import No from '../containers/Common/404';

export default{
  path: '/',
  /* 布局基页 */
  getComponent(nextState, cb) {
    registerModel(Common);
    cb(null, Layout);
  },
  indexRoute: {
    getComponent(nextState, cb) {
      registerModel(Home);
      cb(null, Index);// 加载一个模板页面
    },
  },
  childRoutes: [
    User,
    // 无路由匹配的情况一定要放到最后，否则会拦截所有路由
    { path: '*', component: No },
  ],
};

