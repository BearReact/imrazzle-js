import {compose} from 'redux';
import {connect} from 'react-redux';

import LanguageActions from '@library/redux/store/Language/Reducer';
import {injectIntl} from 'react-intl';
import HomeLayout from './HomeLayout';

const mapDispatchToProps = {
    changeLocale: LanguageActions.changeLocale,
};

const mapStateToProps = state => ({
    locale: state.language.locale,
    token: state.auth.memberToken,
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(HomeLayout);

