/**
 * Created by zhouchao on 17/3/16.
 */
export default {
  path: 'user',
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('../containers/User'));
      }, 'User');
    },
  },
  childRoutes: [
    {
      path: 'share/:uid',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('../containers/User/Share'));
        }, 'Share');
      },
    },
  ],
};
