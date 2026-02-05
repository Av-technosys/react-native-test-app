import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import ServiceCard from '../common/cards/ServiceCard';
import SectionHeader from '../common/SectionHeader';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { getAllFeaturedProducts } from '../../api/product';
import Config from 'react-native-config';

// S3 base URL
  const S3_BASE_URL = Config.AWS_IMAGE_URL


// fallback image
const FALLBACK_IMAGE = require('../../assets/images/service1.png');

function ServiceCardSkeleton() {
  return (
    <SkeletonPlaceholder borderRadius={16}>
      <View style={{ width: 352, marginHorizontal: 8 }}>
        {/* Image */}
        <SkeletonPlaceholder.Item
          width="100%"
          height={144}
          borderRadius={16}
        />

        {/* Content */}
        <SkeletonPlaceholder.Item marginTop={12}>
          <SkeletonPlaceholder.Item width="90%" height={16} />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width="70%"
            height={16}
          />

          {/* Rating */}
          <SkeletonPlaceholder.Item
            marginTop={10}
            width="40%"
            height={14}
          />

          {/* Price */}
          <SkeletonPlaceholder.Item
            marginTop={12}
            width="30%"
            height={18}
          />
        </SkeletonPlaceholder.Item>
      </View>
    </SkeletonPlaceholder>
  );
}

export default function ServicesBlock() {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      setLoading(true);

      const res = await getAllFeaturedProducts();
      const categories = res?.data ?? [];

      const mappedSections = categories.map((category: any) => ({
        id: category.id,
        title: category.name,
        products: category.products.map((product: any) => ({
          id: product.productId,
          title: product.title,
          rating: product.rating ?? 4,
          price: product.price?.[0]?.price ?? null,
          description: product.description,
          image: product.bannerImage
            ? { uri: `${S3_BASE_URL}/${product.bannerImage}` }
            : FALLBACK_IMAGE,
        })),
      }));

      setSections(mappedSections);
    } catch (error) {
      console.error('Failed to fetch featured products', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="mt-6">
         {loading ? (
      <ServiceCardSkeleton />
    ) : (
      sections
        .filter(
          (section) =>
            Array.isArray(section.products) &&
            section.products.length > 0
        )
        .map((section) => (
          <View key={section.id} className="mb-6">
            <SectionHeader
              left={
                <Text className="text-2xl font-bold text-black">
                  {section.title}
                </Text>
              }
            />
            <FlatList
              horizontal
              data={section.products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ServiceCard item={item} />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 4 }}
            />
          </View>
        ))
      )}
    </View>
  );
}
