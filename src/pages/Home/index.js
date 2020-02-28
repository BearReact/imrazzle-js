import {compose} from 'redux';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import loginAction from '@library/redux/store/Login/Reducer';

import Home from './Home';

const mapDispatchToProps = {
    onSignIn: loginAction.submitLogin,
    onSignOut: loginAction.submitLogout,
};

const mapStateToProps = state => ({
    isSubmitting: state.login.isSubmitting,
    token: state.auth.memberToken,
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Home);
