import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import Header from './components/Header';
import {AxiosResponse} from 'axios';
import axiosInstance from './configs/axiosConfig';
import Description from './components/Description';

const App = (): React.JSX.Element => {
  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsUrl = '/bp/products';
        const response: AxiosResponse = await axiosInstance.get(productsUrl);
        const dataResponse = response.data;

        console.log('==== dataResponse: ', JSON.stringify(dataResponse));
      } catch (e) {
        console.error(
          'There was a problem trying to get financial products: ',
          e,
        );
      }
    };

    getProducts();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <Header />
        <Description />
        {/* <View style={styles.content}>
        <Search />
        <Spacer value={44} />
        <Products />
        <Spacer value={24} />
        <PrimaryButton />
      </View> */}
      </SafeAreaView>
    </NavigationContainer>
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

export default App;
