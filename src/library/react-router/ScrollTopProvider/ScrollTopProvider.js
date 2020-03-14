import * as React from 'react';
import { withRouter } from 'react-router-dom';
class ScrollTopProvider extends React.PureComponent {
    componentDidUpdate(prevProps) {
        const { location } = this.props;
        if (location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }
    render() {
        const { children } = this.props;
        return children;
    }
}
// @ts-ignore
export default withRouter(ScrollTopProvider);
//# sourceMappingURL=ScrollTopProvider.js.map