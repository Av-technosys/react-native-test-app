/* eslint-disable react/self-closing-comp */
import { SafeAreaView } from 'react-native-safe-area-context';
import SendOtp from '../../components/auth/SendOtpScreen';
import { StatusBar, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../../components/common/ScreenHeader';

export default function sendOtp() {
 return (
        <SafeAreaView className="flex-1 bg-white">
                <StatusBar
                        barStyle={'dark-content'}
                        backgroundColor="#FFFFFF"
                        translucent              />
                          <ScreenHeader
                                        title="Forgot Password"
                                        right={
                                          <View className="relative">
                                            <MaterialIcons name="more-vert" size={22} color="#000" />
                                          </View>
                                        }
                                      />
    <SendOtp />
    </SafeAreaView>
  );
}
