import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const [secure, setSecure] = useState(true);
  const navigation = useNavigation()
  return (
    <View className="flex-1 px-4 bg-white ">
      {/* LOGO */}
      <View className="items-center mt-6">
        <Image
          source={require('../../assets/images/freeky-icon.png')} // replace path
          className="w-96 h-60"
          resizeMode="contain"
        />
      </View>

      {/* FORM */}
      <View className="mt-8 px-2 space-y-6">
        {/* NAME */}
        <View>
          <Text className="text-md font-medium text-gray-400 m-2">Name</Text>
          <TextInput
            placeholder="Enter your name"
            placeholderTextColor="#6B7280"
            className="h-16 border border-gray-500 rounded-2xl px-5 text-base text-black"
          />
        </View>

        {/* PHONE */}
        <View>
          <Text className="text-md font-medium text-gray-400 m-2">
            Phone no.
          </Text>
          <View className="flex-row items-center h-14 border border-gray-500 rounded-2xl px-4">
            <Text className="text-black mr-3 text-base">+44</Text>
            <View className="w-px h-6 bg-gray-600 mr-3" />
            <TextInput
              placeholder="Phone number"
              placeholderTextColor="#6B7280"
              keyboardType="phone-pad"
              className="flex-1 text-base text-black"
            />
          </View>
        </View>

        {/* EMAIL */}
        <View>
          <Text className="text-md font-medium text-gray-400 m-2">Email</Text>
          <TextInput
            placeholder="name@example.com"
            placeholderTextColor="#6B7280"
            keyboardType="email-address"
            autoCapitalize="none"
            className="h-16 border border-gray-500 rounded-2xl px-5 text-base text-black"
          />
        </View>

        {/* PASSWORD */}
        <View>
          <Text className="text-sm font-medium text-gray-400 m-2">
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
        </View>
      </View>

      {/* SIGN UP BUTTON */}

      <Pressable
            onPress={() =>
        navigation.getParent()?.navigate('AuthStack', {
          screen: 'OtpVerification',
            params: {
      signUp: true,
    },
        })
      }
        className="mt-24 mb-4"
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
          <Text className="font-bold text-2xl text-white">Sign up</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}
