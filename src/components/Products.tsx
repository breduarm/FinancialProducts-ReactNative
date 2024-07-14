import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Colors from '../theme/ColorSqueme';
import { ProductResponse } from '../types/responses/ProductReponse';
import ProductItem from './ProductItem';

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
