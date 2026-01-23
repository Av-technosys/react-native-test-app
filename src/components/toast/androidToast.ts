import { Platform, ToastAndroid } from 'react-native';

export const showAndroidToast = (
  message: string,
  duration: 'short' | 'long' = 'short'
) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(
      message,
      duration === 'short'
        ? ToastAndroid.SHORT
        : ToastAndroid.LONG
    );
  }
};
