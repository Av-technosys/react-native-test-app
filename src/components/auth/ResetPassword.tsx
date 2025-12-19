import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      {/* HEADER */}
      <View className="flex-row items-center mt-2">
        <Pressable>
          <Feather name="arrow-left" size={22} color="#000" />
        </Pressable>
        <Text className="flex-1 text-center text-lg font-semibold">
          Reset Password
        </Text>
      </View>

      {/* LOGO */}
      <View className="items-center mt-8">
        {/* Replace with Image if needed */}
        <Text className="text-3xl font-extrabold text-orange-500">
          FREAKY CHIMP
        </Text>
      </View>

      {/* CONTENT */}
      <View className="mt-10">
        <Text className="text-lg font-semibold text-black mb-4">
          Please set password
        </Text>

        {/* NEW PASSWORD */}
        <TextInput
          placeholder="Enter New Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          className="border border-gray-300 rounded-xl px-4 h-12 mb-3"
          placeholderTextColor="#9CA3AF"
        />

        {/* CONFIRM PASSWORD */}
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          className="border border-gray-300 rounded-xl px-4 h-12 mb-4"
          placeholderTextColor="#9CA3AF"
        />

        {/* PASSWORD RULES */}
        <View className="space-y-2 mb-8">
          <Text className="text-gray-600">• 6–20 characters</Text>
          <Text className="text-gray-600">
            • Includes numbers, lowercase letters
          </Text>
          <Text className="text-gray-600">• No spaces</Text>
          <Text className="text-gray-600">
            • Use special characters @#&%$
          </Text>
        </View>
      </View>

      {/* SUBMIT BUTTON */}
      <Pressable className="mt-auto mb-8">
        <LinearGradient
          colors={['#FACC15', '#F97316']}
          className="h-14 rounded-full justify-center items-center"
        >
          <Text className="text-black text-lg font-bold">
            Submit
          </Text>
        </LinearGradient>
      </Pressable>
    </SafeAreaView>
  );
}
