import { View, Text, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  CategoryProducts: undefined;
  ProductDetails: any;
};

export default function ServiceCard({ item }: any) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() =>
        navigation.getParent()?.navigate('FlowStack', {
          screen: 'ProductDetails',
  params: {
    productId: item.id,
  }        })
      }
      className="w-[22rem] bg-white rounded-2xl border border-gray-200 mx-2 overflow-hidden"
    >
      {/* IMAGE */}
<View className="w-full h-44 overflow-hidden">
  <Image
    source={item.image}
    className="w-full h-full"
    resizeMode="cover"
  />
</View>

      {/* CONTENT */}
      <View className="px-4 py-3">
        {/* TITLE */}
        <Text
          numberOfLines={2}
          className="text-base font-semibold text-gray-900"
        >
          {item.title}
        </Text>

        {/* RATING */}
        <View className="flex-row items-center mt-2">
          {[...Array(item.rating)].map((_, index) => (
            <Icon key={index} name="star" size={16} color="#facc15" />
          ))}
        </View>

        {/* PRICE (only if available) */}
        {item.price ? (
          <Text className="mt-3 text-lg font-bold text-gray-900">
            ₹{item.price}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}
