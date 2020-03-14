import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
} from 'react-router-dom';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({isAuth, intl, component: Component, children, ...rest}: any) => {
    const isClient = typeof window !== 'undefined';

    const {formatMessage: i18n} = intl;

    return (
        <Route
            {...rest}
            render={({location, ...props}) => {
                if(isAuth){
                    return <Component {...props}/>;
                }

                if(isClient) window.alert(i18n({id: 'errorHttp.401'}));

                return (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: {from: location},
                        }}
                    />
                );
            }}
        />
    );
};

export default PrivateRoute;
