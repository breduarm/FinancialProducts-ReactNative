import React from 'react';
import {StyleSheet, View} from 'react-native';
import Spacer from '../components/Spacer';
import Search from '../components/Search';
import Products from '../components/Products';
import PrimaryButton from '../components/PrimaryButton';
import {NavDirections} from '../enums/NavDirections';
import Colors from '../theme/ColorSqueme';

const HomeScreen = ({navigation}): React.JSX.Element => {
  const handleAddNewProduct = () => {
    navigation.navigate(NavDirections.NEW_PRODUCT);
  };

  return (
    <View style={styles.content}>
      <Search />
      <Spacer value={44} />
      <Products />
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
