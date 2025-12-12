import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function ServiceCard({ item }: any) {
  return (
    <View className="bg-white rounded-xl mb-4 shadow-sm p-3">
      {/* Image */}
      <Image
        source={item.image}
        className="w-full h-40 rounded-xl"
        resizeMode="cover"
      />

      {/* Title */}
      <Text className="mt-3 font-semibold text-base text-gray-900">
        {item.title}
      </Text>

      {/* Rating + Reviews */}
      <View className="flex-row items-center mt-1">
        <Icon name="star" size={16} color="#facc15" />
        <Text className="ml-1 text-gray-700">{item.rating}</Text>

        <Text className="ml-2 text-gray-500">{item.reviews}+</Text>
      </View>

      {/* Price */}
      <Text className="mt-1 text-orange-600 font-semibold">${item.price}</Text>

      {/* Store name */}
      <Text className="text-gray-500">{item.store}</Text>
    </View>
  );
}
