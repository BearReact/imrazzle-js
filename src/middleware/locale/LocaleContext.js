import * as React from 'react';
import { useCookies } from 'react-cookie';
import {preloadLocale} from '../../types';

const LocaleContext = React.createContext();


const LocaleProvider = props => {
    const {children, locale, setLocale} = props;
    const [cookies, setCookie] = useCookies([preloadLocale]);

    const handleSyncCookie = locale => {

        setCookie(preloadLocale, locale, {path: '/'});
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
