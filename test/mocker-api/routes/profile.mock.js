/* eslint-disable global-require */

const get = require('lodash/get');
const jwtDecode = require('jwt-decode');
const BASE_URL = '/api/profile';

module.exports = {
    [`GET ${BASE_URL}`]: (req, res) => {
        const authToken = get(req, 'headers.authorization', 'default');
        try{
            const payload = jwtDecode(authToken);
            return res.json({
                statusCode: null,
                message: 'success',
                data: {
                    email: payload.email,
                    name: payload.name,
                    country: payload.country,
                    signUpDate: payload.signUpDate,
                },
            });
        }catch(e){
            return res.json({
                statusCode: 401,
                message: 'Sorry, you do not have access',
                data: {},
            }, 401);
        }

    }
};

