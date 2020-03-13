// @flow

import React from 'react';
import styled from 'styled-components';
import {media, Col, Container, Row} from '@library/styled-bs-grid';
import {asset} from '@config/utils/getAssetPrefix';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import LoaderContainer from '@components/organisms/LoaderContainer';

const Home = (props: Props) => {
    const {
        intl: {formatMessage: i18n}, onSignIn, isSubmitting, isAuth, token,
    } = props;

    const {handleSubmit, register, reset} = useForm();
    const onSubmit = async formData => {
        const schema = yup.object().shape({
            email: yup.string()
                .email(i18n({id: 'errorForm.invalid'}, {name: i18n({id: 'page.contact.label.email'})}))
                .required(i18n({id: 'errorForm.require'}, {name: i18n({id: 'page.contact.label.email'})})),
        });
        const validateResult = await schema.validate(formData).catch(error => {
            alert(error.message);
            return false;
        });
        if(validateResult){
            // 驗證成功
            onSignIn(formData, reset);
        }

    };

    const renderForm = () => {
        const {onSignOut} = props;
        if (token) {
            return (
                <div>
                    <textarea style={{width: '100%', height: '200px'}} defaultValue={token}/>
                    <Button
                        as="button"
                        className="btn btn-block"
                        type="button"
                        onClick={onSignOut}
                    >
                        {i18n({id: 'button.signOut'})}
                    </Button>
                </div>
            );
        }

        return (

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder={i18n({id: 'page.home.email'})}
                    name="email"
                    ref={register}
                />
                <Button
                    type="submit"
                    className="btn btn-block"
                >{i18n({id: 'button.signIn'})}
                </Button>
            </form>

        );
    };

    return (
        <HeaderHero className="d-lg-flex">
            <LoaderContainer isLoading={isSubmitting}>
                <Container>
                    <Row>
                        <Col lg={14}>
                            <HeroTitle dangerouslySetInnerHTML={{__html: i18n({id: 'page.home.heroTitle'})}}/>
                            <HeroText className="text">{i18n({id: 'page.home.heroText'})}</HeroText>
                            <HeroSignUp>
                                {renderForm()}
                            </HeroSignUp>
                        </Col>
                    </Row>
                </Container>
            </LoaderContainer>
        </HeaderHero>
    );
};

type Props = {
    onSignIn: Function,
    onSignOut: Function,
    isSubmitting?: boolean,
    token?: string,
    isAuth?: boolean,
};

Home.defaultProps = {
    isSubmitting: false,
    token: null,
    isAuth: false,
};

export default Home;

const HeaderHero = styled.div`
    background-image: url(${asset('/example/header-bg.jpg')});
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    padding-top: 50px;

    ${media.lg`
        padding-top: 150px;
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

    ${media.lg`
        position: absolute;
        top: 3px;
        right: 3px;
        line-height: 60px;
        padding: 0 40px;
        text-transform: uppercase;
        letter-spacing: 1px;
        width: auto;
        height: auto;
    `}
`;

const HeroTitle = styled.h1`
    font-size: 28px;

    font-weight: 400;
    color: #000;

    b {
        font-weight: 700;
    }

    span {
        color: #f14836;
        display: contents;
    }

    ${media.lg`
        font-size: 60px;
    `}
`;

const HeroText = styled.p`
    font-family: 'Nunito', sans-serif;
    max-width: 490px;
    font-size: 16px;

    font-weight: 400;
    line-height: 24px;
    color: #798795;
    margin-bottom: 50px;
`;

const HeroSignUp = styled.div`
    position: relative;
    z-index: 9;

    input {
        width: 100%;
        height: 56px;
        border: 0;
        border-radius: 50px;
        padding: 0 30px;
        background-color: #fff;
        box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.05);
        margin-bottom: 10px;
    }

    ${media.lg`
        input {
            height: 70px;
            font-size: 24px;
        }
    `}
`;

