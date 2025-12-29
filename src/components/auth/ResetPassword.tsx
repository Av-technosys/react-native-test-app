import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { confirmForgotPassword } from '../../api/auth';

type RouteParams = {
  ResetPassword: {
    username: string;
    code: string;
  };
};

export default function ResetPasswordScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RouteParams, 'ResetPassword'>>();
  const { username, code } = route.params;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure1, setSecure1] = useState(true);
  const [secure2, setSecure2] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please fill all fields',
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Mismatch',
        text2: 'Passwords do not match',
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

    try {
      setLoading(true);

      await confirmForgotPassword({
        username,
        code,
        newPassword: password,
      });

      Toast.show({
        type: 'success',
        text1: 'Password updated',
        text2: 'You can now login',
      });

      navigation.reset({
        index: 0,
        routes: [{ name: 'PasswordSuccess' }],
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2:
          error?.response?.data?.message ||
          'Unable to reset password',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      {/* LOGO */}
      <View className="items-center">
        <Image
          source={require('../../assets/images/freeky-icon.png')}
          className="w-72 h-52"
          resizeMode="contain"
        />
      </View>

      {/* TITLE */}
      <View className="items-center mt-2">
        <Text className="text-3xl font-semibold text-black">
          Reset Password
        </Text>
        <Text className="text-gray-500 text-center mt-2 px-6">
          Please create a new password for your account
        </Text>
      </View>

      {/* FORM */}
      <View className="mt-10 space-y-6">
        {/* NEW PASSWORD */}
        <View>
          <Text className="text-md font-medium text-gray-400 mb-2">
            New Password
          </Text>
          <View className="flex-row items-center h-16 border border-gray-500 rounded-2xl px-4">
            <TextInput
              placeholder="Enter new password"
              secureTextEntry={secure1}
              value={password}
              onChangeText={setPassword}
              className="flex-1 text-base text-black"
            />
            <Pressable onPress={() => setSecure1(!secure1)}>
              <Feather
                name={secure1 ? 'eye-off' : 'eye'}
                size={20}
                color="#9CA3AF"
              />
            </Pressable>
          </View>
        </View>

        {/* CONFIRM PASSWORD */}
        <View>
          <Text className="text-md font-medium text-gray-400 mb-2">
            Confirm Password
          </Text>
          <View className="flex-row items-center h-16 border border-gray-500 rounded-2xl px-4">
            <TextInput
              placeholder="Confirm new password"
              secureTextEntry={secure2}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              className="flex-1 text-base text-black"
            />
            <Pressable onPress={() => setSecure2(!secure2)}>
              <Feather
                name={secure2 ? 'eye-off' : 'eye'}
                size={20}
                color="#9CA3AF"
              />
            </Pressable>
          </View>
        </View>
      </View>

      {/* SUBMIT */}
      <Pressable
        onPress={handleSubmit}
        disabled={loading}
        className="mt-16 mb-8"
        style={{ height: 56, borderRadius: 999, overflow: 'hidden' }}
      >
        <LinearGradient
          colors={['#FACC15', '#F97316']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text className="font-bold text-xl text-white">
            Submit
          </Text>
        </LinearGradient>
      </Pressable>
    </SafeAreaView>
  );
}
