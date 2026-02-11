import { View, ScrollView, Pressable, Text, Modal, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';
//import LinearGradient from 'react-native-linear-gradient';

import VendorHeaderCard from '../../components/ProductDetails/Header';
import Details from '../../components/ProductDetails/Details';
import VendorDetailsCard from '../../components/ProductDetails/VendorDetails';
import ReviewSection from '../../components/ProductDetails/CustomerReviewsSection';
//import RecommendationSection from '../../components/ProductDetails/RecommendationSection';
import AddToCartForm from '../../components/common/AddToCartForm';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
//import { useAppSelector } from '../../store/hooks';
import { getProductsByProductId, fetchProductReview } from '../../api/product';
import LinearGradient from 'react-native-linear-gradient';
import { fetchVendorDetail } from '../../api/vendor';
import Config from 'react-native-config';

  const S3_BASE_URL = Config.AWS_IMAGE_URL

export default function ProductDetails() {
  const route = useRoute<any>();
  const { productId } = route.params ?? {};
  console.log(productId);
  //const cartItems = useAppSelector(state => state.cart.items);
  const [vendor, setVendor] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
const [showBooking, setShowBooking] = useState(false);

  const vendorLogo = vendor?.logoUrl
    ? { uri: `${S3_BASE_URL}/${vendor.logoUrl}` }
    : require('../../assets/images/vendor-logo.png');

  useEffect(() => {
    if (!productId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [productRes, vendorRes] = await Promise.all([
          getProductsByProductId(productId),
          fetchVendorDetail(),
        ]);

        setProduct(productRes.product);
        setVendor(vendorRes.data);
      } catch (err) {
        console.log('DETAIL FETCH ERROR', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  useEffect(() => {
    if (!productId) return;

    const fetchReviews = async () => {
      try {
        setReviewsLoading(true);
        const res = await fetchProductReview(productId);

        setReviews(res.data ?? []);
      } catch (err) {
        console.log('REVIEW FETCH ERROR', err);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) {
 return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="h-14" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <SkeletonPlaceholder borderRadius={16}>
          {/* Vendor Header */}
          <View style={{ marginTop: 24, paddingHorizontal: 24 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <View style={{ width: '70%', height: 26 }} />
                <View style={{ marginTop: 10, width: '50%', height: 14 }} />
                <View style={{ marginTop: 10, width: 60, height: 22 }} />
              </View>
              <View style={{ width: 112, height: 112, borderRadius: 16 }} />
            </View>
          </View>

          {/* Carousel */}
          <View style={{ marginTop: 24, paddingLeft: 24, flexDirection: 'row' }}>
            {[1, 2, 3].map(i => (
              <View
                key={i}
                style={{
                  width: 260,
                  height: 160,
                  borderRadius: 16,
                  marginRight: 12,
                }}
              />
            ))}
          </View>

          {/* Details */}
          <View style={{ marginTop: 28, paddingHorizontal: 24 }}>
            <View style={{ width: '60%', height: 24 }} />
            <View style={{ marginTop: 8, width: '40%', height: 16 }} />
            <View style={{ marginTop: 12, width: '30%', height: 20 }} />

            {[1, 2, 3, 4].map(i => (
              <View
                key={i}
                style={{
                  marginTop: 10,
                  width: '100%',
                  height: 12,
                }}
              />
            ))}
          </View>

          {/* Vendor Details Card */}
          <View
            style={{
              marginTop: 28,
              marginHorizontal: 24,
              height: 160,
              borderRadius: 20,
            }}
          />

          {/* Reviews */}
          <View style={{ marginTop: 28, paddingHorizontal: 24 }}>
            <View style={{ width: '40%', height: 20 }} />

            {[1, 2].map(i => (
              <View
                key={i}
                style={{
                  marginTop: 16,
                  height: 120,
                  borderRadius: 16,
                }}
              />
            ))}
          </View>

          {/* Add to cart */}
          <View
            style={{
              marginTop: 32,
              marginHorizontal: 24,
              height: 64,
              borderRadius: 20,
            }}
          />
        </SkeletonPlaceholder>
      </ScrollView>
    </SafeAreaView>
  );
}

  if (!product) return null;

  const price =
    product.prices?.[0]?.salePrice ?? product.prices?.[0]?.listPrice ?? null;

  return (
    <>
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader title={product.title} showBack rightType="notification" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* HEADER */}
        <VendorHeaderCard
          name={vendor?.businessName ?? 'Vendor'}
          location={`${vendor?.city ?? ''} ${vendor?.state ?? ''}`}
          rating={product.rating}
          logo={vendorLogo}
          mediaImages={
            product.media
              ?.filter((m: any) => m.mediaType === 'image')
              ?.map((m: any) => `${S3_BASE_URL}/${m.mediaUrl}`) ?? []
          }
        />

        {/* DETAILS */}
        <Details
          title={product.title}
          subtitle={product.pricingType}
          rating={product.rating}
          ratingCount={`${product.rating}.0`}
          price={price}
          description={product.description}
          //services={product.description?.split('\n')?.filter(Boolean) ?? []}
        />

        {/* VENDOR */}
        <VendorDetailsCard
          logo={vendorLogo}
          name={vendor?.businessName}
          location={`${vendor?.streetAddressLine1}, ${vendor?.city}`}
          vendorId={vendor?.vendorId}
          serviceId={product.productId}
          email={vendor?.primaryContactEmail}
        />

        <ReviewSection reviews={reviews} loading={reviewsLoading} />

        {/* <RecommendationSection /> */}

        {/* ADD TO CART */}
        <Pressable
          className="w-full items-center mt-6"
         onPress={() => setShowBooking(true)}
        >
          <View style={{ borderRadius: 18, overflow: 'hidden', width: '92%' }}>
            <LinearGradient
              colors={['#F97316', '#FACC15']}
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
    </SafeAreaView>

<Modal
  visible={showBooking}
  animationType="fade"
  transparent
  onRequestClose={() => setShowBooking(false)}
>
  <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
    
    {/* Tap outside to close */}
    <Pressable style={{ flex: 1 }} onPress={() => setShowBooking(false)} />

    {/* SHEET */}
    <View
      style={{
        height: '80%',
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 10,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>

        <ScreenHeader
          title="Booking Details"
          showBack
          onBackPress={() => setShowBooking(false)}
        />

        <ScrollView contentContainerStyle={{ padding: 12 }}>
          <AddToCartForm
            product={{
              ProductId: product.productId,
              title: product.title,
              vendorName: vendor?.businessName,
              price,
            }}
          />
        </ScrollView>

      </SafeAreaView>
    </View>
  </View>
</Modal>

    </>
  );
}
