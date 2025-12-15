import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ServiceCard({ item }: any) {
  return (
    <View className="w-[22rem] m-6 bg-white rounded-2xl shadow-lg border border-gray-200 mx-2 pb-4">
      
      {/* Image */}
      <Image
        source={item.image}
        className="w-full h-40 rounded-t-2xl"
        resizeMode="cover"
      />

      {/* Title */}
      <Text
        numberOfLines={2}
        className="mt-3 px-4 font-semibold text-lg text-gray-900"
      >
        {item.title}
      </Text>

      {/* Rating */}
      <View className="flex-row items-center px-4 mt-2">
        {[...Array(5)].map((_, index) => (
          <Icon key={index} name="star" size={16} color="#facc15" />
        ))}
        <Text className="ml-2 text-gray-700 font-medium">{item.rating}</Text>
        <Text className="ml-2 text-gray-500">{item.reviews}+</Text>
      </View>

      {/* Price */}
      <View className="px-4 mt-2">
        <Text className="text-black w-16 bg-gray-100 px-3 py-1 rounded-full font-semibold w-fit">
          ${item.price}
        </Text>
      </View>

      {/* Store */}
      <Text className="px-4 mt-1 text-gray-500">{item.store}</Text>
    </View>
  );
}