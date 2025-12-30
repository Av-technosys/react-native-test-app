import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Button from '../common/Button';
import { confirmOtp, resendOtp } from '../../api/auth';
import { AuthStackParamList } from '../../navigation/Screens/AuthStack';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decodeIdToken } from '../../utils/decodeToken';
import { useEffect } from 'react';

type RouteProps = RouteProp<AuthStackParamList, 'OtpVerification'>;

const OTP_LENGTH = 6;

export default function OtpVerificationScreen() {
  const RESEND_TIME = 30;

  const [secondsLeft, setSecondsLeft] = useState(RESEND_TIME);
  const [resendDisabled, setResendDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();

  const flow = route.params?.flow;
  const username = route.params?.email || '';
  console.log('username', username);
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
      Toast.show({
        type: 'success',
        text1: 'OTP Sent',
        text2: 'A new OTP has been sent',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Failed to resend OTP',
        text2: error?.response?.data?.message || 'Please try again later',
      });

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
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'Please enter the complete OTP',
      });
      return;
    }

    try {
      setLoading(true);

      const data = await confirmOtp({
        username,
        code,
      });

      Toast.show({
        type: 'success',
        text1: 'OTP Verified',
      });

      // 🔴 FLOW 1: SIGNUP → LOGIN USER
      if (flow === 'signup') {
        const { accessToken, refreshToken, idToken } = data;

        await AsyncStorage.multiSet([
          ['accessToken', accessToken],
          ['refreshToken', refreshToken],
          ['idToken', idToken],
        ]);

        const user = decodeIdToken(idToken);
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
      Toast.show({
        type: 'error',
        text1: 'Verification failed',
        text2: error?.response?.data?.message || 'Invalid or expired OTP',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
            <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
    <SafeAreaView className="flex-1 bg-white px-5">
      {/* LOGO */}
      <View className="items-center">
        <Image
          source={require('../../assets/images/freeky-icon.png')}
          className="w-72 h-52"
          resizeMode="contain"
        />
      </View>

      {/* TITLE */}
      <View className="items-center mt-2 px-6">
        <Text className="text-3xl font-semibold text-black">Verify OTP</Text>
        <Text className="text-gray-500 text-center mt-2">
          Enter the 6-digit code sent to you
        </Text>
      </View>

      {/* OTP INPUTS (GUARANTEED 6 VISIBLE) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 12,
          paddingHorizontal: 16,
        }}
        className="mt-12"
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
      </ScrollView>

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
        className="mt-16"
        onPress={handleConfirm}
        disabled={loading}
      />
    </SafeAreaView>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
