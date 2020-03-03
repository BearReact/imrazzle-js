/* eslint-disable global-require */

const BASE_URL = '/api/news';

module.exports = {
    [`GET ${BASE_URL}`]: (req, res) => res.json(require('../data/news/list')),
};

