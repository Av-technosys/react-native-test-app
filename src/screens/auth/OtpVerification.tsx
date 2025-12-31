/* eslint-disable react/self-closing-comp */
import { StatusBar } from 'react-native';
import OtpVerification from '../../components/auth/OtpVerificationScreen';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function otpVerification() {
  return (
        <SafeAreaView className="flex-1 bg-white">
                <StatusBar
                        barStyle={'dark-content'}
                        backgroundColor="#FFFFFF"
                        translucent              />

    <OtpVerification />
    </SafeAreaView>
  );
}
