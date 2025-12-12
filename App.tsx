import './global.css';

import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/navigation/Tabs';
import { useColorScheme, StatusBar  } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
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
  );
}

export default App;
