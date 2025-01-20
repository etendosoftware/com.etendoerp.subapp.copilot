import { StyleSheet } from 'react-native';
import { styles, styleMarkdown } from '../../../src/components/text-message/MarkdownUtils.styles';
import {
  INITIAL_100,
  NEUTRAL_0,
  NEUTRAL_300,
  NEUTRAL_800,
  PRIMARY_100,
  PRIMARY_20,
  TERTIARY_70,
} from '../../../src/styles/colors';

// Mock StyleSheet
jest.mock('react-native', () => ({
  StyleSheet: {
    create: (styles: any) => styles,
    flatten: (style: any) => style,
  },
}));

describe('MarkdownUtils Styles', () => {
  beforeEach(() => {
    // Limpiar cualquier mock antes de cada test
    jest.clearAllMocks();
  });

  describe('Basic Text Styles', () => {
    it('should have correct bold text styles', () => {
      const expectedStyle = {
        fontWeight: 'bold',
      };
      expect(styles.boldText).toMatchObject(expectedStyle);
    });

    it('should have correct italic text styles', () => {
      const expectedStyle = {
        fontStyle: 'italic',
      };
      expect(styles.italicText).toMatchObject(expectedStyle);
    });

    it('should have correct paragraph styles', () => {
      const expectedStyle = {
        margin: 0,
        padding: 0,
        lineHeight: 20,
        color: NEUTRAL_800,
        fontWeight: '500',
      };
      expect(styles.paragraph).toMatchObject(expectedStyle);
    });

    it('should have correct list item styles', () => {
      const expectedStyle = {
        fontWeight: '700',
      };
      expect(styles.listItem).toMatchObject(expectedStyle);
    });
  });

  describe('Copy Button Styles', () => {
    it('should have correct copy button container styles', () => {
      const expectedStyle = {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 5,
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
        backgroundColor: PRIMARY_20,
        gap: 5,
      };
      expect(styles.copyButton).toMatchObject(expectedStyle);
    });

    it('should have correct copy button text styles', () => {
      const expectedStyle = {
        color: NEUTRAL_0,
        fontSize: 12,
      };
      expect(styles.copyButtonText).toMatchObject(expectedStyle);
    });
  });

  describe('Link and Code Styles', () => {
    it('should have correct link text styles', () => {
      const expectedStyle = {
        color: INITIAL_100,
        fontWeight: '600',
        textDecorationLine: 'underline',
      };
      expect(styles.linkText).toMatchObject(expectedStyle);
    });

    it('should have correct inline code styles', () => {
      const expectedStyle = {
        backgroundColor: TERTIARY_70,
        paddingHorizontal: 4,
        borderRadius: 4,
        color: PRIMARY_100,
        fontWeight: '700',
      };
      expect(styles.inlineCode).toMatchObject(expectedStyle);
    });
  });

  describe('Markdown Image Styles', () => {
    it('should have correct image container link styles', () => {
      const expectedStyle = {
        textDecoration: 'none',
      };
      expect(styleMarkdown.imgContainerLink).toMatchObject(expectedStyle);
    });

    it('should have correct image container styles', () => {
      const expectedStyle = {
        margin: 8,
        transition: 'background-color 0.3s ease',
        border: `1px solid ${NEUTRAL_300}`,
        borderRadius: 8,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      };
      expect(styleMarkdown.imgContainer).toMatchObject(expectedStyle);
    });
  });

  describe('Style Sheet Usage', () => {
    it('should be created using StyleSheet.create', () => {
      // Verificar que styles es un objeto
      expect(typeof styles).toBe('object');
      expect(styles).not.toBeNull();
      
      // Verificar que tiene las propiedades esperadas
      expect(styles).toHaveProperty('boldText');
      expect(styles).toHaveProperty('italicText');
      expect(styles).toHaveProperty('copyButton');
      expect(styles).toHaveProperty('copyButtonText');
    });
  });
});