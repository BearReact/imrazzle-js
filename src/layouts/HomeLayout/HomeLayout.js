// @flow

import React from 'react';
import {FormattedMessage} from 'react-intl';
import styled from 'styled-components';
import {media, Col, Container, GridThemeProvider, Row} from "styled-bootstrap-grid";
import {Route,Switch, Link} from 'react-router-dom';
import A from '@components/atoms/A';
import cx from 'classnames';
import get from 'lodash/get';
import Home from "@pages/Home";
import About from "@pages/About";
import News from "@pages/News/List";
import {asset} from '@config/utils/getAssetPrefix';
import {version} from '../../../package';

// import logo from './react.svg';

const HomeLayout = (props: Props) => {

    const {
        intl: {formatMessage: i18n}, changeLocale
    } = props;


    const isVisibleNavBar = false;
    const menu = [
        {href: '/', text: i18n({id: 'menu.home'}), isHome: true},
        {href: '/news', text: i18n({id:'menu.news'})},
        {href: '/contact', text: i18n({id:'menu.contact'})},
        {href: '/profile', text: i18n({id:'menu.profile'})},
    ];


    /**
     * 更改語言
     */
    const handleChangeLocale = () => {

        switch (props.locale) {
            case 'zh-CN':
                changeLocale('en-US');
                break;
            case 'en-US':
                changeLocale('zh-CN');
                break;
            default:
                //
        }
    };

    return (
        <div className="d-flex flex-column" style={{height: 'inherit'}}>
            <Header>
                <Container className="pt-3 pb-3">
                    <Row alignItems="center">
                        {/* LOGO */}
                        <Col md={2}>
                            <A href="/">
                                <Logo src={asset('images/react.svg')}/>
                            </A>
                        </Col>

                        {/* MENU */}
                        <Col md>
                            <Nav as="ul">
                                {menu.map(row => (
                                    <NavItem auto
                                             as="li"
                                             key={row.href}>
                                        <A href={row.href}>
                                            {row.text}
                                        </A>
                                    </NavItem>
                                ))}
                            </Nav>
                        </Col>


                        {/* Change Language */}
                        <Col auto className="d-none d-md-flex">
                            <Button type="button" onClick={handleChangeLocale}>
                                {i18n({id:'common.language'})}
                            </Button>
                        </Col>

                    </Row>
                </Container>
            </Header>

            {/* Content */}
            <Section>
                <Switch>
                    {/*<Route exact path="/" component={Home} />*/}
                    {/*<Route exact path="/about" component={About} />*/}
                    <Route exact path="/news" component={News} />
                </Switch>
            </Section>

            {/* Footer */}
            <Footer auto as="footer">
                <Container>
                    <FooterCopyRight className="footer-copyright text-center">
                        <p className="text">
                            © 2020 Copyright by
                            {' '}
                            <a href="https://github.com/imagine10255/imnext" target="_blank" rel="noopener noreferrer">
                                Imagine
                            </a>
                            {' '}
                            All Rights Reserved ({version}).
                        </p>
                    </FooterCopyRight>
                </Container>
            </Footer>
        </div>
    );
};

export default HomeLayout;


const Section = styled.div`
    flex: 1 1 auto;
`;

const Footer = styled(Col)`
    background-image: url(${asset('images/example/footer-bg.jpg')});
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
`;

const FooterCopyRight = styled.div`
    padding: 20px 0 10px 0;
    border-top: 1px solid #dedede4f;
    color: #798795;
    
    a{
        color: ${props => props.theme.primaryColor};
    }
`;

const NavItem = styled(Col)`
    position: relative;
    padding: 5px 0;

    a {
        font-size: 16px;
        font-weight: 900;
        color: #222;
        transition: color 0.3s ease-out 0s;
        position: relative;
    }
    
    &.active > a, :hover > a {
        color: ${props => props.theme.primaryColor};
    }
    
    
    ${media.md`
        padding: 0 10px;
    `}
`;

const NavBarCollapse = styled.div`
    display: none;
   
    width: 100%;
    background-color: rgba(255,255,255,.9);
    z-index: 9;
    box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.1);
    padding: 5px 12px;

    ${media.md`
        position: static;
        top: auto;
        left: auto;
        box-shadow: none;
        background-color: transparent;
    `}
`;

const Nav = styled(Row)`
    position: absolute;
    top: 45px;

    ${props => props.isVisible && css`
        ${NavBarCollapse}{
            display: block;
        }
    `}
    
    ${media.md`
        position: static;
    `}
`;

const Button = styled.button`
    font-weight: 700;
    border: 2px solid #f14836;
    border-radius: 50px;
    color: #fff;
    background-color: #f14836;
    font-size: 14px;
    padding: 10px 25px;
    
    :hover{
        color: #f14836;
        background-color: #e7e7e7;
    }
`;

const Logo = styled.img`
    animation: Home-logo-spin infinite 20s linear;
    height: 40px;
        
        
    @keyframes Home-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

  
`;

const Header = styled.header`
    flex: 0 0 auto;
`;

