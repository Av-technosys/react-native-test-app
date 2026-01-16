/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  CategoryProducts: undefined;
  ProductDetails: any;
};

type ProductCardProps = {
  id: number;
  title: string;
  guests: number;
  menu: string;
  rating: number;
  reviews: string;
  price: number;
  image: any;
};

export default function ProductCard({
  id,
  title,
  guests,
  menu,
  rating,
  price,
  image,
}: ProductCardProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() =>
        navigation.getParent()?.navigate('FlowStack', {
          screen: 'ProductDetails',
          params: {
            productId: id,
          },
        })
      }
      className="flex-row bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
    >
      {/* LEFT CONTENT */}
      <View className="flex-1 pr-4 justify-between">
        {/* TOP */}
        <View>
          <Text
            numberOfLines={1}
            className="text-xl font-semibold text-gray-900"
          >
            {title}
          </Text>

          <Text
            numberOfLines={2}
            className="mt-1 text-md text-gray-500 leading-5"
          >
            {menu}
          </Text>

          <View className="mt-2 flex-row items-center">
            <Icon name="star" size={14} color="#FACC15" />
            <Text className="ml-1 text-sm text-gray-600">
              {rating.toFixed(1)}
            </Text>

            <Text className="mx-2 text-gray-300">•</Text>

            <Text className="text-sm text-gray-500">{guests} guests</Text>
          </View>
        </View>

        {/* BOTTOM */}
        {price ? (
          <Text className="mt-3 text-lg font-bold text-gray-900">₹{price}</Text>
        ) : null}
      </View>

      {/* RIGHT IMAGE */}
      <Image
        source={image}
        className="w-28 h-28 rounded-xl bg-gray-100"
        resizeMode="cover"
      />
    </Pressable>
  );
}
