/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  CategoryProducts: undefined;
  ProductDetails: any;
};

type BeverageCardProps = {
  title: string;
  guests: number;
  menu: string;
  rating: number;
  reviews: string;
  price: number;
  image: any;
};

export default function ProductCard({
  title,
  guests,
  menu,
  rating,
  reviews,
  price,
  image,
}: BeverageCardProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() =>
        navigation.getParent()?.navigate('FlowStack', {
          screen: 'ProductDetails',
        })
      }
      className="flex-row bg-white border mx-1 border-gray-300 rounded-2xl px-4 py-3 shadow shadow-slate-200 h-40"
    >
      {/* LEFT CONTENT */}
      <View className="flex-1 pr-3 justify-between">
        <View>
          <Text className="text-xl font-semibold text-black">{title}</Text>

          <Text className="mt-1 text-md text-gray-500">
            {guests} guests • {menu}
          </Text>

          <View className="mt-2 flex-row items-center">
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name="star" size={14} color="#FACC15" />
            ))}
            <Text className="ml-2 text-md text-gray-500">{reviews}</Text>
          </View>
        </View>

        <Text className="text-xl font-semibold text-black">${price}</Text>
      </View>

      {/* RIGHT IMAGE */}
      <Image
        source={image}
        className="w-36 h-full rounded-xl"
        resizeMode="cover"
      />
    </Pressable>
  );
}
