import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { Easing } from 'react-native';
import AuthIntroScreen from '../../screens/auth/AuthIntroScreen' 
import SignUp from '../../screens/auth/SignUp'
import Login  from '../../screens/auth/Login'
import SendOtpScreen from '../../components/auth/SendOtpScreen';
import OtpVerification from '../../screens/auth/OtpVerification';

const Stack = createStackNavigator();

const openConfig = {
  animation: 'timing' as const,
  config: {
    duration: 350,
    easing: Easing.out(Easing.cubic),
  },
};

const closeConfig = {
  animation: 'timing' as const,
  config: {
    duration: 250,
    easing: Easing.in(Easing.cubic),
  },
};

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: openConfig,
          close: closeConfig,
        },
        cardStyleInterpolator:
          TransitionPresets.SlideFromRightIOS.cardStyleInterpolator,
      }}
    >
  
      <Stack.Screen name="authIntro" component={AuthIntroScreen} />
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SendOtpScreen' component={SendOtpScreen} />
      <Stack.Screen name='OtpVerification' component={OtpVerification} />


    </Stack.Navigator>
  );
}
