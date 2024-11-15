/* Import React & React Native elements */
import React, { useState, useRef, useEffect } from 'react';
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
import { formatTimeNewDate } from '../../utils/functions';
import { KEYBOARD_BEHAVIOR, KEYBOARD_VERTICAL_OFFSET, LOADING_MESSAGES, ROLE_BOT, ROLE_ERROR, ROLE_USER } from '../../utils/constants';

/* If the platform is Android, enable LayoutAnimation */
if (Platform.OS === AppPlatform.android) {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

/* Render the Home screen */
const Home: React.FC<IHomeProps> = ({ navigationContainer, sharedFiles }) => {
  // State variables
  const [file, setFile] = useState<any>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [labels, setLabels] = useState<ILabels>({});
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [initialFile, setInitialFile] = useState<File | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isCopilotProcessing, setIsCopilotProcessing] = useState<boolean>(false);

  // Refs
  const scrollViewRef = useRef<ScrollView | null>(null);

  // Custom hooks
  const { selectedOption, assistants, getAssistants, handleOptionSelected } = useAssistants();

  // Constants
  const noAssistants = assistants?.length === 0;

  // Scroll to the end of the messages
  const scrollToEnd = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  // Scroll to bottom when new messages arrive or processing is ongoing
  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollToEnd();
    }, 100);

    return () => clearTimeout(timeout);
  }, [messages, isCopilotProcessing]);

  // Get labels
  const getLabels = async () => {
    const requestOptions: RequestInit = { method: 'GET' };
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

      const requestUrl = `${Global.url}${Global.contextPathUrl}/${References.url.SWS}/${References.url.COPILOT}/${References.url.SEND_QUESTION}?${params.toString()}`;

      const requestBody = {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Global.token}`,
        },
      };

      const response = await fetch(requestUrl, requestBody);

      if (response.ok) {
        const data = await response.json();
        if (!conversationId) {
          setConversationId(data.conversation_id);
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
      // Handle file upload and message sending
      await handleFileAndMessage(question, selectedOption?.app_id || '');
    }
  };

  // Handle file selection
  const handleSetFile = async (newFile: any) => {
    if (newFile !== file) {
      setFile(newFile);
      setInitialFile(null);
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
  };

  /* Secondary Effects */
  // Effect to retrieve labels & assistants on component mount
  useEffect(() => {
    getLabels();
    getAssistants();
  }, []);

  // If sharedFiles is not empty, set the file
  useEffect(() => {
    if (sharedFiles && sharedFiles.length > 0) {
      const sharedFile = sharedFiles[0];
      const mappedFile: any = {
        name: sharedFile.fileName,
        type: sharedFile.fileMimeType,
        uri: sharedFile.filePath,
      };
      setInitialFile(mappedFile);
      setFile(mappedFile);
    }
  }, [sharedFiles]);

  const uploadConfig = {
    file: file,
    url: `${Global.url}${Global.contextPathUrl}/${References.url.SWS}/${References.url.COPILOT}/${References.url.UPLOAD_FILE}`,
    method: References.method.POST,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.flex}>
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
              setInitialFile(null);
            }}
          />
        </View>

        {/* Section to display messages */}
        <View style={styles.messagesContainer}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.flex}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.flexGrow}
          >
            {messages.map((message, index) => (
              <View key={index} style={styles.messageContainer}>
                <AnimatedMessage>
                  <TextMessageRN
                    type={message.sender === ROLE_USER ? 'right-user' : 'left-user'}
                    text={message.text}
                    file={message.file?.name || null}
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
          </ScrollView>
        </View>

        {/* Input Area */}
        <KeyboardAvoidingView
          style={styles.inputContainer}
          behavior={KEYBOARD_BEHAVIOR}
          keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              initialFile={initialFile}
            />
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
