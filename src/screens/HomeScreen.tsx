import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Spacer from '../components/Spacer';
import Search from '../components/Search';
import Products from '../components/Products';
import PrimaryButton from '../components/PrimaryButton';
import {NavDirections} from '../enums/NavDirections';
import Colors from '../theme/ColorSqueme';
import ProductResponse from '../models/responses/ProductResponse';
import useProductsContext from '../hooks/useProductsContext';

const HomeScreen = ({navigation}): React.JSX.Element => {
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
    navigation.navigate(NavDirections.DETAIL, product);
  };

  const handleAddNewProduct = () => {
    navigation.navigate(NavDirections.NEW_PRODUCT);
  };

  return (
    <View style={styles.content}>
      <Search searchText={searchText} setSearchText={setSearchText} />
      <Spacer value={44} />
      <Products
        products={filteredProducts}
        onItemPress={handleShowProductDetail}
      />
      <Spacer value={24} />
      <PrimaryButton handleClick={handleAddNewProduct} />
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
});

export default HomeScreen;
