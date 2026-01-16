/* eslint-disable @typescript-eslint/no-unused-vars */
import './global.css';

import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { applyGlobalFont } from './src/utils/GlobalFont';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';

import RootStack from './src/navigation/rockStack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import { createTamagui,TamaguiProvider, View } from 'tamagui'
import { config } from '@tamagui/config';


import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

function App() {
  useEffect(() => {
    applyGlobalFont();
  }, []);

  useEffect(() => {
  const initFCM = async () => {
    const token = await messaging().getToken();
    console.log('FCM TOKEN:', token);
  };

  initFCM();
}, []);


  const isDarkMode = useColorScheme() === 'dark';
const tamaguiConfig = createTamagui(config);

  return (
    
    <GluestackUIProvider mode="dark">
      <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <FlashMessage
          position="top"
          statusBarHeight={StatusBar.currentHeight ?? 40}
        />

        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            
            <NavigationContainer>
              {/* ✅ GLOBAL STATUS BAR */}
<TamaguiProvider config={tamaguiConfig}>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor="#FFFFFF"
                translucent
              />
              <RootStack />
              </TamaguiProvider>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
    </GluestackUIProvider>
  
  );
}

export default App;
