import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image ,KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Button from '../common/Button';
import { Signup } from '../../api';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      Toast.show({
        type: 'error',
        text1: 'Missing fields',
        text2: 'All fields are required',
      });
      return;
    }

    if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Weak password',
        text2: 'Password must be at least 6 characters',
      });
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

      Toast.show({
        type: 'success',
        text1: 'Signup successful',
        text2: 'OTP sent to your phone',
      });

      navigation.getParent()?.navigate('AuthStack', {
        screen: 'OtpVerification',
        flow: 'signup',
        params: {
          signUp: true,
          email: payload.email,
        },
      });
    } catch (error: any) {
      const apiErrorMessage = error?.response?.data?.error || '';

      console.log('SIGNUP ERROR ❌', {
        message: error?.message,
        apiErrorMessage,
      });
      
      Toast.show({
        type: 'error',
        text1: 'Signup failed',
        text2: apiErrorMessage || 'Something went wrong',
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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
    <View className="flex-1 px-4 bg-white">
      {/* LOGO */}
      <View className="items-center mt-6">
        <Image
          source={require('../../assets/images/freeky-icon.png')}
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
            value={form.name}
            onChangeText={v => onChange('name', v)}
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
              value={form.phone}
              onChangeText={v => onChange('phone', v)}
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
            value={form.email}
            onChangeText={v => onChange('email', v)}
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
              value={form.password}
              onChangeText={v => onChange('password', v)}
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
      <Button
        label={loading ? 'Signing up...' : 'Sign up'}
        className="mt-24 mb-4"
        disabled={loading}
        onPress={handleSignup}
      />
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
