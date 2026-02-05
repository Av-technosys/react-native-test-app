/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import ScreenHeader from '../../components/common/ScreenHeader';
import ProductCard from '../../components/common/cards/ProductsCard';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { getProductsByCategoryId, getProductsByProductTypeId } from '../../api/product';
import NotFound from '../../components/common/notFound/NotFound';
import Config from 'react-native-config';


  const S3_BASE_URL = Config.AWS_IMAGE_URL

export default function CategoryProducts() {
  const route = useRoute<any>();
  const { typeId, title } = route.params ?? {};

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await getProductsByProductTypeId(typeId);
        console.log(res)
        setProducts(res.data); // ✅ IMPORTANT
      } catch (err) {
        console.log('PRODUCT FETCH ERROR', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [typeId]);


  const truncateWords = (text: string, wordLimit = 6) => {
  if (!text) return '';

  const words = text.trim().split(/\s+/);
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(' ') + '...'
    : text;
};

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white px-4">
        <ScreenHeader title={title ?? 'Products'} showBack={true} />

        <SkeletonPlaceholder >
          {[1, 2, 3, 4,5].map(i => (
            <View
              key={i}
              style={{
                marginTop:16,
                height: 140,
                borderRadius: 16,
                marginBottom: 16,
              }}
            />
          ))}
        </SkeletonPlaceholder>
      </SafeAreaView>
    );
  }

  if (!loading && products.length === 0) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader
        title={title ?? 'Products'}
        showBack={true}
        rightType="notification" 
      />

      <NotFound
        title="No Products Found"
        description="There are no products available in this category right now."
        ctaLabel="Browse Categories"
        navigateTo={{ parent: 'MainTabs', screen: 'Categories' }}
      />
    </SafeAreaView>
  );
}

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader title={title ?? 'Products'} rightType="notification" showBack={true} />

      <FlatList
        data={products}
        keyExtractor={item => item.productId.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingTop: 30 }}
        renderItem={({ item }) => {
          const price =
            item.price?.[0]?.salePrice ??
            item.price?.[0]?.listPrice ??
            0;

          const imageSource = item.bannerImage
            ? { uri: `${S3_BASE_URL}/${item.bannerImage}` }
            : require('../../assets/images/service2.png');

          return (
            <View className="mb-5">
              <ProductCard
                id={item.productId}
                title={item.title}
                guests={item.minQuantity ?? 0}
                menu={truncateWords(item.description, 6)}
                rating={item.rating ?? 0}
                reviews={`${item.rating ?? 0}.0`}
                price={price}
                image={imageSource}
              />

            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
