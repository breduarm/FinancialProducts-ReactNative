import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Spacer from '../components/Spacer';
import Search from '../components/Search';
import Products from '../components/Products';
import PrimaryButton from '../components/PrimaryButton';
import {NavDirections} from '../enums/NavDirections';
import Colors from '../theme/ColorSqueme';
import {AxiosResponse} from 'axios';
import axiosInstance from '../configs/axiosConfig';
import ProductResponse from '../models/responses/ProductResponse';

const HomeScreen = ({navigation}): React.JSX.Element => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>(
    [],
  );

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

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = '/bp/products';
        const response: AxiosResponse = await axiosInstance.get(url);
        const productsResponse: ProductResponse[] = response.data.data;

        setProducts(productsResponse);
      } catch (e) {
        console.error(
          'There was a problem trying to get financial products: ',
          e,
        );
      }
    };

    getProducts();
  }, []);

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
