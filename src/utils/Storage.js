export default {
    
    set: function (key, data){
        return window.localStorage.setItem(key, window.JSON.stringify(data));
    },
    get: function (key, data){
        if(window.localStorage.getItem(key) === undefined){
            return '';
        }
        return window.JSON.parse(window.localStorage.getItem(key));
    },
    remove: function (key){
        return window.localStorage.removeItem(key);
    }

}
