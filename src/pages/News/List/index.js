import {connect} from 'react-redux';
import {injectIntl} from 'react-intl';
import {compose} from 'redux';

import List from './List';
import {action as PageAction, reducer, saga} from '../store';
import injectReducerSaga from '@library/redux/injectReducerSaga';


const mapDispatchToProps = {
    fetchPaginate: PageAction.fetchPaginate,
};

const mapStateToProps = state => ({
    isFetching: state.news.isFetching,
    paginateData: state.news.paginateData,
});

export default compose(
    injectIntl,
    injectReducerSaga('news', {reducer, saga}),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(List);
