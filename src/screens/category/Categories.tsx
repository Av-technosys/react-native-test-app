/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { getProductTypes } from '../../api/product';
import NotFound from '../../components/common/notFound/NotFound';

type RootStackParamList = {
  CategoryProducts: { categoryId: number; title: string };
};

type ProductType = {
  id: number;
  name: string;
  mediaURL: string;
  altText: string;
};

export default function CategoriesScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [categories, setCategories] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getProductTypes();
        setCategories(res.data);
        console.log(res)
      } catch (err) {
        console.log('Failed to load categories', err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white mb-16">
        <ScreenHeader
          title="Categories"
          rightType="notification"
          showBack={false}
        />

        <SkeletonPlaceholder>
          <View
            style={{
              padding: 16,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <View
                key={index}
                style={{
                  width: '48%',
                  height: 176,
                  borderRadius: 24,
                  marginBottom: 16,
                }}
              />
            ))}
          </View>
        </SkeletonPlaceholder>
      </SafeAreaView>
    );
  }
  if (!loading && categories.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white mb-16">
        <ScreenHeader
          title="Categories"
          rightType="notification"
          showBack={false}
        />

        <NotFound
          title="No Category Found"
          description="There are no categories available right now."
          ctaLabel="Explore Services"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white mb-16">
      <ScreenHeader
        title="Categories"
        rightType="notification"
        showBack={false}
      />

      <FlatList
        data={categories}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.getParent()?.navigate('FlowStack', {
                screen: 'CategoryProducts',
                params: {
                  typeId: item.id,
                  title: item.name,
                },
              })
            }
            className="mb-4 w-[48%]"
          >
            <View className="h-44 rounded-3xl border border-orange-400 bg-white shadow shadow-slate-200 items-center justify-center">
              {/* ICON IMAGE */}
              <View className="w-16 h-16 mb-3 items-center justify-center">
                <Image
                  source={{ uri: item.mediaURL }}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
              </View>

              {/* TITLE */}
              <Text
                className="text-base font-semibold text-gray-800 text-center px-2"
                numberOfLines={2}
              >
                {item.name}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
