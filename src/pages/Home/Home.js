import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import {LocaleConsumer} from '../../middleware/locale/LocaleContext';

// import logo from './react.svg';

class Home extends React.Component {
  render() {

    const {changeLocale} = this.props;

    return (
      <div className="Home">
        <div className="Home-header">
          <img src="/react.svg" className="Home-logo" alt="logo" />
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


              <>
                  <button onClick={() => changeLocale('en-US')}>英文1</button>
                  <button onClick={() => changeLocale('zh-CN')}>中文1</button>
              </>


          </div>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
              Learn React
          </a>
          <BackButton>TEST 123 Styled</BackButton>
          <FormattedMessage id="app.learn" values={{ name: 'React' }} />
      </div>
    );
  }
}

export default Home;


const BackButton = styled.div`
    background-color:red;
    font-size: 12px;
    color: #fff;
`;
