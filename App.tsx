/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import './global.css';

import { CustomFlatList } from './src';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View className="flex-1 items-center border border-red-500 justify-center bg-blue-500">
      <Text className="text-white text-xl">Hello TailwindCSS 👋</Text>
      <View className=' h-fit border border-red-500'><CustomFlatList items={list} /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;


const list = [
  "first",
  "second",
  "third",
  "first",
  "second",
  "third",
  "first",
  "second",
  "third",
  "first",
  "second",
  "third"
]