import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl text-black">Event Screen </Text>
      </View>
    </SafeAreaView>
  );
}
