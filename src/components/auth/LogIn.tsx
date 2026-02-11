import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Pressable, 
  Image, 
  StyleSheet,
} from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import Button from '../common/Button';
import FloatingInput from '../common/FloatingInput';
import { login } from '../../api/auth';
import { loginSuccess } from '../../store/slices/authSlice';
import { decodeIdToken } from '../../utils/decodeToken';
import { showAndroidToast } from '../toast/androidToast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/Screens/AuthStack';



type Nav = StackNavigationProp<AuthStackParamList>;
export default function LoginScreen() {
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();

  /* ---------------- VALIDATION ---------------- */
const validate = () => {

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {
    showAndroidToast('Email is required');
    return false;
  }

  if (!emailRegex.test(email.trim())) {
    showAndroidToast('Enter a valid email address');
    return false;
  }

  if (!password) {
    showAndroidToast('Password is required');
    return false;
  }

  if (password.length < 6) {
    showAndroidToast('Password must be at least 6 characters');
    return false;
  }

  return true;
};


  /* ---------------- LOGIN ---------------- */
  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const data = await login({ email, password });

      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);
      await AsyncStorage.setItem('idToken', data.idToken);

      const user = decodeIdToken(data.idToken);
      await AsyncStorage.setItem('username', user?.username || '');

      dispatch(loginSuccess(user));

      showAndroidToast('Login successful');

      navigation.getParent()?.navigate('MainTabs', { screen: 'Home' });

    } catch (error: any) {
      showAndroidToast('Login failed. Please check your credentials.');
      console.log('LOGIN ERROR ❌', error?.response || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={70}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets={false}
      contentInsetAdjustmentBehavior="never"
      bounces={false}
      contentContainerStyle={styles.scrollContent}
    >

      {/* HEADER */}
      <View style={styles.headerSection}>
        <Image
          source={require('../../assets/images/freeky-icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-gray-900 mt-4">
          Welcome back
        </Text>
        <Text className="text-gray-500 text-base mt-1 text-center px-4">
          Sign in to your account to continue
        </Text>
      </View>

      {/* FORM */}
      <View className="space-y-5 w-full">

        {/* EMAIL */}
        <View>
          <Text className="text-sm font-semibold text-gray-700 ml-1 mb-2">
            Email Address
          </Text>

     

          <FloatingInput
            size="medium"
            value={email}
            onChangeText={(v: React.SetStateAction<string>) => {
              setEmail(v);
             
            }}
            placeholder="name@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

         
        </View>

        {/* PASSWORD */}
        <View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-sm font-semibold text-gray-700 ml-1">
              Password
            </Text>
          </View>

          <FloatingInput
            size="medium"
            value={password}
            onChangeText={(v: React.SetStateAction<string>) => {
              setPassword(v);
            }}
            placeholder="••••••••"
            secureTextEntry={secure}
            right={
              <PaperTextInput.Icon
                icon={secure ? 'eye-off' : 'eye'}
                onPress={() => setSecure(!secure)}
                size={20}
                color="#F97316"
                style={{ marginTop: 6 }}
              />
            }
          />

     
          {/* FORGOT */}
          <View className="items-end mt-2">
            <Pressable
              onPress={() =>
              //  navigation.getParent()?.navigate('AuthStack', { screen: 'SendOtp' })
                    navigation.replace('SendOtp', {
                      flow: 'forgotPassword',
                      email: email.trim(),
                    })}            >
              <Text className="text-md font-bold">
                Forgot?
              </Text>
            </Pressable>
          </View>
        </View>

        {/* LOGIN BUTTON */}
        <View className="mt-6">
          <Button
            size='medium'
            label={loading ? 'Loading...' : 'Login'}
            onPress={handleLogin}
            disabled={loading}
          />
        </View>

      </View>

{/* SOCIAL LOGIN SECTION */}

      <View className="mt-8 items-center w-full px-2">
        <Text className="text-gray-500 text-sm mb-6 font-medium">Or</Text>

        {/* Google Button */}
        <Pressable 
          className="flex-row items-center justify-center w-full py-3.5 border border-[#FFC107] rounded-full mb-4"
          onPress={() => console.log('Google Login')}
        >
          <Icon name="google" size={22} color="#DB4437" style={{ marginRight: 12 }} />
          <Text className="text-gray-800 font-semibold text-base">Continue with Google</Text>
        </Pressable>

        {/* Facebook Button */}
        <Pressable 
          className="flex-row items-center justify-center w-full py-3.5 border border-[#FFC107] rounded-full mb-4"
          onPress={() => console.log('Facebook Login')}
        >
          <Icon name="facebook" size={22} color="#1877F2" style={{ marginRight: 12 }} />
          <Text className="text-gray-800 font-semibold text-base">Continue with Facebook</Text>
        </Pressable>

        {/* Apple Button */}
        <Pressable 
          className="flex-row items-center justify-center w-full py-3.5 border border-[#FFC107] rounded-full mb-8"
          onPress={() => console.log('Apple Login')}
        >
          <Icon name="apple" size={22} color="#000000" style={{ marginRight: 12 }} />
          <Text className="text-gray-800 font-semibold text-base">Continue with Apple</Text>
        </Pressable>
      </View>

      {/* SIGN UP LINK */}
      <View className="mb-10 flex-row justify-center items-baseline">
        <Text className="text-gray-900 text-base">Don't have an account ? </Text>
        <Pressable
          // onPress={() => navigation.getParent()?.navigate('AuthStack', { screen: 'SignUp' })}
                    onPress={() => navigation.replace('SignUp')}

        >
          <Text className="text-black font-bold text-lg underline">Sign Up</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
 scrollContent: {
  paddingHorizontal: 24,
  paddingTop: 10,
  paddingBottom: 40,
},
  headerSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  logo: {
    width: 220,
    height: 180,
  },
  error: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
