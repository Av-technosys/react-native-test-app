import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/Screens/AuthStack';

type RouteProps = RouteProp<AuthStackParamList, 'OtpVerification'>;


const OTP_LENGTH = 4;

export default function OtpVerificationScreen() {

  const route = useRoute<RouteProps>();
const signUp = route.params?.signUp ?? false;

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputs = useRef<(TextInput | null)[]>([]);
  const navigation = useNavigation()
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0 && !otp[index]) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-5">


      {/* LOGO */}
      <View className="items-center ">
        <Image
          source={require('../../assets/images/freeky-icon.png')}
          className="w-72 h-52"
          resizeMode="contain"
        />
      </View>

      {/* TITLE */}
      <View className="items-center mt-2 px-6">
        <Text className="text-3xl font-semibold text-black">
          Verify OTP
        </Text>

        <Text className="text-gray-500 text-center text-base mt-2">
          Enter the 4-digit code sent to your phone or email
        </Text>
      </View>

      {/* OTP INPUTS */}
      <View className="flex-row justify-between mt-12 px-10">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref: TextInput | null) => (inputs.current[index] = ref)}
            value={digit}
            onChangeText={value => handleChange(value, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace(index);
              }
            }}
            keyboardType="number-pad"
            maxLength={1}
            className="w-16 h-16 border border-gray-500 rounded-2xl text-center text-xl font-semibold text-black"
          />
        ))}
      </View>

      {/* RESEND + TIMER */}
      <View className="flex-row justify-between mt-6 px-4">
        <Pressable>
          <Text className="text-blue-500 font-medium">
            Resend code
          </Text>
        </Pressable>
        <Text className="text-gray-500">01:59</Text>
      </View>

      {/* CONFIRM BUTTON */}
      <Pressable
onPress={() => {
  const parent = navigation.getParent();

  if (!signUp) {
    parent?.navigate('AuthStack', {
      screen: 'ResetPassword',
    });
  } else {
    parent?.navigate('MainTabs', {
      screen: 'Home',
    });
  }
}}

        className="mt-16"
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
            Confirm
          </Text>
        </LinearGradient>
      </Pressable>

      {/* FOOTER */}
      <View className="items-center mt-4">
        <Text className="text-gray-400 text-sm">
          Didn’t receive the OTP?
        </Text>
      </View>

    </SafeAreaView>
  );
}
