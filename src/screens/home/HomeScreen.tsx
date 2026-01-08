import { View, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

import Header from '../../components/HomePage/HeaderSection';
import BannerCarousel from '../../components/HomePage/BannerCarousel';
import HomeCategoriesSection from '../../components/HomePage/HomeCategoriesSection';
import ServicesBlock from '../../components/HomePage/ServiceSection';
import Showcase from '../../components/HomePage/ShowcaseList';
import EventCarousel from '../../components/HomePage/EventCarousel';
import WeadingBanner from '../../components/HomePage/WeddingBanner';
import BaseBottomSheet from '../../components/common/BaseBottomSheet';
import AddressSheetContent from '../../components/address/AddressSheetContent';
import HowItWork from '../../components/HomePage/HowItWork';

import { getBanners } from '../../api/event';

export default function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [banners, setBanners] = useState<any[]>([]);
  const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await getBanners();

      if (res?.success && Array.isArray(res?.data)) {
        // Sort banners by priority (ascending)
        const sortedBanners = [...res.data].sort(
          (a, b) => a.priority - b.priority
        );

        setBanners(sortedBanners);
      }
    } catch (error) {
      console.log('Error fetching banners', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar
        translucent={false}
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Header */}
        <Header bottomSheetRef={bottomSheetRef} />

        {/* Banner Carousel */}
        <View>
          <BannerCarousel banners={banners} />
        </View>

        {/* Categories */}
        <HomeCategoriesSection />

        <WeadingBanner />

        {/* Event carousel overlapping wedding banner */}
        <View style={{ marginTop: -50, zIndex: 10 }}>
          <EventCarousel />
        </View>

        <Showcase />

        {/* Services Sections */}
        <ServicesBlock />
        <HowItWork />
      </ScrollView>

<BaseBottomSheet
  ref={bottomSheetRef}
  onChange={(index) => {
    console.log('🟢 sheet index:', index);
    setIsAddressSheetOpen(index >= 0);
  }}
>
  <AddressSheetContent
    isOpen={isAddressSheetOpen}
    onClose={() => bottomSheetRef.current?.close()}
  />
</BaseBottomSheet>
    </SafeAreaView>
  );
}
