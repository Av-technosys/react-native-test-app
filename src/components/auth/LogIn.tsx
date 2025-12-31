import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Button from '../common/Button';
import { login } from '../../api/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decodeIdToken } from '../../utils/decodeToken';
import { showMessage } from 'react-native-flash-message';


export default function LoginScreen() {
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();


const handleLogin = async () => {
  if (!email || !password) {
    showMessage({
      message: 'Missing fields',
      description: 'Email and password are required',
      type: 'danger',
    });
    return;
  }

  const payload = {
    username: email,
    password,
  };

  console.log('LOGIN PAYLOAD 👉', payload);

  try {
    setLoading(true);

    const data = await login(payload);

    await AsyncStorage.setItem('accessToken', data.accessToken);
    await AsyncStorage.setItem('refreshToken', data.refreshToken);
    await AsyncStorage.setItem('idToken', data.idToken);

    const user = decodeIdToken(data.idToken);

    console.log('DECODED USER 👉', user);

    dispatch(loginSuccess(user));

    showMessage({
      type: 'success',
      message: 'Login successful',
      description: `Welcome back ${user.email}`,
    });

    navigation.getParent()?.navigate('MainTabs', {
      screen: 'Home',
    });
  } catch (error: any) {
    showMessage({
      type: 'danger',
      message: 'Login failed',
      description: error?.response?.data?.message || 'Invalid credentials',
    });

    console.log('LOGIN ERROR ❌', error?.response || error);
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
        className='px-4'
      >
      {/* LOGO */}
      <View className="items-center">
        <Image
          source={require('../../assets/images/freeky-icon.png')}
          className="w-96 h-60"
          resizeMode="contain"
        />
      </View>

      {/* TITLE */}
      <Text className="text-center text-black font-semibold text-3xl mt-2">
        Get Started now
      </Text>
      <Text className="text-center text-gray-500 text-lg mt-2 px-6">
        Create an account or log in to explore our app
      </Text>

      {/* FORM */}
      <View className="mt-10 px-2 space-y-6">
        {/* EMAIL */}
        <View>
          <Text className="text-md font-medium text-gray-400 m-2">
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#6B7280"
            keyboardType="email-address"
            autoCapitalize="none"
            className="h-16 border border-gray-500 rounded-2xl px-5 text-base text-black"
          />
        </View>

        {/* PASSWORD */}
        <View>
          <Text className="text-md font-medium text-gray-400 m-2">
            Password
          </Text>
          <View className="flex-row items-center h-16 border border-gray-500 rounded-2xl px-4">
            <TextInput
              value={password}
              onChangeText={setPassword}
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

          <Pressable
            onPress={() =>
              navigation.getParent()?.navigate('AuthStack', {
                screen: 'ForgotPassword',
              })
            }
            className="mt-4 self-end"
          >
            <Text className="text-base text-blue-500">
              Forgot Password?
            </Text>
          </Pressable>
        </View>
      </View>

      {/* LOGIN BUTTON */}
      <Button
        label={loading ? 'Logging in...' : 'Log In'}
        className="mt-24 mb-6"
        onPress={handleLogin}
        disabled={loading}
      />

      {/* SIGN UP LINK */}
      <Pressable
        onPress={() =>
          navigation.getParent()?.navigate('AuthStack', {
            screen: 'SignUp',
          })
        }
        className="mt-6 flex-row justify-center"
      >
        <Text>Don’t have an account? </Text>
        <Text className="text-blue-500 font-semibold">Sign Up</Text>
      </Pressable>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
