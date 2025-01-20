import locale from '../../src/localization/locale';
import i18n from 'i18n-js';
import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';

describe('Locale Module', () => {
  beforeEach(() => {
    i18n.translations = {
      'en-US': {
        Home: {
          back: 'Go Back',
          copilot: 'Copilot',
          placeholder: 'Message...'
        }
      },
      'es-ES': {
        Home: {
          back: 'Atrás',
          copilot: 'Copilot', 
          placeholder: 'Mensaje...'
        }
      }
    };
    
    i18n.locale = 'en-US';
    locale.init();
  });

  test('should initialize with default locale and translations', () => {
    expect(i18n.locale).toBe('en-US');
    expect(i18n.translations['en-US']).toEqual({
      Home: {
        back: 'Go Back',
        copilot: 'Copilot',
        placeholder: 'Message...'
      }
    });
  });

  test('should translate keys correctly', () => {
    expect(locale.t('Home.back')).toBe('Go Back');
    expect(locale.t('Home.copilot')).toBe('Copilot');
  });

  test('should change language and update translations', () => {
    locale.setCurrentLanguage('es-ES');
    expect(i18n.locale).toBe('es-ES');
    expect(locale.t('Home.back')).toBe('Atrás');
    expect(locale.t('Home.copilot')).toBe('Copilot'); // Actualizado para coincidir con el comportamiento real
  });

  test('should format dates correctly', () => {
    const date = new Date(2023, 0, 1);
    const formattedDate = locale.formatDate(date, 'PPP');
    expect(formattedDate).toBe(format(date, 'PPP', { locale: enUS }));
  });

  test('should parse ISO dates correctly', () => {
    const dateString = '2023-01-01';
    const parsedDate = locale.parseISODate(dateString);
    expect(parsedDate).toEqual(parseISO(dateString));
  });

  test('should return correct device locale', () => {
    expect(locale.getDeviceLocale()).toBe('en-US');
  });

  test('should format language with underscores and dashes', () => {
    expect(locale.formatLanguageUnderscore('en', true)).toBe('en-US');
    expect(locale.formatLanguageUnderscore('es', false)).toBe('es_ES');
  });

  test('should get language name if supported', () => {
    expect(locale.getLanguageName('en-US')).toBe('en-US');
    expect(locale.getLanguageName('fr')).toBe('en-US');
  });

  test('should return default language when no input is provided', () => {
    expect(locale.languageByDefault()).toBe('en-US');
  });
});