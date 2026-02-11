


import React, { useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import { addCartItem } from '../../api/cart';
import FloatingInput from '../common/FloatingInput';
import Button from '../common/Button';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { Calendar } from 'react-native-calendars';
import { showAndroidToast } from '../toast/androidToast';
import { Dropdown } from 'react-native-element-dropdown';

type AddCartItemPayload = {
  productId: number;
  quantity: number;
  name: string;
  contactNumber: string;
  date: string;
  minGuestCount: number;
  maxGuestCount: number;
  latitude: number;
  longitude: number;
};

type Props = {
  product: {
    ProductId: number;
    title: string;
    vendorName: string;
    price: number;
  };
};

export default function AddToCartForm({ product }: Props) {

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
const [guestFocus, setGuestFocus] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [guests, setGuests] = useState<string | null>(null);

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const guestOptions = ['0–100','101–200','201–350','351–500']
    .map(g => ({ label: g, value: g }));

  /* ---------- native time picker ---------- */
  const openTimePicker = () => {
    DateTimePickerAndroid.open({
      value: time ?? new Date(),
      mode: 'time',
      is24Hour: false,
      onChange: (_, selected) => selected && setTime(selected),
    });
  };

  const parseGuestRange = (value: string | null) => {
    if (!value) return { min: 0, max: 0 };
    const [min, max] = value.split('–').map(Number);
    return { min, max };
  };

  const isFormValid =
    fullName && phone.length >= 10 && address && date && time && guests;

  const handleSubmit = async () => {
    if (!date || !time || !guests) return;

    const eventDate = new Date(date);
    eventDate.setHours(time.getHours(), time.getMinutes(), 0, 0);
    const { min, max } = parseGuestRange(guests);

    const apiPayload: AddCartItemPayload = {
      productId: product.ProductId,
      quantity: 1,
      name: fullName.trim(),
      contactNumber: phone.trim(),
      date: eventDate.toISOString(),
      minGuestCount: min,
      maxGuestCount: max,
      latitude: 38.45,
      longitude: 40.45,
    };

    try {
      setLoading(true);
      const res = await addCartItem(apiPayload);
      console.log('res', res)
      dispatch(addToCart({
        ProductId: product?.ProductId,
        title: product.title,
        vendorName: product.vendorName,
        price: product.price,
        quantity: 1,
      }));

      showAndroidToast(res?.message || 'item added to cart');
      navigation.getParent()?.navigate('MainTabs', { screen: 'Cart' });

    } catch {
      showAndroidToast('Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={80}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 10 }}
    >

  
      <FloatingInput size="medium" label="Full Name" value={fullName} onChangeText={setFullName}/>
      <FloatingInput size="medium" label="Contact no." value={phone} onChangeText={setPhone} keyboardType="phone-pad"/>
      <FloatingInput size="medium" label="Address" value={address} onChangeText={setAddress}/>

      {/* DATE */}
      <Pressable onPress={() => setShowDatePicker(true)}>
        <FloatingInput
          size="medium"
          label="Date"
          value={date ? dayjs(date).format('DD MMM YYYY') : ''}
          placeholder="Select date"
          editable={false}
        />
      </Pressable>

      {/* TIME */}
      <Pressable onPress={openTimePicker}>
        <FloatingInput
          size="medium"
          label="Time"
          value={time ? dayjs(time).format('hh:mm A') : ''}
          placeholder="Select time"
          editable={false}
        />
      </Pressable>

      {/* GUESTS */}
{/* GUESTS */}
<View style={{ marginTop: 8 }}>
  <View
    style={{
      borderWidth: 1.5,
      borderRadius: 12,
      borderColor: guestFocus ? '#FB923C' : '#FB923C',
      backgroundColor: 'white',
      height: 55,
      justifyContent: 'center',
      paddingHorizontal: 14,
    }}
  >
    {/* floating label */}
    <Text
      style={{
        position: 'absolute',
        top: -8,
        left: 10,
        backgroundColor: 'white',
        paddingHorizontal: 4,
        fontSize: 12,
        color: '#FB923C',
      }}
    >
      Guests
    </Text>

    <Dropdown
      style={{ height: 36 }}

      data={guestOptions}
      labelField="label"
      valueField="value"
      value={guests}
      placeholder="Select guests"

      placeholderStyle={{
        fontSize: 16,
        color: '#9CA3AF',
      }}

      selectedTextStyle={{
        fontSize: 16,
        color: '#000000',
      }}

      itemTextStyle={{
        fontSize: 16,
        color: '#374151',
      }}

      activeColor="#FFF7ED"

      onFocus={() => setGuestFocus(true)}
      onBlur={() => setGuestFocus(false)}
      onChange={item => {
        setGuests(item.value);
        setGuestFocus(false);
      }}

      containerStyle={{
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 4,
      }}
    />
  </View>
</View>


      <View className="mt-16">
        <Button
          size="medium"
          label={loading ? "Adding..." : "Add to Cart"}
          variant="primary"
          disabled={!isFormValid || loading}
          onPress={handleSubmit}
        />
      </View>

      {/* DATE MODAL */}
      <Modal visible={showDatePicker} transparent animationType="fade">
        <Pressable className="flex-1 bg-black/40 justify-center px-5" onPress={()=>setShowDatePicker(false)}>
          <Pressable className="bg-white rounded-2xl p-4">
            <Calendar
              minDate={dayjs().format('YYYY-MM-DD')}
              onDayPress={(day)=>{
                setDate(dayjs(day.dateString).toDate());
                setShowDatePicker(false);
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>

    </KeyboardAwareScrollView>
  );
}
