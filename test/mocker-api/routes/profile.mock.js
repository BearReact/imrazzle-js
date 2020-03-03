/* eslint-disable global-require */

const get = require('lodash/get');
const jwtDecode = require('jwt-decode');
const BASE_URL = '/api/profile';

module.exports = {
    [`GET ${BASE_URL}`]: (req, res) => {
        console.log('xxx');
        const authToken = get(req, 'headers.authorization', 'default');
        console.log(authToken);
        try{
            const tokenInfo = jwtDecode(authToken);
            return res.json({
                statusCode: null,
                message: 'success',
                data: {
                    email: tokenInfo.email,
                    name: tokenInfo.name,
                    country: tokenInfo.country,
                    signUpDate: tokenInfo.signUpDate,
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

