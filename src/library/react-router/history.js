import createHistory from 'history/createBrowserHistory';
import {getConfig} from '@config/utils/getConfig';

const routePrefixPath =  getConfig('env.routePrefixPath');

const history = createHistory({
    basename: routePrefixPath,
});
export default history;
