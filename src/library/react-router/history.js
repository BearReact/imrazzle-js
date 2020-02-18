import createHistory from 'history/createBrowserHistory';

const routePrefixPath = '/ap-main';

const history = createHistory({
    basename: routePrefixPath,
});
export default history;
