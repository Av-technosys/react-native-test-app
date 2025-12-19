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
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function SendOtpScreen() {
  const [value, setValue] = useState('');
  const navigation = useNavigation()
  return (
    <SafeAreaView className="flex-1 bg-white px-5">

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
      <Pressable
        className="mt-16"
        style={{
          height: 56,
          borderRadius: 999,
          overflow: 'hidden',
        }}
         onPress={() =>
        navigation.getParent()?.navigate('AuthStack', {
          screen: 'OtpVerification',
        })
      }
      >
        <LinearGradient
          colors={['#FACC15', '#F97316']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 999,
          }}
        >
          <Text className="font-bold text-xl text-white">
            Send OTP
          </Text>
        </LinearGradient>
      </Pressable>

    </SafeAreaView>
  );
}
