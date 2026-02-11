import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { Easing } from 'react-native';

import AuthIntroScreen from '../../screens/auth/AuthIntroScreen';
import SignUp from '../../screens/auth/SignUp';
import Login from '../../screens/auth/Login';
import SendOtpScreen from '../../components/auth/SendOtpScreen';
import OtpVerification from '../../screens/auth/OtpVerification';
import ResetPasswordScreen from '../../screens/auth/ResetPassword';
import PasswordSuccessScreen from '../../components/auth/PasswordSuccess';
 
/* ✅ PARAM LIST */
export type AuthStackParamList = {
  AuthIntro: undefined;
  Login: undefined;
  SignUp: undefined;

  SendOtp: {
    flow: 'signup' | 'forgotPassword';
    email: string;
  };

  OtpVerification: {
    flow: 'signup' | 'forgotPassword';
    email: string;
  };

  ResetPassword: {
    username: string;
    code: string;
  };

  PasswordSuccess: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

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
      <Stack.Screen name="AuthIntro" component={AuthIntroScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SendOtp" component={SendOtpScreen} />

      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="PasswordSuccess" component={PasswordSuccessScreen} />
    </Stack.Navigator>
  );
}
