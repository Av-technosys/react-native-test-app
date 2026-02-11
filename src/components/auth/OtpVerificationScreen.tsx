/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Internal Imports
import Button from '../common/Button';
import { confirmOtp } from '../../api/auth';
import { AuthStackParamList } from '../../navigation/Screens/AuthStack';
import { loginSuccess } from '../../store/slices/authSlice';
import { decodeIdToken } from '../../utils/decodeToken';
import { showAndroidToast } from '../toast/androidToast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

type RouteProps = RouteProp<AuthStackParamList, 'OtpVerification'>;

const OTP_LENGTH = 6;
const RESEND_TIME = 30;

export default function OtpVerificationScreen() {
  const [secondsLeft, setSecondsLeft] = useState(RESEND_TIME);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();
  const inputs = useRef<(TextInput | null)[]>([]);

  const { flow, email: username } = route.params ?? {};

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!resendDisabled) return;
    if (secondsLeft === 0) {
      setResendDisabled(false);
      return;
    }
    const timer = setTimeout(() => setSecondsLeft(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, resendDisabled]);

  const handleResendOtp = async () => {
    try {
      setResendDisabled(true);
      setSecondsLeft(RESEND_TIME);

      // await resendOtp({ username });
      showAndroidToast('As of now we havent intigrate with resend code api');
    } catch (error: any) {
      showAndroidToast('Failed to resend OTP. Please try again.');
      setResendDisabled(false);
    }
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    setError('');

    if (value && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = async () => {
    const code = otp.join('');

    if (code.length !== OTP_LENGTH) {
      showAndroidToast('Enter the complete 6-digit code');
      return;
    }

    if (!username) {
      showAndroidToast('Email not found. Please try again.');
      return;
    }

    try {
      setLoading(true);
      const data = await confirmOtp({ email: username, code });

      showAndroidToast('OTP verified successfully');

      if (flow === 'signup') {
        const { accessToken, refreshToken } = data;
        await AsyncStorage.multiSet([
          ['accessToken', accessToken],
          ['refreshToken', refreshToken],
        ]);
        const user = decodeIdToken(accessToken);
        dispatch(loginSuccess(user));
        navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
      } else if (flow === 'forgotPassword') {
        navigation.navigate('ResetPassword', { username, code });
      }
    } catch (error: any) {
      showAndroidToast('Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
<KeyboardAwareScrollView
  showsVerticalScrollIndicator={false}
  keyboardShouldPersistTaps="always"
  automaticallyAdjustKeyboardInsets={false}
  contentInsetAdjustmentBehavior="never"
  bounces={false}
>

<View className="flex-1 px-6">

  {/* LOGO SECTION */}
  <View className="items-center mt-6">
    <Image
      source={require('../../assets/images/freeky-icon.png')}
      className="w-52 h-44"
      resizeMode="contain"
    />
    <Text className="text-3xl font-bold text-gray-900 mt-4">Verify OTP</Text>
    <Text className="text-gray-500 text-center mt-2 px-4 text-base">
      Enter the 6-digit code sent to your email
    </Text>
  </View>

  {/* OTP INPUTS */}
  
  <View className="pt-10 flex-row justify-between w-full">

    {otp.map((digit, index) => (
      <TextInput
        key={index}
        // ref={(ref) => (inputs.current[index] = ref)}
        value={digit}
        onChangeText={v => handleChange(v, index)}
        onKeyPress={(e) => handleKeyPress(e, index)}
        keyboardType="number-pad"
        maxLength={1}
        className="w-12 h-14 border border-gray-300 rounded-xl text-center text-xl font-bold text-black bg-gray-50 focus:border-orange-500"
      />
    ))}
  </View>




  {/* RESEND SECTION */}
  <View className="flex-row justify-between items-center mt-8 px-1">
    <Pressable onPress={handleResendOtp} disabled={resendDisabled}>
      <Text className={`font-bold text-base ${resendDisabled ? 'text-gray-300' : 'text-orange-500'}`}>
        Resend code
      </Text>
    </Pressable>

    {resendDisabled && (
      <View className="bg-gray-100 px-3 py-1 rounded-full">
        <Text className="text-gray-600 font-medium">{formatTime(secondsLeft)}</Text>
      </View>
    )}
  </View>

  {/* CONFIRM BUTTON */}
  <View className="mt-16 mb-10">
    <Button
      size="medium"
      label={loading ? "Verifying..." : "Confirm"}
      onPress={handleConfirm}
      disabled={loading}
    />
  </View>

</View>
</KeyboardAwareScrollView>
  );
}
