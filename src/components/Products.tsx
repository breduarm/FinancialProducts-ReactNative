import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import ProductItem from './ProductItem';
import ProductResponse from '../models/responses/ProductResponse';
import Colors from '../theme/ColorSqueme';

type ProductsProps = {
  products: ProductResponse[];
  onItemPress: (product: ProductResponse) => void;
};

const Products = ({
  products,
  onItemPress,
}: ProductsProps): React.JSX.Element => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={styles.listContainer}
      data={products}
      renderItem={({item}) => (
        <ProductItem
          item={item}
          onItemPress={onItemPress}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 6,
  },
});

export default Products;
