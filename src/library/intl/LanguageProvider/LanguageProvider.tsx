/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `src/resources/lang`)
 */

import * as React from 'react';
import {IntlProvider} from 'react-intl';
import IntlGlobalProvider from '../global';


interface IProps {
    dangerouslySetInnerHTML: any;
    // any other props that come into the component
}

const TranslationWrapper = ({ dangerouslySetInnerHTML, ...props }: IProps) =>
    dangerouslySetInnerHTML ? (
        <span dangerouslySetInnerHTML={dangerouslySetInnerHTML} {...props} />
    ) : (
        <React.Fragment {...props} />
    );

type Props = {
    locale: string,
    messages: object,
    children: React.ReactNode
}

class LanguageProvider extends React.PureComponent<Props> {
    // eslint-disable-line react/prefer-stateless-function
    render() {

        return (
            <IntlProvider
                locale={this.props.locale}
                key={this.props.locale}
                messages={this.props.messages[this.props.locale]}
                // @ts-ignore
                textComponent={TranslationWrapper}
                defaultLocale="en-US"
            >
                <IntlGlobalProvider>
                    {React.Children.only(this.props.children)}
                </IntlGlobalProvider>
            </IntlProvider>
        );
    }
}

export default LanguageProvider;
