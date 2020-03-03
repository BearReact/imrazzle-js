/* eslint-disable global-require */
const BASE_URL = '/api/auth';

module.exports = {
    [`POST ${BASE_URL}/login`]: (req, res) => res.json(require('../data/auth/baseLogin')),
    [`POST ${BASE_URL}/logout`]: (req, res) => res.json(require('../data/auth/baseLogout')),
    [`POST ${BASE_URL}/signUp`]: (req, res) => res.json(require('../data/auth/baseSignup')),
};
