import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import loginAction from '@store/Login/Reducer';
import { Selectors as AuthSelectors } from '@store/Auth/Reducer';
import PrivateRoute from './PrivateRoute';
const mapDispatchToProps = {
    onSignIn: loginAction.submitLogin,
    onSignOut: loginAction.submitLogout,
};
const mapStateToProps = (state) => ({
    isAuth: AuthSelectors.isAuth(state),
});
const composeComponent = compose(injectIntl, connect(mapStateToProps, mapDispatchToProps))(PrivateRoute);
export default composeComponent;
//# sourceMappingURL=index.js.map