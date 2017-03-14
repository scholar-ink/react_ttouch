export default {
    path: 'room',
    indexRoute: {
        getComponent (nextState, cb) {

            require.ensure([], (require) => {

                cb(null, require('../containers/User'));

            }, 'Room');
        }
    },
    childRoutes: [
        {
            path: 'detail/:rid',
            
            getComponent (nextState, cb) {
                
                require.ensure([], (require) => {
                    
                    cb(null, require('../containers/User/Share'));
                    
                }, 'Share');
            },
        },
        {
            path: 'list/:uid',
        
            getComponent (nextState, cb) {
            
                require.ensure([], (require) => {
                
                    cb(null, require('../containers/User/list'));
                
                }, 'List');
            },
        }
    ]


};
