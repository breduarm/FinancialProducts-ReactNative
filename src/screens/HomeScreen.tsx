import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import Search from '../components/Search';
import Products from '../components/Products';
import PrimaryButton from '../components/PrimaryButton';

const HomeScreen = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Search />
        <Spacer value={44} />
        <Products />
        <Spacer value={24} />
        <PrimaryButton />
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
