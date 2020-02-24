/* eslint-disable global-require */
const BASE_URL = '/api/auth';

module.exports = {
    [`POST ${BASE_URL}/base/login`]: (req, res) => res.json(require('../data/Auth/baseLogin')),
    [`POST ${BASE_URL}/base/signup`]: (req, res) => res.json(require('../data/Auth/baseSignup')),
    // 帳號重複驗證
    [`POST ${BASE_URL}/base/accountVerification`]: (req, res) => res.json(require('../data/Auth/accountVerification')),
    // 圖形驗證碼驗證
    [`GET ${BASE_URL}/base/captchaVerification`]: (req, res) => res.json(require('../data/Auth/getCaptchaVerification')),
    [`POST ${BASE_URL}/base/captchaVerification`]: (req, res) => res.json(require('../data/Auth/submitCaptchaVerification')),
    // 電話驗證
    [`POST ${BASE_URL}/base/sendSMSCode`]: (req, res) => res.json(require('../data/Auth/sendSmsCode')),
    [`POST ${BASE_URL}/base/phoneVerification`]: (req, res) => res.json(require('../data/Auth/phoneVerification')),
};
