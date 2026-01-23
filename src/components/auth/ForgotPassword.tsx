/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, TextInput, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../common/Button';
import { forgotPassword } from '../../api/auth';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import ScreenHeader from '../common/ScreenHeader';
import { showAndroidToast } from '../toast/androidToast';


export default function ForgotPasswordScreen() {
  const navigation = useNavigation<any>();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!username) {

        showAndroidToast('Please enter email or phone');


      return;
    }

    try {
      setLoading(true);

      await forgotPassword({email: username });

      showAndroidToast('OTP sent successfully');

      navigation.navigate('OtpVerification', {
         email: username,
        flow: 'forgotPassword',
      });
    } catch (error: any) {
      showAndroidToast('Something went wrong. Please try again.');

    } finally {
      setLoading(false);
    }
  };

 return (
  <>
    <SafeAreaView className="flex-1">
           <ScreenHeader title="Forgot Password" rightType="menu" showBack={false} />
<ScrollView className='flex-1 px-4'>
      {/* LOGO */}
      <View className="items-center pt-8">
        <Image
          source={require('../../assets/images/freeky-icon.png')}
          className="w-90 h-40"
          resizeMode="contain"
        />
      </View>

      {/* TITLE */}
      <View className="items-center pt-6 px-6">
        <Text className="text-3xl font-semibold text-black">
          Forgot Password
        </Text>

        <Text className="text-gray-500 text-center text-base pt-2">
          Enter your email or phone number to receive the OTP
        </Text>
      </View>

      {/* INPUT */}
      <View className="pt-16 px-2">
        <Text className="text-md font-medium text-gray-400 m-2">
          Email / Phone No.
        </Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Enter email or phone number"
          placeholderTextColor="#6B7280"
          keyboardType="email-address"
          autoCapitalize="none"
          className="h-16 border border-gray-500 rounded-2xl px-5 text-base text-black"
        />
      </View>

      {/* SEND OTP BUTTON */}
      <Button
        label="Send OTP"
        className="mt-24"
        onPress={handleSendOtp}
        disabled={loading}
      />
      </ScrollView>
    </SafeAreaView>
  
    </>
  );
}

