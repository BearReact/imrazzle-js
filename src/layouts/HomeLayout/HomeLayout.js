// @flow

import React from 'react';
import styled, {css} from 'styled-components';
import {media, Col, Container, Row} from '@library/styled-bs-grid';
import get from 'lodash/get';
import A from '@components/atoms/A';
import {asset} from '@config/utils/getAssetPrefix';
import {getConfig} from '@config/utils/getConfig';

import Router from '@layouts/HomeLayout/Router';

const HomeLayout = (props: Props) => {

    const {
        intl: {formatMessage: i18n}, changeLocale, isAuth,
    } = props;

    const menu = [
        {href: '/', text: i18n({id: 'menu.home'}), isHome: true},
        {href: '/news', text: i18n({id:'menu.news'})},
        {href: '/profile', text: i18n({id:'menu.profile'}), isHidden: !isAuth},
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
                    <Row className="align-items-center">
                        {/* LOGO */}
                        <Col md={2}>
                            <A href="/">
                                <Logo src={asset('/common/images/react.svg')}/>
                            </A>
                        </Col>

                        {/* MENU */}
                        <Col md>
                            <Nav forwardedAs="ul">
                                {menu
                                    .map(row => (
                                        <NavItem
                                            col="auto"
                                            forwardedAs="li"
                                            key={row.href}
                                            isHidden={get(row, 'isHidden', false)}
                                        >
                                            <NavItemLink href={row.href}>
                                                {row.text}
                                            </NavItemLink>
                                        </NavItem>
                                    ))}
                            </Nav>
                        </Col>

                        {/* Change Language */}
                        <Col col="auto" className="d-none d-md-flex">
                            <Button type="button" onClick={handleChangeLocale}>
                                {i18n({id:'common.language'})}
                            </Button>
                        </Col>

                    </Row>
                </Container>
            </Header>

            {/* Content */}
            <Section>
                <Router/>
            </Section>

            {/* Footer */}
            <Footer col="auto" as="footer">
                <Container>
                    <FooterCopyRight className="footer-copyright text-center">
                        <p className="text">
                            © 2020 Copyright by
                            {' '}
                            <a href="https://github.com/imagine10255/imnext" target="_blank" rel="noopener noreferrer">
                                Imagine
                            </a>
                            {' '}
                            All Rights Reserved ({getConfig('version')}).
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
    background-image: url(${asset('/example/footer-bg.jpg')});
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

const NavItemLink = styled(A)`

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
    
    ${props => props.isHidden && css`
        opacity: .3;
    `}


    ${media.md`
        padding: 0 10px;
    `}
`;

const Nav = styled(Row)`
    position: absolute;
    top: 45px;

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

