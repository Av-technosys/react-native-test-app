import { SafeAreaView } from 'react-native-safe-area-context';
import AddressForm from '../../components/common/forms/AddressForm';
import ScreenHeader from '../../components/common/ScreenHeader';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function AddressFormScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { initialData } = route.params || {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

      <ScreenHeader title="Address" showBack />

      <AddressForm
        initialData={initialData}
        onSuccess={() => navigation.goBack()}
        onCancel={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
}
