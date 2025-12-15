import { View, FlatList, Text } from 'react-native';
import ShowCaseCard from '../common/cards/ShowcaseCard';
import Icon from 'react-native-vector-icons/Feather';
import SectionHeader from '../common/SectionHeader';

const showCaseData = [
  {
    number: 1,
    price: 2934,
    title: 'House Party',
    image: require('../../assets/images/party.png'),
  },
  {
    number: 2,
    price: 2934,
    title: 'Birthday Party',
    image: require('../../assets/images/party.png'),
  },
  {
    number: 3,
    price: 2999,
    title: 'Anniversary Party',
    image: require('../../assets/images/party.png'),
  },
];

export default function ShowCaseList() {
  return (
    <View className="mt-8">
      <SectionHeader
        left={
          <Text className="text-2xl font-bold text-black">
            Most Popular Now 🎈
          </Text>
        }
        right={
          <Icon name="chevron-right" size={22} color="#666" />
        }
      />
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
