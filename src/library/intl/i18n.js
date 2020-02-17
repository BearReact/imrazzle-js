/* eslint-disable global-require */
/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
// const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line

const langConfig = {
    'zh-CN': require('../../resources/lang/zh-CN.js').default,
    'en-US': require('../../resources/lang/en-US.js').default,
    // 'th-TH': require('../../resources/lang/th-TH.json'),
    // 'vi-VN': require('../../resources/lang/vi-VN.json'),
};


// 載入地區設定 (時間區的顯示, ex: 18:00 PM => 晚上6點)
// addLocaleData([
//     ...require('react-intl/locale-data/en'),
//     ...require('react-intl/locale-data/zh'),
//     ...require('react-intl/locale-data/th'),
//     ...require('react-intl/locale-data/vi'),
// ]);

// const DEFAULT_LOCALE = siteConfig.defaultLang || 'zh-CN';
const DEFAULT_LOCALE = 'en-US';


const formatTranslationMessages = (locale, messages) => {
    const defaultFormattedMessages =
        locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, langConfig[DEFAULT_LOCALE]) : {};
    const flattenFormattedMessages = (formattedMessages, key) => {
        const formattedMessage =
            !messages[key] && locale !== DEFAULT_LOCALE ? defaultFormattedMessages[key] : messages[key];
        return Object.assign(formattedMessages, {[key]: formattedMessage});
    };
    return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

export const translationMessages = {
    'en-US': formatTranslationMessages('en-US', langConfig['en-US']),
    'zh-CN': formatTranslationMessages('zh-CN', langConfig['zh-CN']),
    // 'th-TH': formatTranslationMessages('th-TH', langConfig['th-TH']),
    // 'vi-VN': formatTranslationMessages('vi-VN', langConfig['vi-VN']),
};


// exports.appLocales = appLocales;
// exports.formatTranslationMessages = formatTranslationMessages;
// exports.translationMessages = translationMessages;
// exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
