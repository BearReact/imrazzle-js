<p align="center"><img src="https://user-images.githubusercontent.com/4060187/28923990-050a32d4-782e-11e7-9da7-574ce5a8b455.png" width="400"></p>

## About Imrazzle

Imrazzle is a web application framework with razzle, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Imrazzle takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast React Route Dom](https://reacttraining.com/react-router).
- [Powerful dependency injection redux](https://redux.js.org).
- [Aims to make application side effects library redux-saga](https://redux-saga.js.org).
- [Internationalization-framework intl Language](https://github.com/formatjs/react-intl).
- [Expressive, intuitive Storybook](https://storybook.js.org).
- [delightful JavaScript Testing Framework with a focus on simplicity Jest](https://jestjs.io).
- [Form controller React Hook Form](https://react-hook-form.com).
- [Form validation Yup](https://github.com/jquense/yup).
- [Find and fix problems in your JavaScript code ESLint](https://eslint.org).
- [Quickly build your entire app with our Grid Bootstrap & Styled-component](https://github.com/imagine10255/styled-bootstrap-grid/tree/master).
- [Immutable JS data structures which are backwards-compatible with normal Arrays and Objects.](https://github.com/rtfeldman/seamless-immutable).

Imrazzle is accessible, powerful, and provides tools required for large, robust applications.


## Learning Imrazzle-js

- Razzle [Documentation](https://github.com/jaredpalmer/razzle/blob/master/README.md)
- ImRazzle-js
  - [use Webstorm](https://github.com/imagine10255/imnext-js/blob/master/docs/use-webstorm.md)
  
## How to use

`Check your nodejs version is 13.5.0`


## Environmental parameters

- PORT: 運行埠號
- SITE_ENV: sandbox, staging) production
- SITE_CODE: site code (ref: src/config/site.js, ex: default)
- ROUTE_PREFIX_PATH: route prefix path (ex: /ap-main)
- STATIC_BASE_URL: Static file base url (ex: http://static.com/static, /static)
- API_BASE_URL: API Base path (ex: http://static.com, /api)


#### Quick Start

```zsh
# Clone project
$ clone git@github.com:imagine10255/Imrazzle-js.git my-razzle-project

# Enter folder and Install, then copy environment setting
$ cd my-razzle-project && yarn

# option: if you custom env (default: .env.locale)
$ cp .env.locale .env

# Start develop
$ yarn dev

> 🚀 Ready on http://localhost:3000

# In another terminal panel Run Mocker Api
$ yarn test:mock

```
open browser example in http://localhost:3000

#### Develop

```zsh
# Ready Release Build Docker Image
$ docker-compose build

# Run and Build Docker Image
$ docker-compose up --build

> 🚀 Ready on http://localhost:3000
```
