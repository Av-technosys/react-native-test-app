/* eslint-disable react/self-closing-comp */
import { StatusBar } from 'react-native';
import OtpVerification from '../../components/auth/OtpVerificationScreen';
import KeyboardWrapper from '../../components/common/KeyboardWrapper'

import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';

export default function otpVerification() {
  return (
        <SafeAreaView className="flex-1 bg-white">
                <StatusBar
                        barStyle={'dark-content'}
                        backgroundColor="#FFFFFF"
                        translucent              />
                            <ScreenHeader title="Enter Otp" rightType="menu" showBack={true} />
                        

<KeyboardWrapper>
    <OtpVerification />
    </KeyboardWrapper>
    </SafeAreaView>
  );
}
