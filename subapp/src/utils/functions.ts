import { Dimensions, PixelRatio, ScrollView } from "react-native";

// Getting screen width and height
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

// Function to check if the device is a tablet
export const isTabletDevice = () => {
  let pixelDensity = PixelRatio.get();
  const adjustedWidth = width * pixelDensity;
  const adjustedHeight = height * pixelDensity;
  if (pixelDensity < 1.6 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else {
    return (
      pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
    );
  }
};

// Functions to format the time
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let hoursStr = hours < 10 ? "0" + hours : hours.toString();
  let minutesStr = minutes < 10 ? "0" + minutes : minutes.toString();

  return `${hoursStr}:${minutesStr}`;
};

export const formatTimeNewDate = (date: Date): string => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let hoursStr = hours < 10 ? "0" + hours : hours;
  let minutesStr = minutes < 10 ? "0" + minutes : minutes;
  return `${hoursStr}:${minutesStr}`;
};

// Retrieve styles from the TextMessage Component based on the sender type
export const getMessageType = (sender: string) => {
  if (sender === "error") {
    return "error";
  } else if (sender === "user") {
    return "right-user";
  } else {
    return "left-user";
  }
};

// Function to scroll to the end of the chat
export const scrollToEnd = (scrollViewRef: React.RefObject<ScrollView>) => {
  setTimeout(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, 100);
}
