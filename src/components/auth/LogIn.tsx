import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Pressable, 
  Image, 

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../common/Button';
import { login } from '../../api/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decodeIdToken } from '../../utils/decodeToken';
import { showAndroidToast } from '../toast/androidToast';
import { TextInput } from 'react-native-paper';

export default function LoginScreen() {
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      showAndroidToast('Please enter email and password');
      return;
    }

    const payload = {
      email,
      password,
    };

 
    try {
      setLoading(true);

      const data = await login(payload);

      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);
      await AsyncStorage.setItem('idToken', data.idToken);

      const user = decodeIdToken(data.idToken);

     
      await AsyncStorage.setItem('username', user?.username);

      dispatch(loginSuccess(user));

       showAndroidToast('Login successful');

      navigation.getParent()?.navigate('MainTabs', {
        screen: 'Home',
      });
    } catch (error: any) {
      showAndroidToast('Login failed. Please check your credentials.');

      console.log('LOGIN ERROR ❌', error?.response || error);
    } finally {
      setLoading(false);
    }
  };

  return (
<>
          {/* LOGO */}
          <View className="items-center">
            <Image
              source={require('../../assets/images/freeky-icon.png')}
              className="w-96 h-40"
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
  keyboardType="email-address"
  autoCapitalize="none"
  mode="outlined"
  style={{ height: 56, backgroundColor: 'white' }}
  outlineStyle={{ borderRadius: 16 }}
 outlineColor="#FB923C"        // orange (inactive)
  activeOutlineColor="#FB923C"  // darker orange (focused)
  textColor="#000000"
  placeholderTextColor="#6B7280"
/>

            </View>

            {/* PASSWORD */}
        <View>
  <Text className="text-md font-medium text-gray-400 m-2">
    Password
  </Text>

  <TextInput
    value={password}
    onChangeText={setPassword}
    placeholder="********"
    secureTextEntry={secure}
    mode="outlined"
    style={{ height: 56, backgroundColor: 'white' }}
    outlineStyle={{ borderRadius: 16 }}
 outlineColor="#FB923C"        // orange (inactive)
  activeOutlineColor="#FB923C"  // darker orange (focused)
    textColor="#000000"
    right={
      <TextInput.Icon
        icon={secure ? 'eye-off' : 'eye'}
        onPress={() => setSecure(!secure)}
      />
    }
  />
</View>

            
          </View>

          {/* LOGIN BUTTON */}
       <Button
  label={loading ? 'Logging in...' : 'Log In'}
  variant="paper"
  icon="login"          // optional (Paper icon name)
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
            <Text>Don't have an account? </Text>
            <Text className="text-blue-500 font-semibold">Sign Up</Text>
          </Pressable>
 </>
  );
}
