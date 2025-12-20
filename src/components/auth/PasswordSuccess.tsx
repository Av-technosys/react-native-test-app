import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

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
      <Pressable
      onPress={() =>
        navigation.getParent()?.navigate('MainTabs', {
          screen: 'Home',
        })
      }
        className="mb-10"
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
            Continue
          </Text>
        </LinearGradient>
      </Pressable>

    </SafeAreaView>
  );
}
