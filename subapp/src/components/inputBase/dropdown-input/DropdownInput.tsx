import React, { useRef, useEffect, useCallback, useState } from 'react';
import {
  View,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TextInput,
} from 'react-native';
import InputBase from '../InputBase';
import { IDropdownInput } from './DropdownInput.types';
import { Button } from '../../button';
import { isWebPlatform } from '../../../helpers/functions_utils';
import InputOptions from './components/DropdownInputOptions/DropdownInputOptions';
import {
  BUFFER,
  MAX_VISIBLE_OPTION,
  NO_RESULT_TEXT,
  OFFSET,
  OFFSET_LOADING,
  PAGE_SIZE,
  SEARCH_PLACEHOLDER,
} from './DropdownInput.constants';
import { ChevronDownIcon, ChevronUpIcon } from '../../../assets/images/icons';

const DropdownInput = ({
  staticData,
  displayKey,
  onSelect,
  value,
  maxVisibleOptions = MAX_VISIBLE_OPTION,
  onFetchData,
  pageSize = PAGE_SIZE,
  searchPlaceholder = SEARCH_PLACEHOLDER,
  noResultsText = NO_RESULT_TEXT,
  isDisabled,
  ...inputBaseProps
}: IDropdownInput) => {
  const ref = useRef<View>(null);
  const refInput = useRef<TextInput>(null);
  const [isVisibleDropdown, setIsVisibleDropdown] = useState<boolean>(false);
  const [dataList, setDataList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadMoreData, setIsLoadMoreData] = useState<boolean>(true);
  const [heightOptions, setHeightOptions] = useState<number>(0);
  const [isModalUp, setIsModalUp] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>('');

  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
    width: number;
  }>({ top: 0, left: 0, width: 0 });

  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

  const adjustDropdownPosition = useCallback(() => {
    if (ref.current) {
      ref.current.measure((x, y, width, height, pageX, pageY) => {
        const spaceBelow = windowHeight - (pageY + height);
        if (heightOptions + 16 > spaceBelow) {
          setModalPosition({
            top: pageY - heightOptions - 16,
            left: pageX,
            width: width,
          });
          setIsModalUp(true);
        } else {
          setModalPosition({ top: pageY + height, left: pageX, width: width });
          setIsModalUp(false);
        }
      });
    }
  }, [heightOptions, windowHeight]);

  useEffect(() => {
    if (isWebPlatform()) {
      if (dataList?.length === 0) {
        if (isLoading) {
          return setHeightOptions(OFFSET_LOADING);
        }
        return setHeightOptions(OFFSET);
      }
      if (maxVisibleOptions && dataList?.length <= maxVisibleOptions) {
        return setHeightOptions(dataList?.length * OFFSET);
      }
      setHeightOptions(maxVisibleOptions * OFFSET);
    }
  }, [dataList, isLoading, windowHeight]);

  useEffect(() => {
    if (!!staticData) {
      setDataList(staticData);
    }
  }, [staticData]);

  useEffect(() => {
    setFilterText('');
    if (isVisibleDropdown && !staticData) {
      setDataList([]);
      setIsLoadMoreData(true);
      fetchMordeData(0, [], true, '');
    }
  }, [isVisibleDropdown]);

  useEffect(() => {
    adjustDropdownPosition();
    if (isWebPlatform()) {
      const handleScroll = () => {
        if (isVisibleDropdown) {
          adjustDropdownPosition();
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isVisibleDropdown, adjustDropdownPosition]);

  const onSelectOption = (item: any) => {
    onSelect?.(item);
    setIsVisibleDropdown(false);

    if (refInput?.current?.setNativeProps) {
      refInput?.current?.setNativeProps({
        selection: { start: 0, end: 0 },
      });
    }
  };

  const onScroll = async (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isAtEndOfScroll(event.nativeEvent) && !isLoading) {
      await fetchMordeData(currentPage, dataList, isLoadMoreData, filterText);
    }
  };
  const fetchMordeData = async (
    currentPage: number,
    prevData: any[],
    isLoadMoreData?: boolean,
    filterText?: string,
  ) => {
    if (!isLoading && onFetchData && isLoadMoreData && !staticData) {
      setIsLoading(true);
      await onFetchData(currentPage, pageSize, filterText)
        .then((res: any) => {
          if (res.length === 0) {
            setIsLoadMoreData(false);
            return;
          }
          setDataList([...prevData, ...res]);
        })
        .finally(() => {
          setCurrentPage(currentPage + 1);
          setIsLoading(false);
        });
    }
  };

  const isAtEndOfScroll = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - BUFFER
    );
  };
  const handleOnFilterTextChange = async (value: string) => {
    setDataList([]);
    setCurrentPage(0);
    setIsLoadMoreData(true);
    setFilterText(value);
    await fetchMordeData(0, [], true, value);
  };

  return (
    <>
      <View
        onLayout={() => {
          if (isWebPlatform()) {
            adjustDropdownPosition();
          }
        }}>
        <InputBase
          {...inputBaseProps}
          isDisabled={isDisabled}
          refInput={refInput}
          refInputContainer={ref}
          rightButtons={[
            <Button
              onPress={() => {
                !isDisabled &&
                  maxVisibleOptions > 0 &&
                  setIsVisibleDropdown(true);
              }}
              typeStyle={'primary'}
              iconLeft={
                isVisibleDropdown ? <ChevronUpIcon /> : <ChevronDownIcon />
              }
            />,
          ]}
          value={value?.toString()}
          onPress={() => {
            !isDisabled && maxVisibleOptions > 0 && setIsVisibleDropdown(true);
          }}
        />
      </View>
      {isVisibleDropdown && !!modalPosition.width && maxVisibleOptions > 0 && (
        <InputOptions
          isVisibleDropdown={isVisibleDropdown}
          onClose={() => {
            setIsVisibleDropdown(false);
          }}
          value={value}
          onSelectOption={onSelectOption}
          modalPosition={modalPosition}
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          data={dataList}
          displayKey={displayKey}
          maxVisibleOptions={maxVisibleOptions}
          onScroll={onScroll}
          isLoading={isLoading}
          isStaticData={staticData !== undefined}
          searchPlaceholder={searchPlaceholder}
          onFilterTextChange={handleOnFilterTextChange}
          noResultsText={noResultsText}
          isModalUp={isModalUp}
        />
      )}
    </>
  );
};

export default DropdownInput;
