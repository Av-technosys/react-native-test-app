/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

// Internal Imports
import Button from '../common/Button';
import FloatingInput from '../common/FloatingInput';
import { forgotPassword } from '../../api/auth';
import { showAndroidToast } from '../toast/androidToast';
import ScreenHeader from '../common/ScreenHeader';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<any>();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  /* -------- validation -------- */
const validate = () => {
  const value = username.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (!value) {
    showAndroidToast('Enter email or phone number');
    return false;
  }

  if (!emailRegex.test(value) && !phoneRegex.test(value)) {
    showAndroidToast('Enter valid email or 10 digit phone number');
    return false;
  }

  return true;
};

  const handleSendOtp = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await forgotPassword({ email: username.trim() });

      showAndroidToast('OTP sent successfully');

      navigation.navigate('OtpVerification', {
        email: username.trim(),
        flow: 'forgotPassword',
      });

    } catch (error: any) {
      showAndroidToast('Something went wrong. Please try again.');
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
  className='bg-white'
>


  <View className="">
    <ScreenHeader title='Forgot Passwords'  align="center" showBack={true} />
  </View>
  <View className="flex-1 px-6">


  {/* LOGO */}
  <View className="items-center mt-4">
    <Image
      source={require('../../assets/images/freeky-icon.png')}
      className="w-52 h-44"
      resizeMode="contain"
    />
    <Text className="text-3xl font-bold text-gray-900 mt-4 text-center">
      Forgot Password
    </Text>
    <Text className="text-gray-500 text-center text-base mt-2 px-4">
      Enter your email or phone number to receive the OTP
    </Text>
  </View>

  {/* INPUT */}
  <View className="mt-10">
    <Text className="text-sm font-semibold text-gray-700 ml-1 mb-1.5">
      Email / Phone No.
    </Text>

    <FloatingInput
      size="medium"
      value={username}
      onChangeText={(v: React.SetStateAction<string>) => {
        setUsername(v);
     
      }}
      placeholder="name@example.com or 8888888888"
      keyboardType="email-address"
      autoCapitalize="none"
    />


  </View>

  {/* BUTTON */}
  <View className="mt-12">
    <Button
      size="medium"
      label={loading ? "Sending..." : "Send OTP"}
      onPress={handleSendOtp}
      disabled={loading}
    />
  </View>

  <View className="mb-10" />

</View>
</KeyboardAwareScrollView>
  );
}
