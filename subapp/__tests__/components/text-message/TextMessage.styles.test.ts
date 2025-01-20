import { Platform } from 'react-native';
import { styles } from "../../../src/components/text-message/TextMessage.styles";
import { AppPlatform } from '../../../src/helpers/utilsTypes';

import {
  DANGER_100,
  DANGER_900,
  NEUTRAL_0,
  NEUTRAL_100,
  NEUTRAL_1000,
  NEUTRAL_200,
  NEUTRAL_400,
  TERTIARY_30,
  TERTIARY_100,
} from "../../../src/styles/colors";


describe('Message Styles', () => {
  describe('scrollViewContent', () => {
    it('should have correct base styles', () => {
      expect(styles.scrollViewContent).toEqual({
        width: '100%',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      });
    });
  });


    describe('on mobile platform', () => {
      beforeEach(() => {
        Platform.OS = 'ios'; // or 'android'
      });

      it('should have zero margin bottom', () => {
        expect(styles.messageContainer.marginBottom).toBe(0);
      });
    });

    it('should have correct base styles', () => {
      expect(styles.messageContainer).toMatchObject({
        padding: 8,
        borderRadius: 8,
        flexDirection: 'column',
        maxWidth: '100%',
      });
    });
  });

  describe('message types', () => {
    it('should have correct user message styles', () => {
      expect(styles.userMessage).toEqual({
        alignSelf: 'flex-end',
      });
    });

    it('should have correct bot message styles', () => {
      expect(styles.botMessage).toEqual({
        backgroundColor: NEUTRAL_0,
        alignSelf: 'flex-start',
        borderTopRightRadius: 8,
      });
    });

    it('should have correct error message styles', () => {
      expect(styles.errorMessage).toEqual({
        backgroundColor: DANGER_100,
        alignSelf: 'flex-start',
        borderTopRightRadius: 8,
      });
    });
  });

  describe('message bubbles', () => {
    it('should have correct user message bubble styles', () => {
      expect(styles.userMessageBubble).toEqual({
        flexDirection: 'column',
        backgroundColor: TERTIARY_30,
        borderTopLeftRadius: 8,
      });
    });

    it('should have correct bot message bubble styles', () => {
      expect(styles.botMessageBubble).toEqual({
        flexDirection: 'column',
      });
    });

    it('should have correct base message bubble styles', () => {
      expect(styles.messageBubble).toEqual({
        padding: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        flexDirection: 'column',
        justifyContent: 'space-between',
      });
    });
  });

  describe('file containers', () => {
    it('should have correct base file container styles', () => {
      expect(styles.fileContainer).toEqual({
        marginTop: 2,
        marginBottom: 4,
        padding: 8,
        borderRadius: 8,
        borderColor: NEUTRAL_400,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
      });
    });

    it('should have correct right user file container styles', () => {
      expect(styles.rightUserFileContainer).toEqual({
        backgroundColor: NEUTRAL_0,
      });
    });

    it('should have correct other user file container styles', () => {
      expect(styles.otherUserFileContainer).toEqual({
        backgroundColor: NEUTRAL_200,
      });
    });
  });

  describe('text styles', () => {
    it('should have correct title styles', () => {
      expect(styles.title).toEqual({
        color: NEUTRAL_1000,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
      });
    });

    it('should have correct message text styles', () => {
      expect(styles.messageText).toEqual({
        color: TERTIARY_100,
        fontSize: 14,
      });
    });

    it('should have correct user message text styles', () => {
      expect(styles.userMessageText).toEqual({
        color: TERTIARY_100,
      });
    });

    it('should have correct bot message text styles', () => {
      expect(styles.botMessageText).toEqual({
        color: NEUTRAL_100,
      });
    });

    it('should have correct error message text styles', () => {
      expect(styles.errorMessageText).toEqual({
        color: DANGER_900,
      });
    });
  });

  describe('timestamp styles', () => {
    it('should have correct default timestamp styles', () => {
      expect(styles.defaultTimestamp).toEqual({
        color: TERTIARY_100,
        fontSize: 12,
        paddingTop: 4,
        alignSelf: 'flex-end',
      });
    });

    it('should have correct error timestamp styles', () => {
      expect(styles.errorTimestamp).toEqual({
        color: DANGER_900,
        fontSize: 12,
        paddingTop: 4,
        alignSelf: 'flex-end',
      });
    });
  });
