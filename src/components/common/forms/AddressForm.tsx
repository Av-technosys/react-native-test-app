import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { addAddress, editAddress } from '../../../api/user';
import Feather from 'react-native-vector-icons/Feather';
import FloatingInput from '../FloatingInput';

export type Address = {
  id?: number;
  title: string;
  addressLineOne: string;
  addressLineTwo: string;
  reciverName: string;
  reciverNumber: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude?: string;
  longitude?: string;
};

type Props = {
  initialData?: Address | null;
  onSuccess: () => void;
  onCancel: () => void;
};

export default function AddressForm({
  initialData,
  onSuccess,
  onCancel,
}: Props) {
  const [form, setForm] = useState<Address>({
    title: initialData?.title ?? '',
    addressLineOne: initialData?.addressLineOne ?? '',
    addressLineTwo: initialData?.addressLineTwo ?? '',
    reciverName: initialData?.reciverName ?? '',
    reciverNumber: initialData?.reciverNumber ?? '',
    city: initialData?.city ?? '',
    state: initialData?.state ?? '',
    postalCode: initialData?.postalCode ?? '',
    country: initialData?.country ?? 'India',
    latitude: '00',
    longitude: '00',
    id: initialData?.id,
  });

  const onChange = (key: keyof Address, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const onSubmit = async () => {
    // Dismiss keyboard first
    Keyboard.dismiss();
    
    // ✅ REQUIRED FIELD VALIDATION
    if (
      !form.title ||
      !form.addressLineOne ||
      !form.reciverName ||
      !form.reciverNumber ||
      !form.city ||
      !form.state ||
      !form.postalCode ||
      !form.country
    ) {
      showMessage({
        type: 'danger',
        message: 'Please fill all required fields',
      });
      return;
    }

    try {
      if (form.id) {
        // -------- EDIT --------
        await editAddress({
          ...form,
          latitude: '00',
          longitude: '00',
        });

        showMessage({
          type: 'success',
          message: 'Address updated successfully.',
        });
      } else {
        // -------- ADD --------
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...addPayload } = form;

        await addAddress({
          ...addPayload,
          latitude: '00',
          longitude: '00',
        });

        showMessage({
          type: 'success',
          message: 'Address added successfully.',
        });
      }

      onSuccess();
    } catch (error) {
      console.log(error)
      showMessage({
        type: 'danger',
        message: 'Something went wrong',
      });
    }
  };

  return (
    <View className="gap-2">
      <View className="flex-row items-center gap-2 mb-6">
        <Feather name="map-pin" size={20} color="#000" />
        <Text className="text-xl font-semibold text-black">Address</Text>
      </View>

      <FloatingInput
        label="Title"
        value={form.title}
        onChangeText={(v: string) => onChange('title', v)}
      />

      <FloatingInput
        label="Address Line 1"
        value={form.addressLineOne}
        onChangeText={(v: string) => onChange('addressLineOne', v)}
      />

      <FloatingInput
        label="Address Line 2"
        value={form.addressLineTwo}
        onChangeText={(v: string) => onChange('addressLineTwo', v)}
      />

      <FloatingInput
        label="Receiver Name"
        value={form.reciverName}
        onChangeText={(v: string) => onChange('reciverName', v)}
        icon="user"
      />

      <FloatingInput
        label="Contact Number"
        value={form.reciverNumber}
        onChangeText={(v: string) => onChange('reciverNumber', v)}
        keyboardType="phone-pad"
        icon="phone"
      />

      <FloatingInput
        label="City"
        value={form.city}
        onChangeText={(v: string) => onChange('city', v)}
      />

      <FloatingInput
        label="State"
        value={form.state}
        onChangeText={(v: string) => onChange('state', v)}
      />

      <FloatingInput
        label="Postal Code"
        value={form.postalCode}
        onChangeText={(v: string) => onChange('postalCode', v)}
        keyboardType="numeric"
      />

      <FloatingInput
        label="Country"
        value={form.country}
        onChangeText={(v: string) => onChange('country', v)}
      />

      {/* ACTION BUTTONS */}
      <View className="flex-row gap-3 mt-4 mb-8">
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            onCancel();
          }}
          className="flex-1 border border-gray-400 rounded-xl py-4 items-center"
        >
          <Text className="text-gray-700 font-semibold">Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSubmit}
          className="flex-1 bg-orange-500 rounded-xl py-4 items-center"
        >
          <Text className="text-white font-semibold">
            {form.id ? 'Update' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}