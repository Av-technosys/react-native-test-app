import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import NetInfo from '@react-native-community/netinfo';
import Tabs from './Tabs';
import FlowStack from '../navigation/Screens/FlowStack';
import AuthStack from '../navigation/Screens/AuthStack';
import { useEffect, useState } from 'react';
import NoInternetScreen from '../screens/NoInternetScreen';
import IntroScreen from '../screens/IntroScreen';


const Stack = createStackNavigator();

export default function RootStack() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [isConnected, setIsConnected] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state?.isConnected ?? true);
    });

    return () => unsubscribe();
  }, []);

  if (showIntro) {
    return (
      <IntroScreen onFinish={() => setShowIntro(false)} />
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isConnected ? (
        <Stack.Screen name="NoInternetScreen" component={NoInternetScreen} />
      ) : isLoggedIn ? (
        <>
          <Stack.Screen name="MainTabs" component={Tabs} />
          <Stack.Screen name="FlowStack" component={FlowStack} />
        </>
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}