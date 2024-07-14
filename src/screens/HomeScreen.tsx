import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import Products from '../components/Products';
import Search from '../components/Search';
import Spacer from '../components/Spacer';
import { ButtonStyles } from '../enums/ButtonStyles';
import { NavDirections } from '../enums/NavDirections';
import useProductsContext from '../hooks/useProductsContext';
import { HomeScreenProps } from '../navigation/StackNavigatorTypes';
import Colors from '../theme/ColorSqueme';
import { ProductResponse } from '../types/responses/ProductReponse';

const HomeScreen = ({navigation}: HomeScreenProps): React.JSX.Element => {
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>(
    [],
  );

  const {products} = useProductsContext();

  useEffect(() => {
    if (searchText === '') {
      setFilteredProducts(products);
    } else {
      const newFilteredProducts = products.filter(item => {
        const textToCompare = searchText.toLowerCase();
        const nameLowerCase = item.name.toLowerCase();
        const descLowerCase = item.description.toLowerCase();
        return (
          nameLowerCase.includes(textToCompare) ||
          descLowerCase.includes(textToCompare)
        );
      });
      setFilteredProducts(newFilteredProducts);
    }
  }, [searchText, products]);

  const handleShowProductDetail = (product: ProductResponse) => {
    navigation.navigate(NavDirections.DETAIL, {product: product});
  };

  const handleAddNewProduct = () => {
    navigation.navigate(NavDirections.PRODUCT_FORM);
  };

  return (
    <View style={styles.content}>
      <Search searchText={searchText} setSearchText={setSearchText} />
      <Spacer value={44} />
      {filteredProducts.length > 0 ? (
        <Products
          products={filteredProducts}
          onItemPress={handleShowProductDetail}
        />
      ) : (
        <Text style={styles.emptyStateText}>No hay productos disponibles</Text>
      )}
      <Spacer value={24} />
      <CustomButton
        label="Agregar"
        buttonStyle={ButtonStyles.Primary}
        handleClick={handleAddNewProduct}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 32,
    backgroundColor: Colors.background,
  },
  emptyStateText: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.secondaryText,
    alignSelf: 'center',
  },
});

export default HomeScreen;
