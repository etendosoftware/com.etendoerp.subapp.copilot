/* Import React & React Native elements */
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  UIManager,
  Platform,
  Text,
} from 'react-native';

/* Import custom components */
import {
  DropdownInput,
  FileSearchInput,
  TextMessage,
  Header,
  AnimatedMessage,
  LevitatingImage,
} from '../../components';

/* Import styles */
import { styles } from './style';

/* Import hooks, interfaces, utils & helpers */
import { References } from '../../utils/references';
import { HomeProps, ILabels, IMessage } from '../../interfaces';
import { AppPlatform } from '../../helpers/utilsTypes';
import { useAssistants } from '../../hooks/useAssistants';
import { RestUtils, isDevelopment } from '../../utils/environment';
import { LOADING_MESSAGES, ROLE_BOT, ROLE_ERROR, ROLE_USER } from '../../utils/constants';
import { formatTimeNewDate, getMessageType, scrollToEnd } from '../../utils/functions';
import locale from '../../localization/locale';

/* If the platform is Android, enable LayoutAnimation */
if (Platform.OS === AppPlatform.android) {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

/* Render the Home screen */
const Home: React.FC<HomeProps> = ({ navigationContainer }) => {
  // State variables
  const [file, setFile] = useState<File | null>(null);
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
    setFile(null);
    setFileId(null);
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

      // Prepare request body
      const requestBody: {
        question: string;
        app_id: string | undefined;
        conversation_id?: string | null;
        file?: string | null;
      } = {
        question: question,
        app_id: selectedOption?.app_id,
      };

      if (conversationId) {
        requestBody.conversation_id = conversationId;
      }
      if (fileId) {
        requestBody.file = fileId;
      }

      // Send the question to the server
      try {
        const response = await fetch(`${References.PROD}/${References.url.SEND_QUESTION}`, {
          method: 'POST',
          headers: {
            'Authorization': 'Basic YWRtaW46YWRtaW4=',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
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
  const handleSetFile = (newFile: File | null) => {
    if (newFile !== file) {
      setFile(newFile);
    }
  };

  let url = '';
  if (isDevelopment()) {
    url = `${References.DEV}${References.url.UPLOAD_FILE}`;
  } else {
    url = `${References.PROD}${References.url.UPLOAD_FILE}`;
  }

  const uploadConfig = {
    file: file,
    url: url,
    method: References.method.POST,
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
    setFile(null);
  };

  const handleFileId = (uploadedFile: { file: string }) => {
    setFileId(uploadedFile.file);
  };

  /* Secondary Effects */
  // Effect to retrieve labels & assistants on component mount
  useEffect(() => {
    getLabels();
    getAssistants();
  }, []);

  return (
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
              <View style={styles.textMessageContainer}>
                <TextMessage
                  text={message.text}
                  time={message.timestamp}
                  type={getMessageType(message.sender)}
                  file={file ? file.name : undefined}
                />
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
          setFile={handleSetFile}
          uploadConfig={uploadConfig}
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
  );
};

export default Home;
