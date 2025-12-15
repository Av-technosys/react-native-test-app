import { View, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import SectionHeader from '../common/SectionHeader';

export default function WeddingBanner() {
  return (
    <View className="mt-6">
      <SectionHeader
        left={
          <Text className="text-2xl font-bold text-black">
            Today Special Events 🎊
          </Text>
        }
        right={<Icon name="chevron-right" size={22} color="#666" />}
      />

<View className="relative w-full -mt-8 z-10">
  <Image
    source={require('../../assets/images/weddingBanner.png')}
    className="w-full h-66"
    resizeMode="stretch"
  />
</View>

    </View>
  );
}
