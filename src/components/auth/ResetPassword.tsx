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


export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure1, setSecure1] = useState(true);
  const [secure2, setSecure2] = useState(true);
  const navigation = useNavigation()

  return (
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
      <View className="items-center mt-2">
        <Text className="text-3xl font-semibold text-black">
          Reset Password
        </Text>
        <Text className="text-gray-500 text-center mt-2 px-6">
          Please create a new password for your account
        </Text>
      </View>

      {/* FORM */}
      <View className="mt-10 space-y-6">

        {/* NEW PASSWORD */}
        <View>
          <Text className="text-md font-medium text-gray-400 mb-2">
            New Password
          </Text>

          <View className="flex-row items-center h-16 border border-gray-500 rounded-2xl px-4">
            <TextInput
              placeholder="Enter new password"
              placeholderTextColor="#6B7280"
              secureTextEntry={secure1}
              value={password}
              onChangeText={setPassword}
              className="flex-1 text-base text-black"
            />
            <Pressable onPress={() => setSecure1(!secure1)}>
              <Feather
                name={secure1 ? 'eye-off' : 'eye'}
                size={20}
                color="#9CA3AF"
              />
            </Pressable>
          </View>
        </View>

        {/* CONFIRM PASSWORD */}
        <View>
          <Text className="text-md font-medium text-gray-400 mb-2">
            Confirm Password
          </Text>

          <View className="flex-row items-center h-16 border border-gray-500 rounded-2xl px-4">
            <TextInput
              placeholder="Confirm new password"
              placeholderTextColor="#6B7280"
              secureTextEntry={secure2}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              className="flex-1 text-base text-black"
            />
            <Pressable onPress={() => setSecure2(!secure2)}>
              <Feather
                name={secure2 ? 'eye-off' : 'eye'}
                size={20}
                color="#9CA3AF"
              />
            </Pressable>
          </View>
        </View>
      </View>

      {/* PASSWORD RULES */}
      <View className="mt-6 space-y-1 px-1">
        <Text className="text-gray-500">• 6–20 characters</Text>
        <Text className="text-gray-500">
          • Includes numbers and lowercase letters
        </Text>
        <Text className="text-gray-500">• No spaces</Text>
        <Text className="text-gray-500">
          • Use special characters (@ # & % $)
        </Text>
      </View>

      {/* SUBMIT BUTTON */}
      <Pressable
      onPress={() =>
        navigation.getParent()?.navigate('AuthStack', {
          screen: 'PasswordSuccess',
        })
      }
        className="mt-16 mb-8"
        style={{
          height: 56,
          borderRadius: 999,
          overflow: 'hidden',
        }}
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
            Submit
          </Text>
        </LinearGradient>
      </Pressable>

    </SafeAreaView>
  );
}
