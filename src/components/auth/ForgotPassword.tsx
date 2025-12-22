import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

export default function ForgotPasswordOtpScreen() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (text: string, index: number) => {
    const updated = [...otp];
    updated[index] = text;
    setOtp(updated);
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      {/* HEADER */}
      <View className="flex-row items-center mt-2">
        <Pressable>
          <Feather name="arrow-left" size={22} color="#000" />
        </Pressable>
        <Text className="flex-1 text-center text-lg font-semibold">
          Forgot Password
        </Text>
      </View>

        {/* LOGO */}
        <View className="items-center mb-4">
          <Image
            source={require('../../assets/images/freeky-icon.png')}
            resizeMode="contain"
            className="w-48 h-20"
          />
        </View>

      {/* CONTENT */}
      <View className="mt-8">
        <Text className="text-lg font-semibold text-black">
          Input verification code
        </Text>
        <Text className="text-gray-500 mt-1">
          Please input the code from the Email.
        </Text>

        {/* OTP INPUTS */}
        <View className="flex-row justify-between mt-6">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              maxLength={1}
              keyboardType="number-pad"
              className="w-10 h-12 border-b-2 border-gray-400 text-center text-lg"
            />
          ))}
        </View>

        {/* RESEND + TIMER */}
        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-gray-500">
            Resend code
          </Text>
          <Text className="text-gray-500">
            01:59
          </Text>
        </View>

        {/* RESEND NOW */}
        <View className="flex-row justify-center mt-2">
          <Text className="text-gray-500 mr-1">
            Didn’t receive an OTP?
          </Text>
          <Pressable>
            <Text className="text-orange-500 font-semibold">
              Resend now
            </Text>
          </Pressable>
        </View>
      </View>

      {/* CONFIRM BUTTON */}
      <Pressable className="mt-auto mb-8">
        <LinearGradient
          colors={['#FACC15', '#F97316']}
          className="h-14 rounded-full justify-center items-center"
        >
          <Text className="text-black text-lg font-bold">
            Confirm
          </Text>
        </LinearGradient>
      </Pressable>
    </SafeAreaView>
  );
}
