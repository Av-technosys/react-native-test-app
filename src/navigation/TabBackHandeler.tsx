
import { useEffect, useState } from 'react';
import { BackHandler, DeviceEventEmitter } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function TabsBackHandler() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    // Listen for sheet open/close events
    const openSub = DeviceEventEmitter.addListener('ADDRESS_SHEET_OPEN', () => {
      setIsSheetOpen(true);
    });
    
    const closeSub = DeviceEventEmitter.addListener('ADDRESS_SHEET_CLOSE', () => {
      setIsSheetOpen(false);
    });

    return () => {
      openSub.remove();
      closeSub.remove();
    };
  }, []);

  useEffect(() => {
    const onBackPress = () => {
      // If sheet is open, don't handle back here - let sheet handle it
      if (isSheetOpen) {
        return false;
      }

      // If NOT on Home tab → go to Home
      if (route.name !== 'Home') {
        navigation.navigate('Home');
        return true; // handled
      }

      // If on Home tab → allow app to close
      return false; // ✅ THIS lets Android exit
    };

    const sub = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );

    return () => sub.remove();
  }, [route.name, navigation, isSheetOpen]); // Add isSheetOpen dependency

  return null;
}