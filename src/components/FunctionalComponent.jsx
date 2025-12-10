import { Text, View, FlatList, Dimensions } from 'react-native';

// const ListItem = ({ item }) => {
//   return <Text>{item}</Text>;
// };

// export const CustomList = ({ items }) => {
//   return (
//     <View>
//       {items.map(item => (
//         <ListItem key={item} item={item} />
//       ))}
//     </View>
//   );
// };

export const CustomFlatList = ({ items }) => {
  return (
    <FlatList
      style={{
        height: Dimensions.get('window').height * 0.5,
        backgroundColor: 'red',
        flexGrow: 0,
      }}
      className=" h-fit"
      data={items}
      renderItem={({ item }) => <Text>{item}</Text>}
    />
  );
};
