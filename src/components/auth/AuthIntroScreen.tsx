import React from 'react';
import { View, Text, Image, Pressable, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native'
import Button from '../common/Button';

export default function AuthIntroScreen() {

  const navigation = useNavigation()
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* HERO */}
      <View className="relative w-full" style={{ height: '45%' }}>
        {/* BG IMAGE */}
        <Image
          source={require('../../assets/images/login-bg-bottom.png')}
          resizeMode="cover"
          className="absolute w-full h-full"
        />

        {/* TOP IMAGE */}
        <Image
          source={require('../../assets/images/login-bg-top.png')}
          resizeMode="contain"
          className="absolute w-full h-full"
        />

        {/* GRADIENT FADE */}
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.9)']}
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 120,
          }}
        />
      </View>

      {/* CONTENT */}
      <View className="flex-1 px-6 pt-4">
        {/* LOGO */}
        <View className="items-center mb-4">
          <Image
            source={require('../../assets/images/freeky-icon.png')}
            resizeMode="contain"
            className="w-48 h-20"
          />
        </View>

        {/* TEXT */}
        <Text className="text-2xl font-semibold text-center text-black mb-3">
          Make your events unforgettable
        </Text>

        <Text className="text-base text-center text-gray-500 leading-6 mb-8">
          Discover curated services for birthdays, parties, weddings
          and more — all in one place.
        </Text>

        {/* ACTIONS */}
{/* ACTIONS */}
<View className="mt-8 pb-6">
  <Button
    label="Sign Up"
    variant="primary"
    className="mb-4"
    onPress={() =>
      navigation.getParent()?.navigate('AuthStack', {
        screen: 'SignUp',
      })
    }
  />

  <Button
    label="Log In"
    variant="outline"
    onPress={() =>
      navigation.getParent()?.navigate('AuthStack', {
        screen: 'Login',
      })
    }
  />
</View>

      </View>
    </SafeAreaView>
  );
}
