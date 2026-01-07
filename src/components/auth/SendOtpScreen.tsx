import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Button from '../common/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SendOtpScreen() {
  const [value, setValue] = useState('');
  const navigation = useNavigation()
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={32}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 18,
      }}
    >    <SafeAreaView className="flex-1 bg-white px-5">

      {/* HEADER */}
      <View className="flex-row items-center mt-2">
        <Pressable>
          <Feather name="arrow-left" size={22} color="#000" />
        </Pressable>
      </View>

      {/* LOGO */}
      <View className="items-center mt-4">
        <Image
          source={require('../../assets/images/freeky-icon.png')}
          className="w-80 h-56"
          resizeMode="contain"
        />
      </View>

      {/* TITLE */}
      <View className="items-center mt-2 px-6">
        <Text className="text-3xl font-semibold text-black">
          Forgot Password
        </Text>

        <Text className="text-gray-500 text-center text-base mt-2">
          Enter your email or phone number to receive the OTP
        </Text>
      </View>

      {/* INPUT */}
      <View className="mt-10 px-2">
        <Text className="text-md font-medium text-gray-400 m-2">
          Email / Phone No.
        </Text>

        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder="Enter email or phone number"
          placeholderTextColor="#6B7280"
          keyboardType="email-address"
          className="h-16 border border-gray-500 rounded-2xl px-5 text-base text-black"
        />
      </View>

      {/* SEND OTP BUTTON */}
<Button
  label="Send OTP"
  className="mt-16"
  onPress={() =>
    navigation.getParent()?.navigate('AuthStack', {
      screen: 'OtpVerification',
    })
  }
/>
    </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
