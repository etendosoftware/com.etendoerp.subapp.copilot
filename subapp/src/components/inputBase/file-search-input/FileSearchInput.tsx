import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Dimensions,
  TextInput,
  Platform,
} from 'react-native';
import InputBase from '../InputBase';
import { styles } from './FileSearchInput.styles';
import { NEUTRAL_1000, SUCCESS_600 } from '../../../styles/colors';
import { FileSearchInputProps } from './FileSearchInput.types';
import { isWebPlatform } from '../../../helpers/functions_utils';
import { RightButtons } from '../InputBase.types';
import { Button, SkeletonItem, CheckCircleFillIcon, CornerDownRightIcon, PaperclipIcon, FileIcon, XIcon } from 'etendo-ui-library';
import { AppPlatform } from '../../../helpers/utilsTypes';
import { KEY_ENTER, KEY_SHIFT } from './FileSearchInput.constants';

let DocumentPicker: any = null;
if (Platform.OS !== 'web') {
  DocumentPicker = require('react-native-document-picker').default;
}

const POSITION_DOWN_FILE = 55;
const POSITION_UP_FILE = 60;

const FileSearchInput = ({
  value,
  placeholder,
  onChangeText,
  onSubmit,
  setFile,
  onFileUploaded,
  onError,
  uploadConfig,
  token,
  maxFileSize = 512,
  rightButtons,
  isAttachDisable,
  isSendDisable,
  initialFiles,
  ...inputBaseProps
}: FileSearchInputProps) => {
  // State for file handling
  const [files, setFiles] = useState<File[]>([]);
  const [loadingFile, setLoadingFile] = useState<boolean>(false);
  const [isFileValid, setIsFileValid] = useState<boolean>(false);
  const [fileStatus, setFileStatus] = useState<'none' | 'loaded' | 'canceled' | 'error'>('none');
  const [progress, setProgress] = useState<number>(0);

  // UI position states
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });

  // References
  const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
  const refInput = useRef<TextInput>(null);
  const fileInputRef = useRef<any>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // If initialFiles is provided, validate and load it as if the user selected it
  useEffect(() => {
    if (initialFiles) {
      if (Array.isArray(initialFiles)) {
        // If multiple files are provided
        validateAndLoadFiles(initialFiles);
      } else {
        // If a single file is provided
        validateAndLoadFiles([initialFiles]);
      }
    }
  }, [initialFiles]);

  // Reset file-related states
  const resetFileState = useCallback(() => {
    setFiles([]);
    setIsFileValid(false);
    setLoadingFile(false);
    setProgress(0);
    setFileStatus('none');
  }, []);

  // Adjust dropdown position for file info UI
  const adjustDropdownPosition = useCallback(() => {
    if (refInput.current) {
      refInput.current.measure((x, y, width, height, pageX, pageY) => {
        setModalPosition({
          top: pageY >= POSITION_UP_FILE ? -POSITION_UP_FILE : POSITION_DOWN_FILE,
          left: pageX,
          width: width,
        });
      });
    }
  }, []);

  useEffect(() => {
    adjustDropdownPosition();
    if (isWebPlatform()) {
      const handleScroll = () => {
        adjustDropdownPosition();
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [windowHeight, windowWidth, adjustDropdownPosition]);

  // Handle message send action
  const handleSendMessage = () => {
    if (!loadingFile && value.trim() !== '') {
      onSubmit?.(value, isFileValid ? files : []);
      resetFileState();
      setFile?.([]);
    }
  };

  // Validate and load selected files
  const validateAndLoadFiles = useCallback(
    async (pickedFiles: File[]) => {
      resetFileState();
      // Here you can add validations like file size or type if needed
      setFiles(pickedFiles);
      setFile?.(pickedFiles);
      setIsFileValid(true);
      setLoadingFile(true);
      setProgress(25);

      // If uploadConfig is provided, upload files
      if (uploadConfig) {
        try {
          await uploadFiles(pickedFiles);
        } catch (error) {
          console.error('Error uploading files:', error);
          onError?.(error);
          setFileStatus('error');
          resetFileState();
          return false;
        }
      } else {
        // If no uploadConfig, just mark as loaded
        completeProgress();
      }
      return true;
    },
    [uploadConfig, onError, setFile, resetFileState]
  );

  // Mark file loading as complete
  const completeProgress = useCallback(() => {
    setProgress(100);
    setLoadingFile(false);
    setIsFileValid(true);
    setTimeout(() => {
      setFileStatus('loaded');
      setProgress(0);
    }, 100);
  }, []);

  // Upload files to server if uploadConfig is present
  const uploadFiles = useCallback(
    async (pickedFiles: File[]) => {
      if (!uploadConfig) return;

      const headers = { Authorization: `Bearer ${token}` };
      const formData = new FormData();
      pickedFiles.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });

      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;

      try {
        const response = await fetch(uploadConfig.url, {
          method: uploadConfig.method,
          body: formData,
          headers,
          signal,
        });

        if (response.ok) {
          completeProgress();
          setFileStatus('loaded');
          const data = await response.json();
          onFileUploaded?.(data);
        } else {
          const errorResponse = await response.json();
          console.error('Error uploading files:', errorResponse);
          onError?.(errorResponse);
          setFileStatus('error');
          resetFileState();
          setFile?.([]);
        }
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.log('File upload cancelled');
          setFileStatus('canceled');
        } else {
          console.error('Error uploading files:', error);
          setFileStatus('error');
        }
        resetFileState();
        setFile?.([]);
      }
    },
    [uploadConfig, token, completeProgress, resetFileState, setFile, onFileUploaded, onError]
  );

  // Handle file button click: web triggers file input, mobile uses DocumentPicker
  const handleFileButtonClick = useCallback(async () => {
    if (isWebPlatform()) {
      fileInputRef.current.click();
    } else {
      if (!DocumentPicker) {
        console.error('DocumentPicker is not available on this platform.');
        return;
      }

      try {
        const responses = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
          allowMultiSelection: true,
        });

        const pickedFiles = responses.map((response: any) => ({
          name: response.name,
          size: response.size,
          type: response.type,
          uri: response.uri,
        }));

        await validateAndLoadFiles(pickedFiles);
      } catch (error) {
        if (!DocumentPicker.isCancel(error)) {
          console.error(error);
          onError?.(error);
        }
      }
    }
  }, [validateAndLoadFiles, onError]);

  // Cancel file selection and abort upload if in progress
  const handleCancelFile = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    resetFileState();
    setFileStatus('canceled');
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    setFile?.([]);
  }, [resetFileState, setFile]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  // Define right buttons for the input
  const UploadButton = (
    <Button
      typeStyle="white"
      onPress={handleFileButtonClick}
      disabled={isAttachDisable}
      iconLeft={<PaperclipIcon style={styles.fileIcon} />}
    />
  );

  const SendButton = (
    <Button
      typeStyle="white"
      onPress={handleSendMessage}
      disabled={isSendDisable}
      iconLeft={<CornerDownRightIcon style={styles.fileIcon} />}
    />
  );

  let buttons: RightButtons | undefined = rightButtons;
  if (uploadConfig) {
    buttons = buttons ? [...buttons, UploadButton] : [UploadButton];
  }
  if (onSubmit) {
    buttons = buttons ? [...buttons, SendButton] : [SendButton];
  }

  return (
    <SafeAreaView style={styles.container}>
      <InputBase
        {...inputBaseProps}
        value={value}
        onChangeText={onChangeText}
        rightButtons={buttons}
        placeholder={placeholder}
      />
      {files.length > 0 && isFileValid && fileStatus !== 'canceled' && (
        <View
          onStartShouldSetResponder={() => true}
          style={[
            styles.fileContainer,
            {
              top:
                Platform.OS === AppPlatform.web
                  ? modalPosition.top
                  : modalPosition.top - POSITION_UP_FILE,
            },
          ]}
        >
          <View style={styles.fileNameContainer}>
            <View style={styles.fileNameLoadedLeftContainer}>
              <View style={styles.fileIconContainer}>
                <View style={styles.iconWrapper}>
                  <FileIcon style={styles.fileIcon} />
                  {files.length > 1 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{files.length}</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.fileContent}>
                {files.length === 1 ? (
                  <Text style={styles.fileNameText} numberOfLines={1} ellipsizeMode="tail">
                    {files[0]?.name}
                  </Text>
                ) : (
                  <Text style={styles.fileNameText}>
                    {`There are ${files.length} files loaded`}
                  </Text>
                )}
                {progress > 0 && (
                  <View style={styles.progressBarContainer}>
                    <SkeletonItem
                      width={`${progress}%`}
                      height={8}
                      color={NEUTRAL_1000}
                      borderRadius={16}
                    />
                  </View>
                )}
              </View>
            </View>
            <View style={styles.fileNameRightContainer}>
              {fileStatus === 'loaded' && (
                <CheckCircleFillIcon style={styles.checkCircleIcon} fill={SUCCESS_600} />
              )}
              <TouchableOpacity style={styles.containerXicon} onPress={handleCancelFile}>
                <XIcon style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FileSearchInput;