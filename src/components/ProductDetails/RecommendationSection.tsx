import { View, Text, FlatList } from 'react-native';
import RecommendationCard from '../common/cards/RecommendationCard';

const recommendations = [
  {
    id: '1',
    title: 'Perfect Moment Studio',
    price: '1024',
    image: require('../../assets/images/party.png'),
  },
  {
    id: '2',
    title: 'Perfect Moment Studio',
    price: '1024',
    image: require('../../assets/images/party.png'),
  },
];

export default function RecommendationSection() {
  return (
    <View className="mt-6">
      {/* HEADER */}
      <View className="mb-6">
        <Text className="text-2xl px-4 font-bold text-black">
          Recommendation
        </Text>
        <Text className="text-lg mt-1 px-4 text-gray-400">
          Here are some recommendation
        </Text>
      </View>

      {/* LIST */}
      <FlatList
        data={recommendations}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecommendationCard
            title={item.title}
            price={item.price}
            image={item.image}
          />
        )}
      />
    </View>
  );
}
