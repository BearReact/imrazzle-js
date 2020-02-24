// @flow

import get from 'lodash/get';

export default (pathKey, defaultReturn) => {
    if(typeof window !== 'undefined'){
        return get(window.__global__, pathKey, '');
    }else{
        return get(global.__global__, pathKey, '');
    }
};
