import {
  View,
  Text,
  Keyboard,
  DeviceEventEmitter,
} from 'react-native';
import { useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { addAddress, editAddress } from '../../../api/user';
import Feather from 'react-native-vector-icons/Feather';
import FloatingInput from '../FloatingInput';
import { useRef } from 'react';
import { TextInput } from 'react-native';
import Button from '../Button'

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

  const titleRef = useRef<TextInput>(null);
  const address1Ref = useRef<TextInput>(null);
  const address2Ref = useRef<TextInput>(null);
  const nameRef = useRef<TextInput>(null);
  const numbefRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);
  const codeRef = useRef<TextInput>(null);
  const countryRef = useRef<TextInput>(null);

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
        // 🔔 Notify Header to refetch user + address
        DeviceEventEmitter.emit('ADDRESS_UPDATED');

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
        DeviceEventEmitter.emit('ADDRESS_UPDATED');

        showMessage({
          type: 'success',
          message: 'Address added successfully.',
        });
      }

      onSuccess();
    } catch (error) {
      console.log(error);
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
        ref={titleRef}
        value={form.title}
        onChangeText={(v: string) => onChange('title', v)}
      />

      <FloatingInput
        label="Address Line 1"
        value={form.addressLineOne}
        ref={address1Ref}
        onChangeText={(v: string) => onChange('addressLineOne', v)}
      />

      <FloatingInput
        label="Address Line 2"
        ref={address2Ref}
        value={form.addressLineTwo}
        onChangeText={(v: string) => onChange('addressLineTwo', v)}
      />

      <FloatingInput
        label="Receiver Name"
        ref={nameRef}
        value={form.reciverName}
        onChangeText={(v: string) => onChange('reciverName', v)}
        icon="user"
      />

      <FloatingInput
        ref={numbefRef}
        label="Contact Number"
        value={form.reciverNumber}
        onChangeText={(v: string) => onChange('reciverNumber', v)}
        keyboardType="phone-pad"
        icon="phone"
      />

      <FloatingInput
        ref={cityRef}
        label="City"
        value={form.city}
        onChangeText={(v: string) => onChange('city', v)}
      />

      <FloatingInput
        ref={stateRef}
        label="State"
        value={form.state}
        onChangeText={(v: string) => onChange('state', v)}
      />

      <FloatingInput
        label="Postal Code"
        ref={codeRef}
        value={form.postalCode}
        onChangeText={(v: string) => onChange('postalCode', v)}
        keyboardType="numeric"
      />

      <FloatingInput
        label="Country"
        ref={countryRef}
        value={form.country}
        onChangeText={(v: string) => onChange('country', v)}
      />

{/* ACTION BUTTONS */}
<View className="flex-row gap-3 mt-4 mb-8">
  <Button
    label="Cancel"
    variant="outline"
    className="flex-1"
    onPress={() => {
      Keyboard.dismiss();
      onCancel();
    }}
  />

  <Button
    label={form.id ? 'Update' : 'Save'}
    variant="primary"
    className="flex-1"
    onPress={onSubmit}
  />
</View>

    </View>
  );
}
