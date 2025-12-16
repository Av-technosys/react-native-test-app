/* eslint-disable @typescript-eslint/no-unused-vars */
import './global.css';

import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme, StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { applyGlobalFont } from './src/utils/GlobalFont';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
//mport Geocoder from "react-native-geocoding";
import RootStack from './src/navigation/rockStack';


function App() {
  useEffect(() => {
    applyGlobalFont();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <SafeAreaProvider>
          <StatusBar
            translucent={false}
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor="transparent"
          />

          <RootStack />
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
