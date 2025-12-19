import { View, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type DetailsProps = {
  title: string;
  subtitle: string;
  rating: number;
  ratingCount: string;
  price: number;
  description: string;
  services: string[];
};

export default function Details({
  title,
  subtitle,
  rating,
  ratingCount,
  price,
  description,
  services,
}: DetailsProps) {
  return (
    <View className="mt-4 rounded-xl bg-white p-4 shadow-sm">
      
      {/* TITLE */}
      <Text className="text-2xl font-bold text-black">
        {title}
      </Text>

      {/* SUBTITLE */}
      <Text className="mt-1 text-lg text-gray-500">
        {subtitle}
      </Text>

      {/* RATING */}
      <View className="mt-2 flex-row items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <AntDesign
            key={index}
            name="star"
            size={16}
            color={index < Math.round(rating) ? '#FACC15' : '#E5E7EB'}
            style={{ marginRight: 2 }}
          />
        ))}
        <Text className="ml-2 text-md text-gray-500">
          {ratingCount}
        </Text>
      </View>

      {/* PRICE */}
<View className="flex-row items-center mt-3">
  <MaterialIcons
    name="attach-money"
    size={24}
    color="#F97316"
  />
  <Text className="text-2xl font-bold text-orange-500 ">
    {price}
  </Text>
</View>


      {/* CTA */}
      <Text className="mt-1 text-md text-gray-500">
        See all options
      </Text>

      {/* DIVIDER */}
      <View className="my-4 h-px bg-gray-200" />

      {/* DESCRIPTION */}
      <Text className="text-base font-semibold text-black">
        Description
      </Text>

      <Text className="mt-2 text-md leading-6 text-gray-600">
        {description}
      </Text>

      {/* SERVICES */}
      <Text className="mt-4 text-base font-semibold text-black">
        What We Provide
      </Text>

      <View className="mt-2 space-y-2">
        {services.map((item, index) => (
          <View key={index} className="flex-row">
            <Text className="mr-2 text-md text-gray-600">•</Text>
            <Text className="flex-1 text-md leading-6 text-gray-600">
              {item}
            </Text>
          </View>
        ))}
      </View>

    </View>
  );
}
