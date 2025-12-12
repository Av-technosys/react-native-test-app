import { View, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function WeddingBanner() {
  return (
    <View className="mt-2 ">
<View className="flex-row items-center justify-between w-full px-2 mt-4">

  {/* LEFT SIDE: Title + Emoji */}

    <Text className="text-2xl ml-2 font-bold text-black">
      Today Special Events 🎊
    </Text>




  {/* RIGHT SIDE: Feather Arrow */}
  <Icon name="chevron-right" size={22} color="#666" />

</View>
      <View className="rounded-2xl  overflow-hidden">
        <Image
          source={require('../../assets/images/weddingBanner.png')}
          className="w-full h-60"
          resizeMode="cover"
        />
      </View>
    </View>
  );
}
