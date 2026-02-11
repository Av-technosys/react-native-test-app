import { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';

export default function SystemUIController() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#FFFFFF', true);
      StatusBar.setBarStyle('dark-content', true);
      StatusBar.setTranslucent(false);
    }
  }, []);

  return null;
}