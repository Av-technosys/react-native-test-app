import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

type VendorDetailsCardProps = {
  name: string;
  location: string;
  vendorId: string;
  serviceId: string;
  email: string;
  logo?: any;
};

export default function VendorDetailsCard({
  name,
  location,
  vendorId,
  serviceId,
  email,
  logo,
}: VendorDetailsCardProps) {
  return (
    <View className="mb-4 m-4">

             <View>
          <Text className="text-2xl my-3 font-bold text-black">
          Vendor Details
          </Text>

        </View>
<View className = ''   style={{ borderRadius: 18, overflow: 'hidden' }} >
    <LinearGradient
      colors={['#F97316', '#FDBA74']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      className="rounded-2xl p-4 flex-row justify-between items-center"
    >
        
      {/* LEFT CONTENT */}
      <View className="flex-1 pr-3">
        <Text className="text-white text-4xl font-bold">
          {name}
        </Text>

        <Text className="text-white/90 text-sm mt-1">
          {location}
        </Text>

        <Text className="text-white/90 text-sm mt-1">
          Vendor ID: {vendorId}   Service ID: {serviceId}
        </Text>

        <Text className="text-white/90 text-sm mt-1">
          {email}
        </Text>

        {/* SOCIAL ICONS */}
        <View className="flex-row mt-3 gap-4">
          <Feather name="facebook" size={18} color="#fff" />
          <Feather name="instagram" size={18} color="#fff" />
          <Feather name="twitter" size={18} color="#fff" />
        </View>
      </View>

      {/* RIGHT LOGO */}
      <View className="rounded-xl ">
        <Image
          source={logo ?? require('../../assets/images/vendor-logo.png')}
          className="w-36 h-36"
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
    </View>
    </View>
  );
}
