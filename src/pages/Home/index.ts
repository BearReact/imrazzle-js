import {compose} from 'redux';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import loginAction from '@store/Login/Reducer';

import Home from './Home';

const mapDispatchToProps = {
    onSignIn: loginAction.submitLogin,
    onSignOut: loginAction.submitLogout,
};

const mapStateToProps = (state: any) => ({
    isSubmitting: state.login.isSubmitting,
    token: state.auth.memberToken,
});

const Exp: any = compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Home);
export default Exp;
