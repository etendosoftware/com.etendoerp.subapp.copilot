/* Import React & React Native elements */
import React, { useState, useRef, useEffect, Suspense } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  UIManager,
  Platform,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

/* Import custom components */
import { Header } from '../../components/header';
import { AnimatedMessage } from '../../components/animated-message';
import { LevitatingImage } from '../../components/levitating-image';
import { DropdownInput, FileSearchInput, TextMessageRN } from 'etendo-ui-library';

/* Import styles */
import { styles } from './style';

/* Import hooks, interfaces, utils & helpers */
import locale from '../../localization/locale';
import { Global } from '../../../lib/GlobalConfig';
import { References } from '../../utils/references';
import { RestUtils } from '../../utils/environment';
import { AppPlatform } from '../../helpers/utilsTypes';
import { useAssistants } from '../../hooks/useAssistants';
import { IHomeProps, ILabels, IMessage } from '../../interfaces';
import { formatTimeNewDate, scrollToEnd } from '../../utils/functions';
import { KEYBOARD_BEHAVIOR, KEYBOARD_VERTICAL_OFFSET, LOADING_MESSAGES, ROLE_BOT, ROLE_ERROR, ROLE_USER } from '../../utils/constants';

/* If the platform is Android, enable LayoutAnimation */
if (Platform.OS === AppPlatform.android) {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

/* Render the Home screen */
const Home: React.FC<IHomeProps> = ({ navigationContainer }) => {
  // State variables
  const [file, setFile] = useState<any>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [labels, setLabels] = useState<ILabels>({});
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isCopilotProcessing, setIsCopilotProcessing] = useState<boolean>(false);

  // Refs
  const messagesEndRef = useRef<ScrollView | null>(null);
  const scrollViewRef = useRef<ScrollView | null>(null);

  // Custom hooks
  const { selectedOption, assistants, getAssistants, handleOptionSelected } = useAssistants();

  // Constants
  const noAssistants = assistants?.length === 0;

  // Get labels from the server
  const getLabels = async () => {
    const requestOptions: RequestInit = {
      method: 'GET',
    };
    const response = await RestUtils.fetch(References.url.GET_LABELS, requestOptions);
    const data: ILabels = await response.json();
    if (data) {
      setLabels(data);
    }
  };

  // Handle file upload and message sending
  const handleFileAndMessage = async (message: string, appId: string) => {
    try {
      // Send the message with the file reference
      const response = await sendMessage(message, appId, fileId, conversationId);

      // Update the conversation with the bot's response
      const newBotMessage: IMessage = {
        text: response.response,
        sender: ROLE_BOT,
        type: 'left-user',
        timestamp: formatTimeNewDate(new Date()),
      };

      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      setIsCopilotProcessing(false);

      scrollToEnd(scrollViewRef);
    } catch (error) {
      console.error(error);
      setIsCopilotProcessing(false);
    }
  };

  // Handles ID received from file uploaded in the server
  const handleFileId = (uploadedFile: any) => {
    setFileId(uploadedFile.file);
  };

  // Send message function
  const sendMessage = async (question: string, appId: string, fileId: string | null, conversationId: string | null) => {
    try {
      const params = new URLSearchParams({
        question,
        app_id: appId,
        file: fileId || '',
        conversation_id: conversationId || '',
      });

      const response = await fetch(`${Global.url}${Global.contextPathUrl}/${References.url.SWS}/${References.url.COPILOT}/${References.url.SEND_QUESTION}?${params.toString()}`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Global.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (!conversationId) {
          setConversationId(data.conversationId);
        }
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error: any) {
      await handleOnError(error.message);
      throw error;
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!isCopilotProcessing) {
      const question = inputValue.trim();
      setInputValue('');
      setIsCopilotProcessing(true);
      if (!question) return;

      // Add user message to conversation
      const newUserMessage: IMessage = {
        text: question,
        sender: ROLE_USER,
        type: 'right-user',
        file: file,
        timestamp: formatTimeNewDate(new Date()),
      };

      setMessages((prevMessages) => [...prevMessages, newUserMessage]);

      // Scroll to end of the conversation
      scrollToEnd(scrollViewRef);

      // Handle file upload and message sending
      await handleFileAndMessage(question, selectedOption?.app_id || '');
    }
  };

  // Handle file selection
  const handleSetFile = async (newFile: any) => {
    if (newFile !== file) {
      setFile(newFile);
    }
  };

  // Manage error
  const handleOnError = async (errorResponse: { error?: string; answer?: { error?: string } } | string) => {
    let errorMessage = '';

    if (typeof errorResponse === 'object') {
      errorMessage = errorResponse.error || errorResponse.answer?.error || 'An error occurred.';
    } else if (typeof errorResponse === 'string') {
      errorMessage = errorResponse;
    }

    const newErrorMessage: IMessage = {
      text: errorMessage,
      sender: ROLE_ERROR,
      type: 'error',
      timestamp: formatTimeNewDate(new Date()),
    };

    setMessages((prevMessages) => [...prevMessages, newErrorMessage]);

    scrollToEnd(scrollViewRef);
  };

  /* Secondary Effects */
  // Effect to retrieve labels & assistants on component mount
  useEffect(() => {
    getLabels();
    getAssistants();
  }, []);

  const uploadConfig = {
    file: file,
    url: `${Global.url}${Global.contextPathUrl}/${References.url.SWS}/${References.url.COPILOT}/${References.url.UPLOAD_FILE}`,
    method: References.method.POST,
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={KEYBOARD_BEHAVIOR}
      keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeArea}>
          {/* Header & DropdownInput Area */}
          <Header navigationContainer={navigationContainer} />
          <View style={styles.dropdownContainer}>
            <DropdownInput
              value={selectedOption?.name}
              staticData={assistants}
              displayKey="name"
              onSelect={(option) => {
                handleOptionSelected(option);
                setMessages([]);
                setConversationId(null);
              }}
            />
          </View>

          {/* Section to display messages */}
          <ScrollView style={styles.scrollView} ref={messagesEndRef}>
            <View style={styles.messagesContainer}>
              {messages.map((message, index) => (
                <View key={index} style={styles.messageContainer}>
                  <AnimatedMessage>
                    <TextMessageRN
                      type={message.sender === ROLE_USER ? 'right-user' : 'left-user'}
                      text={message.text}
                    />
                  </AnimatedMessage>
                </View>
              ))}
              {isCopilotProcessing && (
                <AnimatedMessage>
                  <View style={styles.animatedMessageContainer}>
                    <LevitatingImage />
                    <Text style={styles.processingText}>{LOADING_MESSAGES[0]}</Text>
                  </View>
                </AnimatedMessage>
              )}
            </View>
          </ScrollView>

          {/* Input Area */}
          <View style={styles.inputContainer}>
            <FileSearchInput
              value={inputValue}
              placeholder={labels.ETSACOP_Message_Placeholder || locale.t('Home.placeholder')}
              onChangeText={(text) => setInputValue(text)}
              onSubmit={handleSendMessage}
              onSubmitEditing={handleSendMessage}
              setFile={handleSetFile}
              uploadConfig={uploadConfig}
              token={Global.token}
              isDisabled={noAssistants}
              isSendDisable={isCopilotProcessing}
              isAttachDisable={isCopilotProcessing}
              onFileUploaded={handleFileId}
              onError={handleOnError}
              multiline
              numberOfLines={7}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Home;
