import {compose} from 'redux';
import {connect} from 'react-redux';

import LanguageActions from '@library/redux/store/Language/Reducer';
import Home from './Home';

const mapDispatchToProps = {
    changeLocale: LanguageActions.changeLocale,
};

const mapStateToProps = state => ({
    locale: state.language.locale,
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Home);
