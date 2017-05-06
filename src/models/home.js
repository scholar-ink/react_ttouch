// import { routerRedux } from 'dva/router';
import { getCities } from '../services/index';

export default {
  namespace: 'home',
  state: {
    ads: [],
    test: [
      {
        name: '上海',
        value: 2,
      },
    ],
  },
  subscriptions: {},
  effects: {
    * getCities({ payload }, { call, put }) {
      // yield put(routerRedux.push('/user'));
      const { data } = yield call(getCities, { phone: 13585821080, password: 'zc2011', code: 111111 });
      yield put({ type: 'getCitiesSuccess', cities: data });
    },
  },
  reducers: {
    getCitiesSuccess(state, { cities }) {
      return { ...state, cities };
    },
  },
};
