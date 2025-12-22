import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [secure, setSecure] = useState(true);
  const navigation = useNavigation()
  return (
    <ScrollView className="flex-1 mb-10 bg-white px-4">

      {/* LOGO */}
      <View className="items-center ">
        <Image
          source={require('../../assets/images/freeky-icon.png')}
          className="w-96 h-60"
          resizeMode="contain"
        />
      </View>

      {/* TITLE */}
      <Text className="text-center text-black font-semibold text-3xl mt-2">
        Get Started now
      </Text>

      <Text className="text-center text-gray-500 text-lg mt-2 px-6">
        Create an account or log in to explore our app
      </Text>

      {/* FORM */}
      <View className="mt-10 px-2 space-y-6">

        {/* EMAIL */}
        <View>
          <Text className="text-md font-medium text-gray-400 m-2">
            Email
          </Text>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#6B7280"
            keyboardType="email-address"
            autoCapitalize="none"
            className="h-16 border border-gray-500 rounded-2xl px-5 text-base text-black"
          />
        </View>

        {/* PASSWORD */}
        <View>
          <Text className="text-md font-medium text-gray-400 m-2">
            Password
          </Text>
          <View className="flex-row items-center h-16 border border-gray-500 rounded-2xl px-4">
            <TextInput
              placeholder="********"
              placeholderTextColor="#6B7280"
              secureTextEntry={secure}
              className="flex-1 text-base text-black"
            />
            <Pressable onPress={() => setSecure(!secure)}>
              <Feather
                name={secure ? 'eye-off' : 'eye'}
                size={20}
                color="#9CA3AF"
              />
            </Pressable>
          </View>
              <Pressable onPress={() =>
        navigation.getParent()?.navigate('AuthStack', {
          screen: 'SendOtp',
        })
      }   className="mt-4 self-end">
      <Text className="text-lg font-normal black ">
        Forgot Password
      </Text>
    </Pressable>
        </View>
      </View>

      {/* LOGIN BUTTON */}
      <Pressable
            onPress={() =>
        navigation.getParent()?.navigate('MainTabs', {
          screen: 'Home',
        })
      }
        className="mt-24 mb-6"
        style={{ height: 56, borderRadius: 999, overflow: 'hidden' }}
      >
        <LinearGradient
          colors={['#FACC15', '#F97316']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text className="font-bold text-2xl text-white">
            Log In
          </Text>
        </LinearGradient>
      </Pressable>

      {/* SOCIAL LOGIN */}
      <View className="space-y-4">

        {/* GOOGLE */}
        <Pressable className="border  border-yellow-400 rounded-full h-12 px-5 flex-row items-center justify-center">
          <FontAwesome name="google" size={18} color="#DB4437" />
          <Text className="text-black font-medium ml-3">
            Continue with Google
          </Text>
        </Pressable>

        {/* FACEBOOK */}
        <Pressable className="border mt-4 border-yellow-400 rounded-full h-12 px-5 flex-row items-center justify-center">
          <FontAwesome name="facebook" size={18} color="#1877F2" />
          <Text className="text-black font-medium ml-3">
            Continue with Facebook
          </Text>
        </Pressable>

        {/* APPLE */}
        <Pressable className="border mt-4 border-yellow-400 rounded-full h-12 px-5 flex-row items-center justify-center">
          <FontAwesome name="apple" size={18} color="#000" />
          <Text className="text-black font-medium ml-3">
            Continue with Apple
          </Text>
        </Pressable>
      </View>

      {/* SIGN UP LINK */}
      <Pressable  onPress={() =>
        navigation.getParent()?.navigate('AuthStack', {
          screen: 'SignUp',
        })
      } className="mt-6  flex flex-row justify-center items-center">
        <Text> Dont have an account ? </Text>
        <Text className="text-blue-500 font-semibold">
          Sign Up
        </Text>
      </Pressable>

    </ScrollView>
  );
}
