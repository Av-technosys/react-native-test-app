import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

import Tabs from './Tabs';
import FlowStack from '../navigation/Screens/FlowStack';
import AuthStack from '../navigation/Screens/AuthStack';
import { useEffect } from 'react';

const Stack = createStackNavigator();

export default function RootStack() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
useEffect(() => {
  console.log('AUTH STATE 👉', isLoggedIn);
}, [isLoggedIn]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
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
