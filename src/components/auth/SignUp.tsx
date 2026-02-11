import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image,  
  StyleSheet, 
  Pressable 
} from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Dropdown } from 'react-native-element-dropdown';
import Button from '../common/Button';
import FloatingInput from '../common/FloatingInput';
import { Signup } from '../../api';
import { showAndroidToast } from '../toast/androidToast';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/Screens/AuthStack';



type Nav = StackNavigationProp<AuthStackParamList>;


export default function SignUpScreen() {

  const countryCodeOptions = [
  { label: '+91', value: '+91' },
  { label: '+44', value: '+44' },
];

 const [countryCode, setCountryCode] = useState('+91');
const [codeFocus, setCodeFocus] = useState(false);

const navigation = useNavigation<Nav>();

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

const validate = () => {

  if (!form.name.trim() || form.name.trim().length < 2) {
    showAndroidToast('Enter a valid name');
    return false;
  }

  if (!/^\d{10}$/.test(form.phone)) {
    showAndroidToast('Enter 10 digit phone number');
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email.trim())) {
    showAndroidToast('Enter a valid email');
    return false;
  }

  if (form.password.length < 6) {
    showAndroidToast('Minimum 6 characters required');
    return false;
  }

  return true;
};


  const handleSignup = async () => {
    if (!validate()) return;

    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);

    const payload = {
      full_name: form.name.trim(),
      email: form.email.trim(),
     number: `${countryCode}${form.phone}`,
      password: form.password,
    };

    try {
      setLoading(true);
      await Signup(payload);

      showAndroidToast('Signup successful. Please verify OTP');

       navigation.getParent()?.navigate('AuthStack', { screen: 'OtpVerification', signUp: true, flow: 'signup', email: payload.email });
 
    } catch (error: any) {
      const apiErrorMessage =
        error?.response?.data?.error || 'Signup failed. Please try again.';
      showAndroidToast(apiErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
  <KeyboardAwareScrollView
    bottomOffset={70}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="always"
    automaticallyAdjustKeyboardInsets={false}
    contentInsetAdjustmentBehavior="never"
    bounces={false}
    contentContainerStyle={styles.scrollContent}
  >

    <View style={styles.headerSection}>
      <Image
        source={require('../../assets/images/freeky-icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text className="text-3xl font-bold text-gray-900 mt-4">
        Create Account
      </Text>
      <Text className="text-gray-500 text-base mt-1 text-center px-4">
        Join us to start your journey
      </Text>
    </View>

    <View className="space-y-4 w-full">

      {/* NAME */}
      <View>
        <Text className="text-sm font-semibold text-gray-700 ml-1 mb-1.5">Full Name</Text>

        <FloatingInput
          size="medium"
          value={form.name}
          onChangeText={(v: string) => onChange('name', v)}
          placeholder="Enter your name"
          autoCapitalize="words"
        />

      </View>

      {/* PHONE */}
      <View>
        <Text className="text-sm font-semibold text-gray-700 ml-1 mb-1.5">Phone Number</Text>
<View className="flex-row items-start gap-2">
         <View style={{ width: 80 }}>
  <Dropdown
 style={{
      height: 48,
      borderWidth: 1.2,
      borderRadius: 12,
      borderColor: codeFocus ? '#FB923C' : '#FB923C',
      backgroundColor: 'white',
      justifyContent: 'center',
      paddingHorizontal: 4,
    }}

    data={countryCodeOptions}
    labelField="label"
    valueField="value"
    value={countryCode}

    placeholder="+91"

    placeholderStyle={{
      fontSize: 14,
      color: '#9CA3AF',
      textAlign: 'center',
    }}

    selectedTextStyle={{
      fontSize: 14,
      color: '#000',
      textAlign: 'center',
      fontWeight: '500',
    }}

    itemTextStyle={{
      fontSize: 14,
      textAlign: 'center',
    }}

    activeColor="#FFF7ED"

    iconStyle={{ display: 'none' }} // hides arrow

    containerStyle={{
      borderRadius: 12,
      overflow: 'hidden',
      elevation: 6,
    }}

    onFocus={() => setCodeFocus(true)}
    onBlur={() => setCodeFocus(false)}

    onChange={(item: { value: React.SetStateAction<string>; }) => {
      setCountryCode(item.value);
      setCodeFocus(false);
    }}
  />
</View>
          <View className="flex-1">

            <FloatingInput
              size="medium"
              value={form.phone}
              onChangeText={(v: string) => onChange('phone', v.replace(/[^0-9]/g,''))}
              placeholder="8888888888"
              keyboardType="phone-pad"
            />
            </View>
          </View>
        </View>
    

      {/* EMAIL */}
      <View>
        <Text className="text-sm font-semibold text-gray-700 ml-1 mb-1.5">Email Address</Text>

        <FloatingInput
          size="medium"
          value={form.email}
          onChangeText={(v: string) => onChange('email', v)}
          placeholder="name@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
   
      </View>

      {/* PASSWORD */}
      <View>
        <Text className="text-sm font-semibold text-gray-700 ml-1 mb-1.5">Password</Text>

        <FloatingInput
          size="medium"
          value={form.password}
          onChangeText={(v: string) => onChange('password', v)}
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
     
      </View>

      <View className="mt-6">
        <Button
          size="medium"
          label={loading ? 'Signing up...' : 'Sign up'}
          onPress={handleSignup}
          disabled={loading}
        />
      </View>
    </View>

    <View className="mt-8 mb-8 flex-row justify-center items-baseline">
      <Text className="text-gray-500 text-base">Already have an account? </Text>
      {/* <Pressable onPress={() =>  navigation.getParent()?.navigate('AuthStack', { screen: 'Login' })}> */}
            <Pressable onPress={() => navigation.replace('Login')}>

        <Text className="text-black font-bold text-lg">Login</Text>
      </Pressable>
    </View>

  </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
  },
  headerSection: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 120,
  },
  error: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
