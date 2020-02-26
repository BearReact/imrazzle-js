import React from 'react';
import {FormattedMessage} from 'react-intl';
import styled from 'styled-components';

// import logo from './react.svg';

class About extends React.Component {
    render() {

        const {changeLocale} = this.props;

        return (
            <div className="Home">
        About
                <div>

                    <>
                        <button type="button" onClick={() => changeLocale('en-US')}>英文1</button>
                        <button type="button" onClick={() => changeLocale('zh-CN')}>中文1</button>
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
                <FormattedMessage id="app.learn" values={{name: 'React'}}/>
            </div>
        );
    }
}

export default About;

const BackButton = styled.div`
    background-color:red;
    font-size: 12px;
    color: #fff;
`;
