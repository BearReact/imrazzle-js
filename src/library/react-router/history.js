import createHistory from 'history/createBrowserHistory';
import { getConfig } from '@config/utils/getConfig';
const history = createHistory({
    basename: getConfig('env.routePrefixPath'),
});
export default history;
//# sourceMappingURL=history.js.map