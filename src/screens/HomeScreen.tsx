import { View, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../components/HomePage/HeaderSection';
import BannerCarousel from '../components/HomePage/BannerCarousel';
import HomeCategoriesSection from '../components/HomePage/HomeCategoriesSection';
import ServicesBlock from '../components/HomePage/ServiceSection';
import Showcase from '../components/HomePage/ShowcaseList';
import EventCarousel from '../components/HomePage/EventCarousel';
import WeadingBanner from '../components/HomePage/WeddingBanner';
import { useRef } from "react";
import BaseBottomSheet from "../components/common/BaseBottomSheet";
import AddressSheetContent from "../components/address/AddressSheetContent";
import BottomSheet from '@gorhom/bottom-sheet';


export default function HomeScreen() {
 const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <SafeAreaView className="flex-1  bg-white">
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
        <Header bottomSheetRef={bottomSheetRef}/>

        {/* Banner Carousel */}
        <View className="">
          <BannerCarousel />
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
      </ScrollView>
          <BaseBottomSheet ref={bottomSheetRef}>
        <AddressSheetContent />
      </BaseBottomSheet>
    </SafeAreaView>
  );
}
