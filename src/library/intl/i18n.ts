/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
const langConfig = {
    'zh-CN': require('../../resources/lang/zh-CN').default,
    'en-US': require('../../resources/lang/en-US').default,
    // 'th-TH': require('../../resources/lang/th-TH.json'),
    // 'vi-VN': require('../../resources/lang/vi-VN.json'),
};

// const DEFAULT_LOCALE = siteConfig.defaultLang || 'zh-CN';
export const DEFAULT_LOCALE = 'en-US';

const formatTranslationMessages: any = (locale: string, messages: any) => {
    const defaultFormattedMessages = locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, langConfig[DEFAULT_LOCALE]) : {};
    const flattenFormattedMessages = (formattedMessages: any, key: string) => {
        const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE ? defaultFormattedMessages[key] : messages[key];
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
