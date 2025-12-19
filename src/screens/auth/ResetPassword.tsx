/* eslint-disable react/self-closing-comp */
import { SafeAreaView } from 'react-native-safe-area-context';
import ResetPassword from '../../components/auth/ResetPassword';
import { StatusBar, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ScreenHeader from '../../components/common/ScreenHeader';

export default function resetPassword() {
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
    <ResetPassword />
    </SafeAreaView>
  );
}
