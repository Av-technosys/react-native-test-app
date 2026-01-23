import { StatusBar } from 'react-native';
import React from 'react';
import Login from '../../components/auth/LogIn';
import ScreenHeader from '../../components/common/ScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import KeyboardWrapper from '../../components/common/KeyboardWrapper'

export default function LoginScreen() {
  return (
        <SafeAreaView className="flex-1 bg-white">
                <StatusBar
                        barStyle={'dark-content'}
                        backgroundColor="#FFFFFF"
                        translucent              />
<ScreenHeader title="Log In" rightType="menu" showBack={true} />
<KeyboardWrapper>
    <Login />
</KeyboardWrapper>
    
    </SafeAreaView>
  );
}
