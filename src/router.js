import React from 'react';
import { Router } from 'dva/router';
import routes from './routers/index';

function RouterConfig({ history }) {
  return <Router history={history} >{routes}</Router>;
}
export default RouterConfig;
