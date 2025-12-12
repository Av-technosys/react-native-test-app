import { View, Text } from 'react-native';
import ServiceCard from '../common/cards/ServiceCard';

const data = {
  popular: [
    {
      title: "Immersive Coffee Bar Experience",
      rating: "4.6",
      reviews: 14,
      price: 30.00,
      store: "Brew & Bloom",
      image: require('../../assets/images/service1.png'),
    },
  ],
  under499: [
    {
      title: "Premium Beverage Set",
      rating: "4.5",
      reviews: 18,
      price: 30.00,
      store: "Brew & Bloom",
      image: require('../../assets/images/service2.png'),
    },
  ],
  under999: [
    {
      title: "Luxury Coffee Bar",
      rating: "4.7",
      reviews: 22,
      price: 30.00,
      store: "Brew & Bloom",
      image: require('../../assets/images/service1.png'),
    },
  ],
};

export default function ServicesBlock() {

  const labels = {
    popular: "Popular In Town",
    under499: "Within $499",
    under999: "Within $999",
  };

  return (
    <View className="mt-6 px-4">

      {/* SECTION 1 */}
      <Text className="text-lg font-semibold text-gray-900 mb-3">
        {labels.popular}
      </Text>
      {data.popular.map((item, index) => (
        <ServiceCard key={index} item={item} />
      ))}

      {/* SECTION 2 */}
      <Text className="text-lg font-semibold text-gray-900 mb-3 mt-6">
        {labels.under499}
      </Text>
      {data.under499.map((item, index) => (
        <ServiceCard key={index} item={item} />
      ))}

      {/* SECTION 3 */}
      <Text className="text-lg font-semibold text-gray-900 mb-3 mt-6">
        {labels.under999}
      </Text>
      {data.under999.map((item, index) => (
        <ServiceCard key={index} item={item} />
      ))}

    </View>
  );
}
