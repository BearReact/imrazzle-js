/* eslint-disable global-require */

const BASE_URL = '/api/promotion';

module.exports = {
    [`GET ${BASE_URL}/bonus/cumulativeAmount`]: (req, res) => res.json(require('../data/Wallet/cumulativeAmount')),
    [`GET ${BASE_URL}/bonus`]: (req, res) => res.json(require('../data/Wallet/bonus')),
    // [`GET ${BASE_URL}/promotion/bonus/redeem/emptyAmountItem`]: (req, res) => res.json(require('./Wallet/checkNotReady')),
    // [`POST ${BASE_URL}/promotion/bonus/:id/redeem`]: (req, res) => res.json(require('./Wallet/checkNotReady')),
    // [`POST ${BASE_URL}/promotion/bonus/transfer`]: (req, res) => res.json(require('./Wallet/checkNotReady')),
};
