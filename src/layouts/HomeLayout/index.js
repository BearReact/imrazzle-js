import {compose} from 'redux';
import {connect} from 'react-redux';

import LanguageActions from '@library/redux/store/Language/Reducer';
import HomeLayout from './HomeLayout';
import {injectIntl} from "react-intl";

const mapDispatchToProps = {
    changeLocale: LanguageActions.changeLocale,
};

const mapStateToProps = state => ({
    locale: state.language.locale,
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(HomeLayout);

