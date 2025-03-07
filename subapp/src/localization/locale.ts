import i18n from 'i18n-js';
// @ts-ignore
import { enUS, esES, format, parseISO, Locale } from 'date-fns';

import ES from '../lang/esES.json';
import EN from '../lang/enUS.json';

interface Translations {
  [key: string]: typeof EN | typeof ES;
}

interface LocaleModule {
  currentDateLocale: Locale | null;
  i18n: typeof i18n;
  init: () => void;
  t: (key: string, params?: Record<string, unknown>) => string;
  setCurrentLanguage: (input: string) => void;
  formatDate: (date: Date | number, formatStr: string) => string;
  parseISODate: (date: string) => Date;
  getDeviceLocale: () => string;
  getDeviceLocaleForDate: () => Locale;
  formatLanguageUnderscore: (language?: string, dash?: boolean) => string;
  getLanguageName: (language: string) => string | null;
  languageByDefault: () => string;
  locale?: string;
}

const supportedLocales: Translations = {
  'en-US': EN,
  'es-ES': ES,
};

const Localization = {
  locale: 'en-US',
};

const fallbackLanguage = 'en-US';
const fallbackDateLocale = enUS;
const dateLocales: Record<string, Locale> = { enUS, esES };

const locale: LocaleModule = {
  currentDateLocale: null,

  i18n,
  init() {
    i18n.locale = 'en-US';
    i18n.fallbacks = true;
    i18n.defaultLocale = fallbackLanguage;
    i18n.translations = supportedLocales;

    if (supportedLocales[Localization.locale]) {
      i18n.translations[Localization.locale] =
        supportedLocales[Localization.locale];
      this.currentDateLocale =
        dateLocales[Localization.locale.replace('-', '')] || null;
    } else {
      i18n.translations[fallbackLanguage] = supportedLocales[fallbackLanguage];
      this.currentDateLocale = fallbackDateLocale;
    }
  },

  t(key, params) {
    return i18n.t(key, params);
  },

  setCurrentLanguage(input) {
    const newLocal = input.replace('_', '-');
    i18n.locale = newLocal;
    i18n.translations = {};
    if (supportedLocales[newLocal]) {
      i18n.translations[newLocal] = supportedLocales[newLocal];
    }
  },

  formatDate(date, formatStr) {
    try {
      return format(date, formatStr, { locale: this.getDeviceLocaleForDate() });
    } catch (error: any) {
      throw new Error(
        `${error.message} - Params: Date: ${date} - Format String: ${formatStr}`,
      );
    }
  },

  parseISODate(date) {
    return parseISO(date);
  },

  getDeviceLocale() {
    if (supportedLocales[Localization.locale]) {
      return i18n.locale;
    } else {
      return fallbackLanguage;
    }
  },

  getDeviceLocaleForDate() {
    return this.currentDateLocale || fallbackDateLocale;
  },

  formatLanguageUnderscore(language, dash) {
    switch (language) {
      case 'en':
      case 'en-US':
      case 'en_US':
        return dash ? 'en-US' : 'en_US';
      case 'es':
      case 'es-ES':
      case 'es_ES':
        return dash ? 'es-ES' : 'es_ES';
      default:
        return dash ? 'en-US' : 'en_US';
    }
  },

  getLanguageName(language) {
    const formattedLanguage = this.formatLanguageUnderscore(language, true);
    return supportedLocales[formattedLanguage] ? formattedLanguage : null;
  },

  languageByDefault() {
    return this.formatLanguageUnderscore('', true);
  },
};

export default locale;
