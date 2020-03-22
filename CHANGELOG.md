# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.1.2 (2020-03-22)


### Features

* 新增 @storybook/addon-console 套件, 輔助開發 storybook 元件 ([245a899](https://github.com/imagine10255/imrazzle-js/commit/245a89941e15cc7e0dc8d50a99d8f8128d682603))
* 新增 404頁面 ([a0998d1](https://github.com/imagine10255/imrazzle-js/commit/a0998d1d1259c2ae69222fdc247befcba5d52807))
* 新增 API設定套用Site與Redux設定 ([61dadbc](https://github.com/imagine10255/imrazzle-js/commit/61dadbcf7f6a3841bc51de27f4305dbdde31d5eb))
* 新增 babel設定到storybook ([de6cdba](https://github.com/imagine10255/imrazzle-js/commit/de6cdba65fe3c179c1af549a3a8d8c1833602912))
* 新增 Button, PlayButton元件 ([f049647](https://github.com/imagine10255/imrazzle-js/commit/f0496470d7bf21f11f8aae71f855098e89cbab77))
* 新增 Button元件 ([be94994](https://github.com/imagine10255/imrazzle-js/commit/be94994ab6b537e53943163150b3f1e4607f1e28)), closes [#Bzv1](https://github.com/imagine10255/imrazzle-js/issues/Bzv1)
* 新增 CZ功能 ([bbf6497](https://github.com/imagine10255/imrazzle-js/commit/bbf6497494b46d9dfcb09cf3e7ed48d2ebe1b5d0))
* 新增 CZ提交選擇, 版本合併標籤 ([9d7f18f](https://github.com/imagine10255/imrazzle-js/commit/9d7f18f776ba997e88167f03dcfc4032fbc0baa4))
* 新增 DateInput元件 ([a122675](https://github.com/imagine10255/imrazzle-js/commit/a1226754271e8916fa706ed7ab1c3b0363067108))
* 新增 DatePickerInput元件 ([9cbfb6b](https://github.com/imagine10255/imrazzle-js/commit/9cbfb6bb848b3ace1ca2a32784bf7f6ade5c69af)), closes [#42a30](https://github.com/imagine10255/imrazzle-js/issues/42a30)
* 新增 datePicker元件 ([ab4dee4](https://github.com/imagine10255/imrazzle-js/commit/ab4dee49b3df5a75543be39d61c00d4f62ea4de3))
* 新增 HeartButton元件 ([e37a224](https://github.com/imagine10255/imrazzle-js/commit/e37a224f7e20139bd213e64978556670ac4ffe7e))
* 新增 Home頁面 新增, 登入登出範例 ([e611d9d](https://github.com/imagine10255/imrazzle-js/commit/e611d9d434617228c351a9a2456678c545b25116))
* 新增 icon arrow-right ([a385fcf](https://github.com/imagine10255/imrazzle-js/commit/a385fcf071ed4983adf4c07a6f7b48c3e3205db0))
* 新增 Input元件 ([c62934a](https://github.com/imagine10255/imrazzle-js/commit/c62934a642319c2025aa5058098c606e55151828))
* 新增 nodejs 版本檢查, 與說明資訊 ([85ca4e0](https://github.com/imagine10255/imrazzle-js/commit/85ca4e058b4ef757e03dc584dfaf2b554dbe8852))
* 新增 Profile頁面 ([3c1e764](https://github.com/imagine10255/imrazzle-js/commit/3c1e7642f9eb2c50e119c28f753d6621d0529469))
* 新增 reverse proxy 對應設定內容 ([9322e8a](https://github.com/imagine10255/imrazzle-js/commit/9322e8aec5520131ccf44ea666980c583972f19a))
* 新增 TimePicker元件 ([0a40596](https://github.com/imagine10255/imrazzle-js/commit/0a40596402d4d6209b4eb44f1e0d55d68c934c81))
* 新增 Tooltips元件 ([11f4cbc](https://github.com/imagine10255/imrazzle-js/commit/11f4cbcf235ff0353e7375c3987d3cee5f7e7adc))
* 新增 utils 項目 (array, browser, dom, format, log, number, openWindow, uri) ([8a09051](https://github.com/imagine10255/imrazzle-js/commit/8a09051b4879c402cf563e8671c4ff148dcdecf6))
* 新增 路由保護機制 PrivateRoute, 綁定token (並且在有效期限exp內) ([0eaaf66](https://github.com/imagine10255/imrazzle-js/commit/0eaaf6654c6f3032b3f8b9db84308db29d2a7ecb))
* 更改 .env.dev 改成 .env.local. 做為預設 env ([0d24ba1](https://github.com/imagine10255/imrazzle-js/commit/0d24ba1c8c0a53477276aa623603cde8b98c19fc))
* 更改 styled-bootstrap-grid 改為 styled-bs-grid ([52931fc](https://github.com/imagine10255/imrazzle-js/commit/52931fcc2bd16c0baabf78840a773836c56e16c7))
* 更改 升級styled-bootstrap-grid為作者版本3.1.0 ([6a5d833](https://github.com/imagine10255/imrazzle-js/commit/6a5d83362e7625064431b93ee0cbfdd37b8ad807))
* 更改 移除PRELOAD_STATE types ([714e0cf](https://github.com/imagine10255/imrazzle-js/commit/714e0cfa733a939496605119cb1cfe8f9e3e025e))
* 更改 路由基礎路徑可由環境參數設定 ([4935243](https://github.com/imagine10255/imrazzle-js/commit/49352439b3f62aaff2b60c6fb5bb93a02889af5e))


### Bug Fixes

* 修正 404頁面目前只能由前端提供 ([8b1a35b](https://github.com/imagine10255/imrazzle-js/commit/8b1a35b8a41df00116bfa349db5a8744562c8213))
* 修正 Build階段無法取得Server環境參數的問題 ([0ab8594](https://github.com/imagine10255/imrazzle-js/commit/0ab8594403e423a4bd4e0cbc060f9333bb24b136))
* 修正 dotenv Can't resolve 'fs' 錯誤 ([9e28bf3](https://github.com/imagine10255/imrazzle-js/commit/9e28bf321967c59f4d3a5b6b8e0a8e753dd958fd))
* 修正 env.routePrefixPath 未設定取得時為 undefined, 導致使用到的路徑錯誤(server.static()) ([ce1421e](https://github.com/imagine10255/imrazzle-js/commit/ce1421ebac233cbbe8c7380337ad6755fac364de))
* 修正 Input 傳入Ref的方法, defaultProps 失效, type 提示 ([f8c9137](https://github.com/imagine10255/imrazzle-js/commit/f8c9137717f35270fabb040b72aadb2edd5859b3))
* 修正 routePrefixPath 未加 env => env.routePrefixPath ([434a4ee](https://github.com/imagine10255/imrazzle-js/commit/434a4ee37e2e8a3834945af1016a5ca09cd42dc5))
* 修正 Sample頁面 跑版問題 ([b53af67](https://github.com/imagine10255/imrazzle-js/commit/b53af678eb2e124d3f3b2c6bc5ac7cef3724027a))
* 修正 SecurityCode 傳入Ref的方法, defaultProps 失效, type 提示 ([ee5cdf3](https://github.com/imagine10255/imrazzle-js/commit/ee5cdf3fd66e91690355448796656cea84a8abd2))
* 修正 storybook webpack 提取CSS設定造成的問題 ([540a215](https://github.com/imagine10255/imrazzle-js/commit/540a215ca2cb0a1712cbfca2e2f4afe815907bbf))
* 修正 utils test (number, uri) ([387dc65](https://github.com/imagine10255/imrazzle-js/commit/387dc65e0fdb33c299bdee011e99732089af36a8))
* 修正 yarn cz設定 ([6ec3281](https://github.com/imagine10255/imrazzle-js/commit/6ec328122c04f3c50edc6931271963983c490685))
* 修正 最新消息Saga Api Response data 改為 body ([fddd4a3](https://github.com/imagine10255/imrazzle-js/commit/fddd4a3fb2e6154da8cf76381709b8eba87500ec))
* 修正 安裝錯誤套件 loadsh fix to lodash ([a83acb6](https://github.com/imagine10255/imrazzle-js/commit/a83acb6fcd12cd0a88ba6868779f46aa0190570f))
* 修正 說明文件 ([ae105ab](https://github.com/imagine10255/imrazzle-js/commit/ae105abc35bbdc7213d4a3ead859c7e94c2c0e0f))
* 修至 storybook 因 serverGenerate 參數更改 導致開啟失效 ([15af718](https://github.com/imagine10255/imrazzle-js/commit/15af718257f0deb67709606215a018ac8f842efe))

### 0.1.1 (2020-02-26)


### Features

* 新增 CZ功能 ([bbf6497](http://ycgit.o168.net:10022/imaginechiu/test-razzle/commit/bbf6497494b46d9dfcb09cf3e7ed48d2ebe1b5d0))
* 新增 CZ提交選擇, 版本合併標籤 ([9d7f18f](http://ycgit.o168.net:10022/imaginechiu/test-razzle/commit/9d7f18f776ba997e88167f03dcfc4032fbc0baa4))


### Bug Fixes

* 修正 yarn cz設定 ([6ec3281](http://ycgit.o168.net:10022/imaginechiu/test-razzle/commit/6ec328122c04f3c50edc6931271963983c490685))
