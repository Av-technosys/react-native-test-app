import { View, Text, Image, FlatList } from 'react-native';

const eventData = [
  {
    id: 1,
    price: 2934,
    image: require('../../assets/images/event1.png'),
    name: 'videography'
  },
  {
    id: 2,
    price: 2934,
    image: require('../../assets/images/event2.png'),
    name: 'Photography'
  },
  {
    id: 3,
    price: 2934,
    image: require('../../assets/images/event1.png'),
    name: 'Catering'
  },
  {
    id: 4,
    price: 2934,
    image: require('../../assets/images/event2.png'),
    name: 'Decoration'
  },
];

export default function EventCarousel() {
  return (
    <View className="mt-2 ml-2">
      <FlatList
        horizontal
        data={eventData}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="mr-4">
            {/* EVENT IMAGE */}
            <Image
              source={item.image}
              className="w-44 h-36 rounded-3xl"
              resizeMode="cover"
            />

            {/* PRICE WITH ICON */}
         <View className="mt-2 flex-row gap-2 items-baseline justify-center">
  <Text className="text-md  text-black">
    Starting
     </Text>
    <Text className="text-[16px] font-semibold text-orange-600">
      {`$${item.price}`} 
    </Text>
 
</View>

          </View>
        )}
      />
    </View>
  );
}