import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Spacer from '../components/Spacer';
import Search from '../components/Search';
import Products from '../components/Products';
import PrimaryButton from '../components/PrimaryButton';
import {NavDirections} from '../enums/NavDirections';

const HomeScreen = ({navigation}): React.JSX.Element => {
  const handleAddNewProduct = () => {
    navigation.navigate(NavDirections.NEW_PRODUCT);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Search />
        <Spacer value={44} />
        <Products />
        <Spacer value={24} />
        <PrimaryButton handleClick={handleAddNewProduct} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: 24,
    marginTop: 56,
    marginBottom: 32,
  },
});

export default HomeScreen;
