/* eslint-disable react/self-closing-comp */
import {StatusBar } from 'react-native';
import PasswordSuccess from '../../components/auth/PasswordSuccess';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function PasswordSucess() {
 return (
        <SafeAreaView className="flex-1 bg-white">
                <StatusBar
                        barStyle={'dark-content'}
                        backgroundColor="#FFFFFF"
                        translucent              />

    <PasswordSuccess />
    </SafeAreaView>
  );
}
