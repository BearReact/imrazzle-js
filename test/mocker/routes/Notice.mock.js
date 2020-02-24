/* eslint-disable global-require */

const BASE_URL = '/api/notification';

module.exports = {
    [`GET ${BASE_URL}/checkNotReady`]: (req, res) => res.json(require('../data/Notice/checkNotReady')),
};
