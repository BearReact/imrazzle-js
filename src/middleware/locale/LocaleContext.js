import * as React from 'react';
import { useCookies } from 'react-cookie';
import {PRELOAD_LOCALE} from '../../types';

const LocaleContext = React.createContext();


const LocaleProvider = props => {
    const {children, locale, setLocale} = props;
    const [cookies, setCookie] = useCookies([PRELOAD_LOCALE]);

    const handleSyncCookie = locale => {

        setCookie(PRELOAD_LOCALE, locale, {path: '/'});
        setLocale(locale);
    };


    return (
        <LocaleContext.Provider
            value={{
                locale,
                setLocale: handleSyncCookie,
            }}
        >
            {children}
        </LocaleContext.Provider>
    )
};


const LocaleConsumer = LocaleContext.Consumer;
export {LocaleProvider, LocaleConsumer};
