/* eslint-disable @typescript-eslint/no-unused-vars */
import './global.css';

import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import  applyGlobalFont  from './src/utils/GlobalFont';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';

import RootStack from './src/navigation/rockStack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import { Provider as PaperProvider , MD3LightTheme } from 'react-native-paper';
import './src/api/interceptors';
import { KeyboardProvider } from "react-native-keyboard-controller";
import SystemUIController from './src/theme/SystemUiControler';

function App() {
  useEffect(() => {
    applyGlobalFont();
  }, []);

const theme = {
...MD3LightTheme,
};




  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <KeyboardProvider>
        <FlashMessage
          position="top"
          statusBarHeight={StatusBar.currentHeight ?? 40}
        />
       <PaperProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              {/* ✅ GLOBAL STATUS BAR */}

          <SystemUIController />

              <RootStack  />
            </NavigationContainer>
          </PersistGate>
        </Provider>
        </PaperProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;