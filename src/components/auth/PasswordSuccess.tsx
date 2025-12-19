import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

export default function PasswordSuccessScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-6">
        {/* LOGO */}
        <View className="items-center mb-4">
          <Image
            source={require('../../assets/images/freeky-icon.png')}
            resizeMode="contain"
            className="w-48 h-20"
          />
        </View>

      {/* MESSAGE */}
      <View className="items-center mt-12 px-4">
        <Text className="text-xl font-bold text-black text-center mb-3">
          Congratulations Piyush
        </Text>

        <Text className="text-gray-500 text-center text-base leading-6">
          Your Password Has Been Updated{'\n'}Successfully !!
        </Text>
      </View>

      {/* BUTTON */}
      <Pressable className="mt-auto mb-10">
        <LinearGradient
          colors={['#FACC15', '#F97316']}
          className="h-14 rounded-full justify-center items-center"
        >
          <Text className="text-black text-lg font-bold">
            Continue
          </Text>
        </LinearGradient>
      </Pressable>
    </SafeAreaView>
  );
}
