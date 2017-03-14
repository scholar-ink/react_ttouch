import { getCities } from '../services/index'
export default {
  namespace: 'home',
  state: {
    ads:[],
    test:[
      {
        'name':'上海',
        'value':2
      }
    ]
  },
  subscriptions: {},
  effects: {
    *getCities({ payload }, { call, put }) {
  
      const {data} = yield call(getCities, { phone: 13585821080, password: 'zc2011', code: 111111 });
      
      console.log(data);
  
      yield put({ type: 'getCitiesSuccess', cities: data });
      
    },
  },
  reducers: {
    
    getCitiesSuccess(state, {cities}){
    
        return { ...state, cities: cities, };
    
    }
    
  },
  
};
