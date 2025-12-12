import './global.css';

import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/navigation/Tabs';
import { useColorScheme, StatusBar  } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { applyGlobalFont } from "./src/utils/GlobalFont";
import { useEffect } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
//mport Geocoder from "react-native-geocoding";

function App() {


  useEffect(() => {
    applyGlobalFont();
  }, []);

  
  const isDarkMode = useColorScheme() === 'dark';

  return (
        <GestureHandlerRootView style={{ flex: 1 }}>

    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          translucent={false}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
        />
        <Tabs />
      </NavigationContainer>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
