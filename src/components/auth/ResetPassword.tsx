/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

// Internal Imports
import Button from '../common/Button';
import FloatingInput from '../common/FloatingInput';
import { confirmForgotPassword } from '../../api/auth';
import { showAndroidToast } from '../toast/androidToast';

type RouteParams = {
  ResetPassword: {
    username: string;
    code: string;
  };
};

export default function ResetPasswordScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RouteParams, 'ResetPassword'>>();

  const { username, code } = route.params ?? {};

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure1, setSecure1] = useState(true);
  const [secure2, setSecure2] = useState(true);
  const [loading, setLoading] = useState(false);



  /* ---------- validation ---------- */
const validate = () => {

  if (!password) {
    showAndroidToast('Password is required');
    return false;
  }

  if (password.length < 6) {
    showAndroidToast('Minimum 6 characters required');
    return false;
  }

  if (!confirmPassword) {
    showAndroidToast('Please confirm password');
    return false;
  }

  if (password !== confirmPassword) {
    showAndroidToast('Passwords do not match');
    return false;
  }

  return true;
};

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await confirmForgotPassword({
        username,
        code,
        newPassword: password,
      });

      showAndroidToast('Password reset successful');

      navigation.reset({
        index: 0,
        routes: [{ name: 'PasswordSuccess' }],
      });

    } catch (error: any) {
      showAndroidToast('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
<KeyboardAwareScrollView
  showsVerticalScrollIndicator={false}
  keyboardShouldPersistTaps="always"
  automaticallyAdjustKeyboardInsets={false}
  contentInsetAdjustmentBehavior="never"
  bounces={false}
>

<View className="flex-1 px-6">

  {/* LOGO */}
  <View className="items-center mt-6">
    <Image
      source={require('../../assets/images/freeky-icon.png')}
      className="w-52 h-44"
      resizeMode="contain"
    />
    <Text className="text-3xl font-bold text-gray-900 mt-4">
      Reset Password
    </Text>
    <Text className="text-gray-500 text-center text-base mt-2 px-4">
      Please create a new password for your account
    </Text>
  </View>

  {/* FORM */}
  <View className="mt-10 space-y-5">

    {/* NEW PASSWORD */}
    <View>
      <Text className="text-sm font-semibold text-gray-700 ml-1 mb-1.5">
        New Password
      </Text>

      <FloatingInput
        size="medium"
        placeholder="••••••••"
        secureTextEntry={secure1}
        value={password}
        onChangeText={(v: React.SetStateAction<string>) => {
          setPassword(v);
        }}
        right={
          <PaperTextInput.Icon
            icon={secure1 ? 'eye-off' : 'eye'}
            onPress={() => setSecure1(!secure1)}
            size={20}
            color="#F97316"
            style={{ marginTop: 6 }}
          />
        }
      />
    </View>

    {/* CONFIRM PASSWORD */}
    <View>
      <Text className="text-sm font-semibold text-gray-700 ml-1 mb-1.5">
        Confirm Password
      </Text>

      <FloatingInput
        size="medium"
        placeholder="••••••••"
        secureTextEntry={secure2}
        value={confirmPassword}
        onChangeText={(v: React.SetStateAction<string>) => {
          setConfirmPassword(v);
        }}
        right={
          <PaperTextInput.Icon
            icon={secure2 ? 'eye-off' : 'eye'}
            onPress={() => setSecure2(!secure2)}
            size={20}
            color="#F97316"
            style={{ marginTop: 6 }}
          />
        }
      />
     
    </View>

  </View>

  {/* BUTTON */}
  <View className="mt-16 mb-10">
    <Button
      size="medium"
      label={loading ? "Updating..." : "Submit"}
      onPress={handleSubmit}
      disabled={loading}
    />
  </View>

</View>
</KeyboardAwareScrollView>
  );
}
