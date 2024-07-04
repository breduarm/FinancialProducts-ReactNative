import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    description: 'ID: 12345',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    description: 'ID: 12345',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    description: 'ID: 12345',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Fourth Item',
    description: 'ID: 12345',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Fifth Item',
    description: 'ID: 12345',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Sixth Item',
    description: 'ID: 12345',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d76',
    title: 'Seventh Item',
    description: 'ID: 12345',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d77',
    title: 'Eigth Item',
    description: 'ID: 12345',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d78',
    title: 'Nineth Item',
    description: 'ID: 12345',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b1',
    title: 'First Item',
    description: 'ID: 12345',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f62',
    title: 'Second Item',
    description: 'ID: 12345',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d80',
    title: 'Third Item',
    description: 'ID: 12345',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d81',
    title: 'Fourth Item',
    description: 'ID: 12345',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d82',
    title: 'Fifth Item',
    description: 'ID: 12345',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d83',
    title: 'Sixth Item',
    description: 'ID: 12345',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d84',
    title: 'Seventh Item',
    description: 'ID: 12345',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d85',
    title: 'Eigth Item',
    description: 'ID: 12345',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d86',
    title: 'Nineth Item',
    description: 'ID: 12345',
  },
];

type ItemProps = {title: string; description: string};

const Item = ({title, description}: ItemProps) => (
  <>
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.icon} />
    </View>
    <View style={styles.divider} />
  </>
);

const Products = () => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={styles.listContainer}
      data={DATA}
      renderItem={({item}) => (
        <Item title={item.title} description={item.description} />
      )}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 1,
    borderColor: '#ECECED',
    borderRadius: 4,
  },
  itemContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  title: {
    fontWeight: '900',
  },
  description: {
    fontSize: 12,
  },
  icon: {
    height: 16,
    width: 8,
    backgroundColor: '#C9C9CA',
  },
  divider: {
    height: 1,
    width: '98%',
    alignSelf: 'center',
    backgroundColor: '#ECECED',
  },
});

export default Products;
