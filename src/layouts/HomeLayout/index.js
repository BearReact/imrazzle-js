import { compose } from 'redux';
import { connect } from 'react-redux';
import LanguageActions from '@store/Language/Reducer';
import { Selectors as AuthSelectors } from '@store/Auth/Reducer';
import { injectIntl } from 'react-intl';
import HomeLayout from './HomeLayout';
const mapDispatchToProps = {
    changeLocale: LanguageActions.changeLocale,
};
const mapStateToProps = (state) => ({
    locale: state.language.locale,
    isAuth: AuthSelectors.isAuth(state),
});
const ComposeComponent = compose(injectIntl, connect(mapStateToProps, mapDispatchToProps))(HomeLayout);
export default ComposeComponent;
//# sourceMappingURL=index.js.map