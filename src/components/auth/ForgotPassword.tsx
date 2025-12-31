import { View, Text, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../common/Button';
import { forgotPassword } from '../../api/auth';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import ScreenHeader from '../common/ScreenHeader';
import { showMessage } from 'react-native-flash-message';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<any>();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!username) {
     showMessage({
        type: 'danger',
        message: 'Required',
        description: 'Please enter email or phone',
      });
      return;
    }

    try {
      setLoading(true);

      await forgotPassword({ username });

      showMessage({
        type: 'success',
        message: 'OTP Sent',
        description: 'Check your email',
      });

      navigation.navigate('OtpVerification', {
         email: username,
        flow: 'forgotPassword',
      });
    } catch (error: any) {
      showMessage({
        type: 'danger',
        message: 'Failed',
        description: error?.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

 return (
          <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
         <ScreenHeader title="Forgot Password" rightType="menu" />
    <SafeAreaView className="flex-1 bg-white px-5">

      {/* LOGO */}
      <View className="items-center mt-4">
        <Image
          source={require('../../assets/images/freeky-icon.png')}
          className="w-80 h-56"
          resizeMode="contain"
        />
      </View>

      {/* TITLE */}
      <View className="items-center mt-2 px-6">
        <Text className="text-3xl font-semibold text-black">
          Forgot Password
        </Text>

        <Text className="text-gray-500 text-center text-base mt-2">
          Enter your email or phone number to receive the OTP
        </Text>
      </View>

      {/* INPUT */}
      <View className="mt-10 px-2">
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
        className="mt-16"
        onPress={handleSendOtp}
        disabled={loading}
      />
    </SafeAreaView>
  
    </KeyboardAvoidingView>
  );
}

