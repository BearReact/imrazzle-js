/* eslint-disable global-require */

const BASE_URL = '/api/system';

module.exports = {
    [`GET ${BASE_URL}/setting`]: (req, res) => res.json(require('../data/System/setting')),
};
