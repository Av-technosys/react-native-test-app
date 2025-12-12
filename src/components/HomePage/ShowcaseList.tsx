import { View, FlatList } from 'react-native';
import ShowCaseCard from '../common/cards/ShowcaseCard';

const showCaseData = [
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

export default function ShowCaseList() {
  return (
    <View className="mt-8 px-4">

      <FlatList
        data={showCaseData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <ShowCaseCard item={item} />}
        keyExtractor={(item) => item.number.toString()}
      />

    </View>
  );
}
