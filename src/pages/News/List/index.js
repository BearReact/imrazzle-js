import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import injectReducerSaga from '@store/injectReducerSaga';
import { action as PageAction, reducer, saga } from '../store';
import List from './List';
const mapDispatchToProps = {
    fetchPaginate: PageAction.fetchPaginate,
};
const mapStateToProps = (state) => ({
    isFetching: state.news.isFetching,
    paginateData: state.news.paginateData,
});
const composePage = compose(injectIntl, injectReducerSaga('news', { reducer, saga }), connect(mapStateToProps, mapDispatchToProps))(List);
export default composePage;
//# sourceMappingURL=index.js.map