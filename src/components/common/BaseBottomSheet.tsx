// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useMemo } from 'react';
import { ViewStyle } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

interface BaseBottomSheetProps {
  children: React.ReactNode;
  snapPoints?: (string | number)[];
  backgroundStyle?: ViewStyle;
  scrollEnabled?: boolean;
  enableDynamicSizing?: boolean;
  onChange?: (index: number) => void; // ✅ ADD
}

const BaseBottomSheet = forwardRef<BottomSheet, BaseBottomSheetProps>(
  (
    {
      children,
      snapPoints,
      backgroundStyle,
      scrollEnabled = true,
      enableDynamicSizing = false,
      onChange, // ✅ ADD
    },
    ref,
  ) => {
    const defaultSnapPoints = useMemo(() => snapPoints || ['50%' ,'95%'], [snapPoints]);

    return scrollEnabled ? (
      <BottomSheet
        ref={ref}
        index={-1}
        
        snapPoints={defaultSnapPoints}
        onChange={onChange}              
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        enablePanDownToClose
        // DYNAMIC CONTENT HANDLING
        enableDynamicSizing={enableDynamicSizing}
        // TAB BAR HANDLING
        bottomInset={0} // Adjust based on your tab bar height
        // STYLING
        handleIndicatorStyle={{ backgroundColor: '#ccc', width: 40 }}
        backgroundStyle={[
          { 
            borderRadius: 20, 
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 20,
          },
          backgroundStyle,
        ]}
      >
        <BottomSheetScrollView 
          contentContainerStyle={{ 
            padding: 20,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </BottomSheetScrollView>
      </BottomSheet>
    ) : (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={defaultSnapPoints}
        enablePanDownToClose
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        enableDynamicSizing={enableDynamicSizing}
        bottomInset={60}
        handleIndicatorStyle={{ backgroundColor: '#ccc', width: 40 }}
        backgroundStyle={[
          { 
            borderRadius: 20, 
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 20,
          },
          backgroundStyle,
        ]}
      >
        {children}
      </BottomSheet>
    );
  },
);

export default BaseBottomSheet;










// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { forwardRef, useMemo } from 'react';
// import { ViewStyle } from 'react-native';
// import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

// interface BaseBottomSheetProps {
//   children: React.ReactNode;
//   snapPoints?: (string | number)[];
//   backgroundStyle?: ViewStyle;
//   scrollEnabled?: boolean;
//   enableDynamicSizing?: boolean;
//   onChange?: (index: number) => void; // ✅ ADD
// }

// const BaseBottomSheet = forwardRef<BottomSheet, BaseBottomSheetProps>(
//   (
//     {
//       children,
//       snapPoints,
//       backgroundStyle,
//       scrollEnabled = true,
//       enableDynamicSizing = false,
//       onChange, // ✅ ADD
//     },
//     ref,
//   ) => {
//     const defaultSnapPoints = useMemo(() => snapPoints || ['50%' ,'85%'], [snapPoints]);

//     return  (
//      <BottomSheet
//   ref={ref}
//   index={-1}
//   snapPoints={defaultSnapPoints}
//   enablePanDownToClose
//   enableDynamicSizing={enableDynamicSizing}
//   bottomInset={60}
//   handleIndicatorStyle={{ backgroundColor: '#ccc', width: 40 }}
//   backgroundStyle={[
//     {
//       borderRadius: 20,
//       backgroundColor: 'white',
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: -3 },
//       shadowOpacity: 0.1,
//       shadowRadius: 10,
//       elevation: 20,
//     },
//     backgroundStyle,
//   ]}
// >
//   <BottomSheetScrollView
//     keyboardShouldPersistTaps="handled"
//     showsVerticalScrollIndicator={false}
//     contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
//   >
//     {children}
//   </BottomSheetScrollView>
// </BottomSheet>


// )
//   }
// )


// export default BaseBottomSheet;