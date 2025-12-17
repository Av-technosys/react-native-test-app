import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Carousel from '../../components/common/Carousel';

type VendorHeaderCardProps = {
  name: string;
  location: string;
  rating: number;
  logo: any;
};
export default function VendorHeaderCard({
  name,
  location,
  rating,
  logo,
}: VendorHeaderCardProps) {
  return (
    <View className=" mt-8">
      {/* HEADER ROW */}
      <View className="flex-row mx-6 items-center justify-between rounded-2xl">
        {/* LEFT SECTION */}
        <View className="flex-1">
          <Text className="text-3xl font-bold text-black">{name}</Text>

          <View className="mt-2 flex-row items-center">
            <Icon name="map-pin" size={16} color="#ef4444" />
            <Text className="ml-1 text-md text-gray-600">{location}</Text>
            <Icon
              name="help-circle"
              size={14}
              color="#4B5563"
              style={{ marginLeft: 4 }}
            />
          </View>

          <View className="mt-2 flex-row items-center self-start rounded-full bg-green-800 px-2 py-1">
            <Text className="text-xs font-semibold text-white">{rating}</Text>
            <AntDesign
              name="star"
              size={12}
              color="#facc15"
              style={{ marginLeft: 4 }}
            />
          </View>
        </View>

        {/* RIGHT LOGO */}
        <View className="h-28 w-28 items-center justify-center rounded-xl">
          <Image source={logo} resizeMode="contain" />
        </View>
      </View>

      {/* CAROUSEL — OUTSIDE ROW */}
      <View className="mt-4">
        <Carousel
          fullWidth={false}
          itemSpacing={0}
          borderRadius={15}
          images={[
            require('../../assets/images/vendor-product.jpg'),
            require('../../assets/images/vendor-product.jpg'),
            require('../../assets/images/vendor-product.jpg'),
            require('../../assets/images/vendor-product.jpg'),
          ]}
        />
      </View>
    </View>
  );
}
