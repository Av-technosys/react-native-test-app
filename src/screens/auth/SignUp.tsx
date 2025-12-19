/* eslint-disable react/self-closing-comp */
import { SafeAreaView } from 'react-native-safe-area-context';
import SignUp from '../../components/auth/SignUp';
import { StatusBar, View } from 'react-native';
import ScreenHeader from '../../components/common/ScreenHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function signUp() {
  return (
        <SafeAreaView className="flex-1 bg-white">
                <StatusBar
                        barStyle={'dark-content'}
                        backgroundColor="#FFFFFF"
                        translucent              />
                          <ScreenHeader
                                        title="Sign Up"
                                        right={
                                          <View className="relative">
                                            <MaterialIcons name="more-vert" size={22} color="#000" />
                                          </View>
                                        }
                                      />
    <SignUp />
    </SafeAreaView>
  );
}
