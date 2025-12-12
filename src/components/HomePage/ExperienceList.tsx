import { View, FlatList } from 'react-native';
import ExperienceCard from '../common/cards/ExperienceCard';

const experienceData = [
  {
    number: 1,
    price: 2934,
    image: require('../../assets/images/party.png'),
  },
  {
    number: 2,
    price: 2934,
    image: require('../../assets/images/party.png'),
  },
  {
    number: 3,
    price: 2999,
    image: require('../../assets/images/party.png'),
  },
];

export default function ExperienceList() {
  return (
    <View className="mt-8 px-4">

      <FlatList
        data={experienceData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <ExperienceCard item={item} />}
        keyExtractor={(item) => item.number.toString()}
      />

    </View>
  );
}
