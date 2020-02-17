import React from 'react';
import { FormattedMessage } from 'react-intl';
import {LocaleConsumer} from './middleware/locale/LocaleContext';

import logo from './react.svg';
import './Home.css';

class Home extends React.Component {
  render() {

    const {setLocale} = this.props;

    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to Razzle</h2>
        </div>
        <p className="Home-intro">
          To get started, edit <code>src/App.js</code> or{' '}
          <code>src/Home.js</code> and save to reload.
        </p>
        <ul className="Home-resources">
          <li>
            <a href="https://github.com/jaredpalmer/razzle">Docs</a>
          </li>
          <li>
            <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
          </li>
          <li>
            <a href="https://palmer.chat">Community Slack</a>
          </li>
        </ul>

          <div>

              <LocaleConsumer>
                  {localeProps => (
                      <>
                          <button onClick={() => localeProps.setLocale('en')}>英文</button>
                          <button onClick={() => localeProps.setLocale('zh')}>中文</button>
                      </>
                  )}

              </LocaleConsumer>

          </div>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
              Learn React
          </a>
          <FormattedMessage id="app.learn" values={{ name: 'React' }} />
      </div>
    );
  }
}

export default Home;
