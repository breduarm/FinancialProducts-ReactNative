import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import ProductItem from './ProductItem';

const Products = (): React.JSX.Element => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={styles.listContainer}
      data={DATA}
      renderItem={({item}) => (
        <ProductItem title={item.title} description={item.description} />
      )}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 1,
    borderColor: '#ECECED',
    borderRadius: 6,
  },
});

export default Products;
