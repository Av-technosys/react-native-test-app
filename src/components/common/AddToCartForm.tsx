import BookingDetailsForm, { BookingDetails } from './forms/EventDetails';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';

export default function AddToCartForm({ product }: any) {
  const dispatch = useAppDispatch();

  const handleSubmit = (data: BookingDetails) => {
    dispatch(
      addToCart({
        ProductId: product.ProductId,
        title: product.title,
        vendorName: product.vendorName,
        price: product.price,
        quantity: 1,
        bookingDetails: data,
      })
    );
  };

  return (
    <BookingDetailsForm
      onSubmit={handleSubmit}
      submitLabel="Add to Cart"
      isBottomSheet={true}
    />
  );
}
