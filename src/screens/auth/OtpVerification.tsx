/* eslint-disable react/self-closing-comp */
import { StatusBar, View } from 'react-native';
import OtpVerification from '../../components/auth/OtpVerificationScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../../components/common/ScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function otpVerification() {
  return (
        <SafeAreaView className="flex-1 bg-white">
                <StatusBar
                        barStyle={'dark-content'}
                        backgroundColor="#FFFFFF"
                        translucent              />
                          <ScreenHeader
                                        title="Enter Otp"
                                        right={
                                          <View className="relative">
                                            <MaterialIcons name="more-vert" size={22} color="#000" />
                                          </View>
                                        }
                                      />
    <OtpVerification />
    </SafeAreaView>
  );
}
