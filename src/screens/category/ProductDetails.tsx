import { Pressable, View, ScrollView, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../../src/components/common/ScreenHeader';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheet from '@gorhom/bottom-sheet';
import BaseBottomSheet from '../../components/common/BaseBottomSheet';
import VendorHeaderCard from '../../components/ProductDetails/Header';
import Details from '../../components/ProductDetails/Details';
import VendorDetailsCard from '../../components/ProductDetails/VendorDetails';
import ReviewSection from '../../components/ProductDetails/CustomerReviewsSection';
import RecommendationSection from '../../components/ProductDetails/RecommendationSection';
import { useEffect, useRef } from 'react';
import AddToCartForm from '../../components/common/AddToCartForm';
import { useAppSelector } from '../../store/hooks';

export default function ProductDetails() {
  const disabled = false;
  const bottomSheetRef = useRef<BottomSheet>(null);

  const cartItems = useAppSelector(state => state.cart.items);

  useEffect(() => {
    console.log('CART STATE:', cartItems);
  }, [cartItems]);

  const productData = {
    ProductId: '24',
    title: 'Juice Junction',
    vendorName: 'EVENTER’S',
    vendorId: 'VXX455',
    location: 'Mansarovar, Jaipur',
    price: 949,
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
  <ScreenHeader title="Categories" rightType="notification" showBack={true} />


      {/* CONTENT */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <VendorHeaderCard
          name="EVENTER’S"
          location="Jaipur"
          rating={4.5}
          logo={require('../../assets/images/vendor-logo.png')}
        />

        <Details
          title="Juice Junction"
          subtitle="Premium package || Full Day Coverage"
          rating={5}
          ratingCount="14k+"
          price={949}
          description="We provide professional photography and videography services to capture your special moments with creativity and care. From events to personal shoots, we deliver high-quality photos and cinematic videos you’ll cherish forever."
          services={[
            'Event Photography & Videography – Weddings, engagements, birthdays, and parties',
            'Pre-Wedding & Couple Shoots – Romantic outdoor or studio sessions',
            'Candid Photography – Natural, unscripted moments',
            'Cinematic Wedding Films – Highlight reels and full-day coverage',
            'Portrait & Portfolio Shoots – Individual, family, kids, or professional portfolios',
            'Corporate Photography & Videography – Events, product launches, promotional videos',
            'Drone Photography & Aerial Videography – Stunning overhead shots',
            'Photo Albums & Video Editing – Custom-designed albums and professional post-production',
            'Live Streaming Services – For weddings and events to reach remote guests',
            'Reels & Social Media Clips – Short, engaging content for online sharing',
          ]}
        />

        <VendorDetailsCard
          name="XYZ"
          location="Mansarovar, Jaipur"
          vendorId="VXX455"
          serviceId="DX47"
          email="eventors@gmail.com"
        />

        <ReviewSection />
        <RecommendationSection />

        <Image
          source={require('../../assets/images/location.png')}
          className="m-6 w-[92%] h-44 rounded-xl self-center"
          resizeMode="cover"
        />

        <Pressable
          disabled={disabled}
          className="w-full items-center"
          onPress={() => {
            bottomSheetRef.current?.snapToIndex(0);
          }}
        >
          <View style={{ borderRadius: 18, overflow: 'hidden', width: '92%' }}>
            <LinearGradient
              colors={
                disabled ? ['#E5E7EB', '#E5E7EB'] : ['#F97316', '#FACC15']
              }
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                height: 64,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text className="text-white text-xl font-bold">Add to Cart</Text>
            </LinearGradient>
          </View>
        </Pressable>
      </ScrollView>

      <BaseBottomSheet ref={bottomSheetRef} snapPoints={['90%']}>
        <AddToCartForm product={productData} />
      </BaseBottomSheet>
    </SafeAreaView>
  );
}
