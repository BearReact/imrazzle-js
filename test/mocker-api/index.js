const delay = require('mocker-api/utils/delay');
const requireContext = require('require-context');

const db = requireContext('../../test/mocker-api/routes', true, /\.mock\.js$/);

// jaywcjlove/mocker-api https://github.com/jaywcjlove/mocker-api
// 參考 https://juejin.im/post/5afba2746fb9a07aaf356327

// 延遲回應時間 (模擬 Loading 效果)
const delayTime = 600;

function loadMockyFiles() {
    let mockProxy = {};
    db.keys().forEach(filename => {
        mockProxy = {...mockProxy, ...db(filename)};
    });
    return mockProxy;
}
const proxy = loadMockyFiles();
module.exports = delay(proxy, delayTime);
