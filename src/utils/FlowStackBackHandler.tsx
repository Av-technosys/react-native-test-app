// utils/FlowStackBackHandler.tsx
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FlowStackBackHandler() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const onBackPress = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true; // ⛔ prevent app exit
      }

      return false; // allow app exit at root
    };

    const sub = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );

    return () => sub.remove();
  }, [navigation]);

  return null;
}
