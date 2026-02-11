import React from 'react';
import Login from '../../components/auth/LogIn';
import ScreenHeader from '../../components/common/ScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  return (
        <SafeAreaView className="flex-1 bg-white">
<ScreenHeader title="Log In"   align="center" showBack={true} />
    <Login />

    
    </SafeAreaView>
  );
}
