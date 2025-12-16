import { View, Text, Image, Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type RecommendationCardProps = {
  image: any;
  title: string;
  price: string;
  onPress?: () => void;
};

export default function RecommendationCard({
  image,
  title,
  price,
  onPress,
}: RecommendationCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className=" m-4 mr-0 mt-2 bg-white border border-gray-200  rounded-2xl  shadow-gray-300  shadow-lg w-52"
    >
      {/* IMAGE */}
      <Image
        source={image}
        className="w-full h-36 rounded-t-xl"
        resizeMode="cover"
      />

      {/* CONTENT */}
  <View className="p-3">
  <Text
    className="text-md font-medium text-black"
    numberOfLines={1}
  >
    {title}
  </Text>

  <View className="mt-1 flex-row items-center">
  <MaterialIcons
    name="attach-money"
    size={16}
    color="#F97316"
  />
    <Text className="text-md font-bold text-orange-500">
      {price}
    </Text>
  </View>
</View>

    </Pressable>
  );
}
