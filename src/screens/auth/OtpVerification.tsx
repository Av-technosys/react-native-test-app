/* eslint-disable react/self-closing-comp */
import OtpVerification from '../../components/auth/OtpVerificationScreen';

import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';

export default function otpVerification() {
  return (
        <SafeAreaView className="flex-1 bg-white">
               
                            <ScreenHeader  align="center" title="Enter OTP"  showBack={true} />
                        

    <OtpVerification />
    </SafeAreaView>
  );
}
