/* Import React & React Native elements */
import React, { useState, useRef, useEffect, Suspense } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  UIManager,
  Platform,
  Text,
  ActivityIndicator,
} from 'react-native';

/* Import custom components */
import { Header } from '../../components/header';
import { AnimatedMessage } from '../../components/animated-message';
import { LevitatingImage } from '../../components/levitating-image';
import { DropdownInput, FileSearchInput } from 'etendo-ui-library';

/* Import styles */
import { styles } from './style';

/* Import hooks, interfaces, utils & helpers */
import locale from '../../localization/locale';
import { Global } from '../../../lib/GlobalConfig';
import { References } from '../../utils/references';
import { AppPlatform } from '../../helpers/utilsTypes';
import { useAssistants } from '../../hooks/useAssistants';
import { IHomeProps, ILabels, IMessage } from '../../interfaces';
import { RestUtils, isDevelopment } from '../../utils/environment';
import { formatTimeNewDate, scrollToEnd } from '../../utils/functions';
import { LOADING_MESSAGES, ROLE_BOT, ROLE_ERROR, ROLE_USER } from '../../utils/constants';

/* If the platform is Android, enable LayoutAnimation */
if (Platform.OS === AppPlatform.android) {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

/* Render the Home screen */
const Home: React.FC<IHomeProps> = ({ navigationContainer }) => {
  // State variables
  const [labels, setLabels] = useState<ILabels>({});
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isCopilotProcessing, setIsCopilotProcessing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [fileId, setFileId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

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

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!isCopilotProcessing) {
      const question = inputValue.trim();
      setInputValue('');
      setIsCopilotProcessing(true);
      if (!question) return;

      // Add user message
      const newUserMessage: IMessage = {
        text: question,
        sender: ROLE_USER,
        type: 'right-user',
        timestamp: formatTimeNewDate(new Date()),
      };

      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setInputValue('');

      // Scroll to end of the conversation after sending the message
      scrollToEnd(scrollViewRef);

      // Prepare query parameters
      const queryParams = new URLSearchParams({
        app_id: selectedOption?.app_id || '',
        question: question,
      });

      if (conversationId) {
        queryParams.append('conversation_id', conversationId);
      }

      // Prepare request body
      const requestBody: {
        file?: string | null;
      } = {};

      if (fileId) {
        requestBody.file = fileId;
      }

      // Send the question to the server with query params
      try {
        const response = await fetch(`${Global.url}${Global.contextPathUrl}/${References.url.SWS}/${References.url.COPILOT}/${References.url.SEND_QUESTION}?${queryParams.toString()}`, {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Global.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error in fetching data');
        }

        const data = await response.json();
        const copilot = data.response;
        setConversationId(data.conversation_id);

        const newBotMessage: IMessage = {
          text: copilot,
          sender: ROLE_BOT,
          type: 'left-user',
          timestamp: formatTimeNewDate(new Date()),
        };

        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
        setIsCopilotProcessing(false);

        scrollToEnd(scrollViewRef);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setIsCopilotProcessing(false);
      }
    }
  };

  // Update file state
  const handleFileId = (uploadedFile: { file: string }) => {
    setFileId(uploadedFile.file);
  };

  // Manage error
  const handleOnError = async (errorResponse: { error?: string; answer?: { error?: string } } | string) => {
    let errorMessage = '';

    if (typeof errorResponse === 'object') {
      errorMessage = errorResponse.error || errorResponse.answer?.error || '';
    } else if (typeof errorResponse === 'string') {
      errorMessage = errorResponse;
    }

    const newErrorMessage: IMessage = {
      text: errorMessage,
      sender: ROLE_ERROR,
      timestamp: formatTimeNewDate(new Date()),
    };

    setMessages((prevMessages) => [...prevMessages, newErrorMessage]);
  };

  /* Secondary Effects */
  // Effect to retrieve labels & assistants on component mount
  useEffect(() => {
    getLabels();
    getAssistants();
  }, []);

  return (
    <Suspense fallback={<ActivityIndicator />}>
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
              <AnimatedMessage key={index}>
                <View key={index} style={[
                  styles.messageText,
                  message.sender === ROLE_USER ? styles.messageUser : styles.messageBot
                ]}>
                  <Text>{message.text}</Text>
                </View>
              </AnimatedMessage>
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
            placeholder={labels.ETCOP_Message_Placeholder || locale.t('Home.placeholder')}
            onChangeText={(text) => setInputValue(text)}
            onSubmit={handleSendMessage}
            onSubmitEditing={handleSendMessage}
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
    </Suspense>
  );
};

export default Home;
