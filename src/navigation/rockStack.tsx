import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decodeIdToken } from '../utils/decodeToken';
import { DeviceEventEmitter } from 'react-native';

import Tabs from './Tabs';
import FlowStack from '../navigation/Screens/FlowStack';
import AuthStack from '../navigation/Screens/AuthStack';
import { logout } from '../store/slices/authSlice';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('AUTH STATE 👉', isLoggedIn);
    
    // SIMPLE: Just check token once when component mounts
    const checkToken = async () => {
      try {
        const idToken = await AsyncStorage.getItem('idToken');
        if (idToken) {
          const decoded = decodeIdToken(idToken);
          const now = Math.floor(Date.now() / 1000);
          if (decoded.exp <= now) {
            // Token expired, clear it
            await AsyncStorage.multiRemove(['idToken', 'refreshToken', 'username']);
          }
        }
      } catch (error:any) {
        console.log(error)
        // Token invalid, ensure clean state
        await AsyncStorage.multiRemove(['idToken', 'refreshToken', 'username']);
      }
    };
    
    checkToken();
    
    // Listen for logout from axios
    const logoutListener = DeviceEventEmitter.addListener('FORCE_LOGOUT', () => {
      dispatch(logout());
    });
    
    return () => logoutListener.remove();
  }, [dispatch, isLoggedIn]);

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