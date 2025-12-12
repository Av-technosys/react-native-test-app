import { View, Text, Image } from 'react-native';

export default function ShowcaseCard({ item }: any) {
  return (
    <View className="mr-5">
      
      {/* IMAGE */}
      <Image
        source={item.image}
        className="w-70 h-48 rounded-xl"
        resizeMode="cover"
      />

      {/* NUMBER + PRICE */}
      <View className="flex-row items-center mt-2">
        <Text className="text-3xl font-extrabold text-orange-500">
          {item.number}
        </Text>

        <Text className="ml-2 text-base text-gray-800">
          Starting <Text className="text-orange-500 font-semibold">${item.price}</Text>
        </Text>
      </View>

    </View>
  );
}
