import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Button from '../common/Button';

export default function PasswordSuccessScreen() {
  const navigation = useNavigation()
  return (
    <SafeAreaView className="flex-1 bg-white px-6">

      {/* CONTENT */}
      <View className="flex-1 justify-center items-center">

        {/* LOGO */}
        <Image
          source={require('../../assets/images/freeky-icon.png')}
          resizeMode="contain"
          className="w-72 h-44 mb-10"
        />

        {/* MESSAGE */}
        <Text className="text-2xl font-semibold text-black text-center mb-3">
          Congratulations, Piyush
        </Text>

        <Text className="text-gray-500 text-center text-base leading-6 px-6">
          Your password has been updated{'\n'}successfully.
        </Text>
      </View>

      {/* BUTTON */}
<Button
  label="Continue"
  className="mb-10"
  onPress={() =>
    navigation.getParent()?.navigate('MainTabs', {
      screen: 'Home',
    })
  }
/>


    </SafeAreaView>
  );
}
