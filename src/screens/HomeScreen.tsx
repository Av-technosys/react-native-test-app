import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Feather name="home" size={30} color="red" />

        <Text className="text-xl  text-black">Home Screen</Text>
      </View>
  

    </SafeAreaView>
  );
}
