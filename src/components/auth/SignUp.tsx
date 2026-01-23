import React, { useState } from 'react';
import { View, Text, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../common/Button';
import { Signup } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showAndroidToast } from '../toast/androidToast';
import AppTextInput from '../common/AppTextInput';

export default function SignUpScreen() {
  const navigation = useNavigation<any>();

  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  const onChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSignup = async () => {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);

    const { name, phone, email, password } = form;

    if (!name || !phone || !email || !password) {
      showAndroidToast('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
    showAndroidToast('Password must be at least 6 characters');
      return;
    }

    const payload = {
      full_name: name,
      email,
      number: `+91${phone}`,
      password,
    };

    try {
      setLoading(true);

      console.log('SIGNUP PAYLOAD 👉', payload);

      const res = await Signup(payload);

      console.log('SIGNUP RESPONSE ✅', res?.data);

     showAndroidToast('Signup successful. Please verify OTP');

      navigation.getParent()?.navigate('AuthStack', {
        screen: 'OtpVerification',
        params: {
          signUp: true,
          flow: 'signup',
          email: payload.email,
        },
      });
    } catch (error: any) {
      const apiErrorMessage = error?.response?.data?.error || '';

      console.log('SIGNUP ERROR ❌', {
        message: error?.message,
        apiErrorMessage,
      });

    showAndroidToast(
        apiErrorMessage || 'Signup failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
<>      {/* LOGO */}
      <View className="items-center">
        <Image
          source={require('../../assets/images/freeky-icon.png')}
          className="w-96 h-40"
          resizeMode="contain"
        />
      </View>

      {/* FORM */}
      <View className="mt-8 px-2 space-y-6">
        {/* NAME */}
        <View>
      <Text className="text-md font-medium text-gray-400 m-2">Name</Text>
<AppTextInput
  value={form.name}
  onChangeText={v => onChange('name', v)}
  placeholder="Enter your name"
/>

        </View>

        {/* PHONE */}
        <View>
          <Text className="text-md font-medium text-gray-400 m-2">Phone no.</Text>

<View className="flex-row items-center gap-3">
   <AppTextInput
         value={'+44'}
         onChangeText={() => {}}
/>

  <View className="flex-1">
    <AppTextInput
      value={form.phone}
      onChangeText={v => onChange('phone', v)}
      placeholder="Phone number"
      keyboardType="phone-pad"
    />
  </View>
</View>

        </View>

        {/* EMAIL */}
        <View>
         <Text className="text-md font-medium text-gray-400 m-2">Email</Text>
<AppTextInput
  value={form.email}
  onChangeText={v => onChange('email', v)}
  placeholder="name@example.com"
  keyboardType="email-address"
/>
        </View>

        {/* PASSWORD */}
        <View>
         <Text className="text-sm font-medium text-gray-400 m-2">Password</Text>

<AppTextInput
  value={form.password}
  onChangeText={v => onChange('password', v)}
  placeholder="********"
  secureTextEntry={secure}
  right={{
    icon: secure ? 'eye-off' : 'eye',
    onPress: () => setSecure(!secure),
  }}
/>

          </View>
        </View>

      {/* SIGN UP BUTTON */}
      <Button
        label={loading ? 'Signing up...' : 'Sign up'}
        className="mt-24 mb-4"
        disabled={loading}
        onPress={handleSignup}
      />
   </>
  );
}
