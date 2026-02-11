import { View, ScrollView } from 'react-native';
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
const [banners, setBanners] = useState<any[] | null>(null);
const [loading, setLoading] = useState(true);
const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

const fetchBanners = async () => {
  try {
    setLoading(true);

    const res = await getBanners();
    console.log(res);

    if (res?.success && Array.isArray(res?.data)) {
      const sortedBanners = [...res.data].sort(
        (a, b) => a.priority - b.priority
      );

      setBanners(sortedBanners);
    } else {
      setBanners([]); // finished but empty
    }

  } catch (error) {
    console.log('Error fetching banners', error);
    setBanners([]); // still finished
  } finally {
    setLoading(false); // critical
  }
};


  return (
    <SafeAreaView className="flex-1 bg-white">

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Header */}
        <Header bottomSheetRef={bottomSheetRef} />

        {/* Banner Carousel */}
        <View>
<BannerCarousel banners={banners} loading={loading} />
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



