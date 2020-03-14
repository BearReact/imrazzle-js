import api from './index';
export default {
    /**
     * 登入
     * @param email Email
     * @returns {*}
     */
    submitLogin(email) {
        return api.post('auth/login', { email });
    },
    /**
     * 登出
     * @returns {*}
     */
    submitLogout() {
        return api.post('auth/logout');
    },
};
//# sourceMappingURL=Auth.js.map