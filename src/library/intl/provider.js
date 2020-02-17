/* eslint-disable */
/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `src/resources/lang`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';


const TranslationWrapper = ({ dangerouslySetInnerHTML, ...props }) =>
    dangerouslySetInnerHTML ? (
        <span dangerouslySetInnerHTML={dangerouslySetInnerHTML} {...props} />
    ) : (
        <React.Fragment {...props} />
    );

export class LanguageProvider extends React.PureComponent {
    // eslint-disable-line react/prefer-stateless-function
    render() {

        return (
            <IntlProvider
                locale={this.props.locale}
                key={this.props.locale}
                messages={this.props.messages[this.props.locale]}
                textComponent={TranslationWrapper}
            >
                    {React.Children.only(this.props.children)}
            </IntlProvider>
        );
    }
}

LanguageProvider.propTypes = {
    locale: PropTypes.string,
    messages: PropTypes.object,
    children: PropTypes.element.isRequired
};

const mapDispatchToProps = {};

const mapStateToProps = state => ({
    locale: state.language.locale
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguageProvider);
