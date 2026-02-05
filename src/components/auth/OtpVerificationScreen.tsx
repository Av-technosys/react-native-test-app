/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image
} from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import Button from '../common/Button';
import { confirmOtp, resendOtp } from '../../api/auth';
import { AuthStackParamList } from '../../navigation/Screens/AuthStack';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decodeIdToken } from '../../utils/decodeToken';
import { useEffect } from 'react';
import { showAndroidToast } from '../toast/androidToast';

type RouteProps = RouteProp<AuthStackParamList, 'OtpVerification'>;

const OTP_LENGTH = 6;

export default function OtpVerificationScreen() {
  const RESEND_TIME = 30;

  const [secondsLeft, setSecondsLeft] = useState(RESEND_TIME);
  const [resendDisabled, setResendDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();

const { flow } = route.params ?? {};

  const username = route.params?.email || '';
  //console.log('username', username);
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);

  const inputs = useRef<(TextInput | null)[]>([]);

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

    const timer = setTimeout(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, resendDisabled]);

  const handleResendOtp = async () => {
    try {
      setResendDisabled(true);
      setSecondsLeft(RESEND_TIME);
      console.log(username);
      const data = await resendOtp({ username });
      console.log(data);
      showAndroidToast('OTP resent successfully');
    } catch (error: any) {
      showAndroidToast('Failed to resend OTP. Please try again.');
      // allow retry if API failed
      setResendDisabled(false);
    }
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleConfirm = async () => {
    const code = otp.join('');

    if (code.length !== OTP_LENGTH) {
     showAndroidToast('Please enter the complete OTP');
      return;
    }

    try {
      setLoading(true);

      const data = await confirmOtp({
       email: username,
        code,
      });
       showAndroidToast('OTP verified successfully');
      if (flow === 'signup') {

        const { accessToken, refreshToken } = data;
        console.log('data', data)
        await AsyncStorage.multiSet([
          ['accessToken', accessToken],
          ['refreshToken', refreshToken],
        ]);

        const user = decodeIdToken(accessToken);
        dispatch(loginSuccess(user));

        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
        return;
      }

      // 🔴 FLOW 2: FORGOT PASSWORD → NO LOGIN
      if (flow === 'forgotPassword') {
        navigation.navigate('ResetPassword', {
          username,
          code, // optional if backend needs it again
        });
        return;
      }
    } catch (error: any) {
    showAndroidToast('OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

return (
  <>

      {/* LOGO */}
      <View className="items-center">
        <Image
          source={require('../../assets/images/freeky-icon.png')}
          className="w-90 h-44"
          resizeMode="contain"
        />
      </View>

      {/* TITLE */}
      <View className="items-center pt-6 px-6">
        <Text className="text-3xl font-semibold text-black">Verify OTP</Text>
        <Text className="text-gray-500 text-center mt-2">
          Enter the 6-digit code sent to you
        </Text>
      </View>

      {/* OTP INPUTS — NO HORIZONTAL SCROLL */}
      <View
        className="pt-12 flex-row justify-center"
        style={{ gap: 12 }}
      >
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref: TextInput | null) => (inputs.current[index] = ref)}
            value={digit}
            onChangeText={v => handleChange(v, index)}
            keyboardType="number-pad"
            maxLength={1}
            className="w-14 h-16 border border-gray-500 rounded-xl text-center text-xl font-semibold text-black"
          />
        ))}
      </View>

      {/* RESEND */}
      <View className="flex-row justify-between mt-6 px-4">
        <Pressable onPress={handleResendOtp} disabled={resendDisabled}>
          <Text
            className={`font-medium ${
              resendDisabled ? 'text-gray-400' : 'text-blue-500'
            }`}
          >
            Resend code
          </Text>
        </Pressable>

        {resendDisabled && (
          <Text className="text-gray-500">{formatTime(secondsLeft)}</Text>
        )}
      </View>

      {/* CONFIRM BUTTON */}
      <Button
        label="Confirm"
        className="mt-24"
        onPress={handleConfirm}
        disabled={loading}
      />
   </>
);

}
