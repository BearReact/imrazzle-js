import {compose} from 'redux';
import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';

import injectReducerSaga from '@library/redux/injectReducerSaga';
import {Selectors as AuthSelectors} from '@library/redux/store/Auth/Reducer';
import {action as PageAction, reducer, saga} from './store';
import Profile from './Profile';

const mapDispatchToProps = {
    fetchCurrent: PageAction.fetchCurrent,
};

const mapStateToProps = state => ({
    isFetching: state.profile.isFetching,
    currentData: state.profile.currentData,
    memberToken: state.auth.memberToken,
    payload: AuthSelectors.payload(state),
});

export default compose(
    injectIntl,
    injectReducerSaga('profile', {reducer, saga}),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Profile);
