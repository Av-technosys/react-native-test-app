import { View, Text, FlatList } from 'react-native';
import ServiceCard from '../common/cards/ServiceCard';
import SectionHeader from '../common/SectionHeader';
const data = {
  popular: [
    {
      id: 1,
      title: 'Immersive Coffee Bar Experience',
      rating: '4.6',
      reviews: 14,
      price: 30.0,
      store: 'Brew & Bloom',
      image: require('../../assets/images/service1.png'),
    },
    {
      id: 2,
      title: 'Luxury Coffee Tasting',
      rating: '4.7',
      reviews: 21,
      price: 45.0,
      store: 'Brew & Bloom',
      image: require('../../assets/images/service1.png'),
    },
    {
      id: 3,
      title: 'Private Barista Session',
      rating: '4.8',
      reviews: 32,
      price: 55.0,
      store: 'Brew & Bloom',
      image: require('../../assets/images/service1.png'),
    },
  ],

  under499: [
    {
      id: 4,
      title: 'Premium Beverage Set',
      rating: '4.5',
      reviews: 18,
      price: 30.0,
      store: 'Brew & Bloom',
      image: require('../../assets/images/service2.png'),
    },
    {
      id: 5,
      title: 'Classic Coffee Kit',
      rating: '4.4',
      reviews: 12,
      price: 25.0,
      store: 'Brew & Bloom',
      image: require('../../assets/images/service2.png'),
    },
    {
      id: 6,
      title: 'Espresso Starter Pack',
      rating: '4.6',
      reviews: 20,
      price: 35.0,
      store: 'Brew & Bloom',
      image: require('../../assets/images/service2.png'),
    },
  ],

  under999: [
    {
      id: 7,
      title: 'Luxury Coffee Bar',
      rating: '4.7',
      reviews: 22,
      price: 80.0,
      store: 'Brew & Bloom',
      image: require('../../assets/images/service1.png'),
    },
    {
      id: 8,
      title: 'Premium Event Coffee Setup',
      rating: '4.9',
      reviews: 41,
      price: 95.0,
      store: 'Brew & Bloom',
      image: require('../../assets/images/service1.png'),
    },
    {
      id: 9,
      title: 'Corporate Coffee Experience',
      rating: '4.8',
      reviews: 37,
      price: 90.0,
      store: 'Brew & Bloom',
      image: require('../../assets/images/service1.png'),
    },
  ],
};

const labels = {
  popular: 'Popular In Town',
  under499: 'Within $499',
  under999: 'Within $999',
};

export default function ServicesBlock() {
  const renderService = ({ item }: any) => (
    <ServiceCard item={item} />
  );

  return (
    <View className="mt-6">
      
      {/* POPULAR */}
      <SectionHeader
        left={<Text className="text-2xl font-bold text-black">{labels.popular}</Text>}
      />
      <FlatList
        horizontal
        data={data.popular}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderService}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      />

      {/* UNDER 499 */}
      <SectionHeader
        left={<Text className="text-2xl mt-4 font-bold text-black">{labels.under499}</Text>}
      />
      <FlatList
        horizontal
        data={data.under499}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderService}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      />

      {/* UNDER 999 */}
      <SectionHeader
        left={<Text className="text-2xl font-bold mt-4 text-black">{labels.under999}</Text>}
      />
      <FlatList
        horizontal
        data={data.under999}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderService}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      />

    </View>
  );
}