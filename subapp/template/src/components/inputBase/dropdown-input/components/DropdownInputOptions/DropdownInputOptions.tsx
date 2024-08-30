import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  NEUTRAL_400,
  PRIMARY_100,
  TERTIARY_101,
} from '../../../../../styles/colors';
import { SearchInput } from '../../../search-input';

import { styles } from '../../DropdownInput.styles';
import { IDropdownInputOptions } from '../../DropdownInput.types';
import {
  OFFSET,
  OFFSET_PADDING,
  SEARCH_HEIGH,
} from '../../DropdownInput.constants';

const DropdownInputOptions = ({
  isVisibleDropdown,
  onClose,
  onSelectOption,
  modalPosition,
  windowHeight,
  windowWidth,
  data,
  displayKey,
  value,
  maxVisibleOptions,
  onScroll,
  isLoading,
  isStaticData,
  searchPlaceholder,
  onFilterTextChange,
  noResultsText,
  isModalUp,
}: IDropdownInputOptions) => {
  const [filterText, setFilterText] = useState<string>('');
  const isCenteredModal = Platform.OS === 'android' || Platform.OS === 'ios';

  useEffect(() => {
    if (!isLoading && filterText) {
      const handler = setTimeout(() => {
        onFilterTextChange(filterText);
      }, 500);

      return () => clearTimeout(handler);
    }
  }, [filterText]);

  const filterComponent = () => {
    return (
      <View style={styles.searchContainer}>
        <SearchInput
          placeholder={searchPlaceholder}
          value={filterText || ''}
          onChangeText={text => {
            setFilterText(text);
          }}
          isFocusable={false}
          styleContainer={{ borderColor: NEUTRAL_400 }}
          onSubmit={() => {
            onFilterTextChange(filterText || '');
          }}
          rightButtons={
            isLoading
              ? [
                  <ActivityIndicator
                    style={styles.iconLoading}
                    color={PRIMARY_100}
                  />,
                ]
              : []
          }
        />
      </View>
    );
  };

  return (
    <Modal
      transparent={true}
      visible={isVisibleDropdown}
      onRequestClose={() => {
        onClose();
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[
          isCenteredModal && styles.containerNative,
          { width: windowWidth, height: windowHeight },
        ]}>
        <TouchableOpacity
          onPress={() => {
            onClose();
          }}
          style={{ width: windowWidth, height: windowHeight }}
          activeOpacity={1}
        />
        <View
          onStartShouldSetResponder={() => true}
          style={[
            styles.optionsContainer,
            isCenteredModal && {
              height:
                maxVisibleOptions &&
                maxVisibleOptions * OFFSET +
                  OFFSET_PADDING +
                  (isStaticData ? 0 : SEARCH_HEIGH),
            },
            {
              maxHeight:
                maxVisibleOptions && data && data?.length <= maxVisibleOptions
                  ? 'auto'
                  : maxVisibleOptions &&
                    maxVisibleOptions * OFFSET +
                      OFFSET_PADDING +
                      (isStaticData ? 0 : SEARCH_HEIGH),
            },
            !isCenteredModal && {
              top: modalPosition.top + 8,
              left: modalPosition.left,
            },
            {
              width: modalPosition.width,
            },
          ]}>
          {!!(
            (!isStaticData && !isModalUp) ||
            (!isStaticData && isCenteredModal)
          ) && filterComponent()}
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            scrollEventThrottle={16}
            onScroll={onScroll}>
            {displayKey &&
              data?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={'dropdown' + index}
                    onPress={() => {
                      onSelectOption(item);
                    }}
                    style={[
                      styles.option,
                      !!value &&
                        item[displayKey] === value && {
                          backgroundColor: TERTIARY_101,
                        },
                    ]}>
                    <Text style={styles.optionText} numberOfLines={2}>
                      {item[displayKey]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            {!isLoading && !data?.length && (
              <View style={styles.option}>
                <Text style={styles.optionText}>{noResultsText}</Text>
              </View>
            )}
          </ScrollView>
          {!isStaticData && isModalUp && !isCenteredModal && filterComponent()}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default DropdownInputOptions;
