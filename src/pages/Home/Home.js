var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { media, Col, Container, Row } from '@styled-bs-grid';
import { asset } from '@config/utils/getAssetPrefix';
const Home = (props) => {
    const { intl: { formatMessage: i18n }, onSignIn, isSubmitting, isAuth, token, onSignOut, } = props;
    const { handleSubmit, register, reset } = useForm();
    const onSubmit = (formData) => __awaiter(void 0, void 0, void 0, function* () {
        const schema = yup.object().shape({
            email: yup.string()
                .email(i18n({ id: 'errorForm.invalid' }, { name: i18n({ id: 'page.contact.label.email' }) }))
                .required(i18n({ id: 'errorForm.require' }, { name: i18n({ id: 'page.contact.label.email' }) })),
        });
        const validateResult = yield schema.validate(formData).catch((error) => {
            alert(error.message);
            return false;
        });
        if (validateResult) {
            // 驗證成功
            onSignIn(formData, reset);
        }
    });
    const renderForm = () => {
        if (token) {
            return (React.createElement("div", null,
                React.createElement("textarea", { style: { width: '100%', height: '200px' }, defaultValue: token }),
                React.createElement(Button, { as: "button", className: "btn btn-block", type: "button", onClick: onSignOut }, i18n({ id: 'button.signOut' }))));
        }
        return (React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
            React.createElement("input", { type: "text", placeholder: i18n({ id: 'page.home.email' }), name: "email", ref: register }),
            React.createElement(Button, { type: "submit", className: "btn btn-block" }, i18n({ id: 'button.signIn' }))));
    };
    return (React.createElement(HeaderHero, { className: "d-lg-flex" },
        React.createElement(Container, null,
            React.createElement(Row, null,
                React.createElement(Col, { lg: 14 },
                    React.createElement(HeroTitle, { dangerouslySetInnerHTML: { __html: i18n({ id: 'page.home.heroTitle' }) } }),
                    React.createElement(HeroText, { className: "text" }, i18n({ id: 'page.home.heroText' })),
                    React.createElement(HeroSignUp, null, renderForm()))))));
};
Home.defaultProps = {
    isSubmitting: false,
    token: null,
    isAuth: false,
};
export default Home;
const HeaderHero = styled.div `
    background-image: url(${asset('/example/header-bg.jpg')});
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    padding-top: 50px;

    ${media.lg `
        padding-top: 150px;
    `}
`;
const Button = styled.button `
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

    ${media.lg `
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
const HeroTitle = styled.h1 `
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

    ${media.lg `
        font-size: 60px;
    `}
`;
const HeroText = styled.p `
    font-family: 'Nunito', sans-serif;
    max-width: 490px;
    font-size: 16px;

    font-weight: 400;
    line-height: 24px;
    color: #798795;
    margin-bottom: 50px;
`;
const HeroSignUp = styled.div `
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

    ${media.lg `
        input {
            height: 70px;
            font-size: 24px;
        }
    `}
`;
//# sourceMappingURL=Home.js.map