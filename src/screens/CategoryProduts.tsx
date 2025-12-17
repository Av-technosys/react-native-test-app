/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/common/ScreenHeader';
import Icon from 'react-native-vector-icons/Feather';
import ProductCard from '../components/common/cards/ProductsCard';


const products = Array.from({ length: 12 }).map((_, index) => ({
  id: index + 1,
  title: 'The Beverage Bar',
  guests: 150,
  menu: 'Premium menu',
  rating: 5,
  reviews: '1.4k+',
  price: 999,
  image: require('../assets/images/service2.png'),
}));




export default function CategoryProducts() {
  return (
    <SafeAreaView className="flex-1 bg-white ">
      {/* HEADER */}
      <ScreenHeader
        title="Categories"
        right={
          <View className="relative">
            <Icon name="bell" size={22} color="#000" />
            <View className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500" />
          </View>
        }
      />

      {/* PRODUCT LIST */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View className=" mt-5">
            <ProductCard
              title={item.title}
              guests={item.guests}
              menu={item.menu}
              rating={item.rating}
              reviews={item.reviews}
              price={item.price}
              image={item.image}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}